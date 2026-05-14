"use client";

import Image from "next/image";
import { Key, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getYouTubeEmbedSrc } from "@/lib/youtubeEmbed";
import type { PortfolioProject } from "./types";

type GalleryEntry =
  | { key: string; kind: "youtube"; embedSrc: string }
  | { key: string; kind: "image"; url: string }
  | { key: string; kind: "mp4"; url: string };

const PortfolioModal = ({ project, onClose }: { project: PortfolioProject; onClose: () => void }) => {
  const images = useMemo(() => {
    const galleryImages: string[] = Array.isArray(project.images) ? project.images : [];
    const mainImage: string | undefined = project.mainImage;
    const combined = mainImage ? [mainImage, ...galleryImages] : galleryImages;
    // Dedupe while preserving order so we can safely use the URL as a React key.
    return Array.from(new Set(combined));
  }, [project.mainImage, project.images]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Orientation is tracked by media URL (not by array index) so that re-ordering
  // the gallery never causes flags to be written into the wrong slot.
  const [orientations, setOrientations] = useState<Record<string, boolean>>({});
  const [loadedMedia, setLoadedMedia] = useState<Set<string>>(new Set());
  const [scrollX, setScrollX] = useState(0);

  // For fullscreen lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);
  const scrollAmount = 350;

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  useEffect(() => {
    setOrientations({});
    setLoadedMedia(new Set());
  }, [images, project.youtubeUrl]);

  // Reset lightbox loader whenever the active lightbox image changes.
  useEffect(() => {
    setLightboxLoaded(false);
  }, [lightboxIndex]);

  const markMediaLoaded = (media: string) => {
    setLoadedMedia(prev => {
      if (prev.has(media)) return prev;
      const next = new Set(prev);
      next.add(media);
      return next;
    });
  };

  const handleImageLoad = (media: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const isLandscape = img.naturalWidth > img.naturalHeight;
    setOrientations(prev => {
      if (prev[media] === isLandscape) return prev;
      return { ...prev, [media]: isLandscape };
    });
    markMediaLoaded(media);
  };

  // Group by orientation. Memoized so the array identity is stable across
  // unrelated re-renders (scroll, loadedMedia updates, etc.) -- this is what
  // prevents <Image> from refetching and producing the "loading again" glitch.
  // The mainImage is always pinned to the front so it shows first when the
  // modal opens, regardless of its orientation.
  const { orderedMedia, portraits } = useMemo(() => {
    const p: string[] = [];
    const l: string[] = [];
    const v: string[] = [];

    images.forEach((media: string) => {
      const isVideo = media.toLowerCase().endsWith(".mp4");
      if (isVideo) v.push(media);
      else if (orientations[media]) l.push(media);
      else p.push(media);
    });

    const main: string | undefined = project.mainImage;
    const grouped = [...p, ...l, ...v];
    const ordered =
      main && grouped.includes(main)
        ? [main, ...grouped.filter((m) => m !== main)]
        : grouped;

    return { orderedMedia: ordered, portraits: p };
  }, [images, orientations, project.mainImage]);

  const galleryEntries = useMemo((): GalleryEntry[] => {
    const base: GalleryEntry[] = orderedMedia.map((url) =>
      url.toLowerCase().endsWith(".mp4")
        ? { key: url, kind: "mp4" as const, url }
        : { key: url, kind: "image" as const, url }
    );

    const watch = project.youtubeUrl?.trim();
    const embedSrc = watch ? getYouTubeEmbedSrc(watch) : null;
    if (!embedSrc) return base;

    const yt: GalleryEntry = { key: `youtube:${embedSrc}`, kind: "youtube", embedSrc };
    return [yt, ...base];
  }, [orderedMedia, project.youtubeUrl]);

  const portraitSet = useMemo(() => new Set(portraits), [portraits]);
  const lightboxMedia = useMemo(() => orderedMedia.filter((m) => !m.toLowerCase().endsWith(".mp4")), [orderedMedia]);

  // Scroll for the carousel
  const scrollLeft = () => {
    if (!containerRef.current) return;
    const newScroll = Math.max(scrollX - scrollAmount, 0);
    containerRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
    setScrollX(newScroll);
  };

  const scrollRight = () => {
    if (!containerRef.current) return;
    const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
    const newScroll = Math.min(scrollX + scrollAmount, maxScroll);
    containerRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
    setScrollX(newScroll);
  };

  const canScrollLeft = scrollX > 0;
  const canScrollRight =
    containerRef.current && scrollX < containerRef.current.scrollWidth - containerRef.current.clientWidth - 5;

  const goLightboxLeft = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return i;
      const len = lightboxMedia.length;
      if (len <= 1) return i;
      return (i - 1 + len) % len;
    });
  }, [lightboxMedia.length]);

  const goLightboxRight = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return i;
      const len = lightboxMedia.length;
      if (len <= 1) return i;
      return (i + 1) % len;
    });
  }, [lightboxMedia.length]);

  return (
    <div  className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-10 px-4 overflow-y-auto"
      onClick={() => {
        if (lightboxIndex === null) {
          onClose();
        }
      }}
    >
      {/* Modal container */}
      <div
        className="relative w-full max-w-6xl bg-[#0b0b0b] border border-gray-800 rounded-2xl shadow-xl"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close button */}
        <button className="absolute top-4 right-4 text-white text-3xl hover:text-green-400 z-20"
          onClick={() => {
            if (lightboxIndex === null) {
              onClose();
            }
          }}  
        >
          ×
        </button>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-4xl font-bold text-white mb-6">{project.title}</h2>
          <div className="space-y-4 mb-8">
            <p className="text-white/90 text-lg leading-relaxed whitespace-pre-line">{project.shortDescription}</p>
            <p className="text-gray-300 whitespace-pre-line leading-relaxed">{project.longDescription}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-3 mb-8">
            <div className="flex min-w-0 flex-1 flex-wrap gap-3">
              {project.genres.map((genre: string, i: Key | null | undefined) => (
                <span key={i} className="border border-gray-700 px-4 py-2 rounded-md text-white">{genre}</span>
              ))}
            </div>
            {(project.googlePlayLink?.trim() || project.appStoreLink?.trim()) && (
              <div className="ml-auto flex flex-shrink-0 flex-wrap items-center justify-end gap-4">
                {project.googlePlayLink?.trim() && (
                  <a
                    href={project.googlePlayLink.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-lg overflow-hidden border border-gray-700 hover:border-neon-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-green transition-colors"
                    aria-label="Open on Google Play"
                  >
                    <Image
                      src="/images/portfolio/googlePlay.png"
                      alt="Get it on Google Play"
                      width={180}
                      height={54}
                      className="h-12 w-auto object-contain"
                    />
                  </a>
                )}
                {project.appStoreLink?.trim() && (
                  <a
                    href={project.appStoreLink.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-lg overflow-hidden border border-gray-700 hover:border-neon-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-green transition-colors"
                    aria-label="Download on the App Store"
                  >
                    <Image
                      src="/images/portfolio/appStore.png"
                      alt="Download on the App Store"
                      width={180}
                      height={54}
                      className="h-12 w-auto object-contain"
                    />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* <h3 className="text-2xl font-bold text-white mb-4">Gallery</h3> */}

          <div className="relative">
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/70 hover:bg-black text-white text-2xl rounded-full z-10"
              >
                ‹
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/70 hover:bg-black text-white text-2xl rounded-full z-10"
              >
                ›
              </button>
            )}

            <div ref={containerRef} className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth items-center">
              {galleryEntries.map((entry) => {
                if (entry.kind === "youtube") {
                  const isLoaded = loadedMedia.has(entry.key);
                  return (
                    <div
                      key={entry.key}
                      className="relative flex-shrink-0 h-64 w-[min(100%,380px)] lg:w-[420px] bg-black flex items-center justify-center rounded-lg border border-gray-600 shadow-md overflow-hidden"
                    >
                      {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none">
                          <div className="h-6 w-6 rounded-full border-2 border-white/25 border-t-neon-green animate-spin" />
                        </div>
                      )}
                      <iframe
                        title={`${project.title} video`}
                        src={entry.embedSrc}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className={`h-full w-full border-0 rounded-lg transition-opacity duration-200 ${
                          isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        onLoad={() => markMediaLoaded(entry.key)}
                      />
                    </div>
                  );
                }

                const media = entry.url;
                const isVideo = entry.kind === "mp4";
                const isRemote = /^https?:\/\//i.test(media);
                const isPortrait = portraitSet.has(media);
                const isLoaded = loadedMedia.has(media);

                return (
                  <div
                    key={entry.key}
                    onClick={() => {
                      if (isVideo) return;
                      const lbIndex = lightboxMedia.indexOf(media);
                      if (lbIndex >= 0) setLightboxIndex(lbIndex);
                    }}
                    className={`relative flex-shrink-0 h-64 bg-black flex items-center justify-center rounded-lg border border-gray-600 shadow-md overflow-hidden
                      ${isVideo ? "cursor-default" : "cursor-pointer"}
                      ${isPortrait ? "w-[180px] lg:w-[220px]" : "w-[250px] lg:w-[350px]"}
                    `}
                  >
                    {!isLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none">
                        <div className="h-6 w-6 rounded-full border-2 border-white/25 border-t-neon-green animate-spin" />
                      </div>
                    )}
                    {isVideo ? (
                      <video
                        src={media}
                        controls
                        onLoadedData={() => markMediaLoaded(media)}
                        className={`h-full w-full object-contain rounded-lg transition-opacity duration-200 ${
                          isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    ) : (
                      <Image
                        src={media}
                        alt=""
                        width={500}
                        height={500}
                        onLoad={(e) => handleImageLoad(media, e)}
                        unoptimized={isRemote}
                        className={`h-full w-full object-contain rounded-lg transition-opacity duration-200 ${
                          isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={() => setLightboxIndex(null)} // Clicking anywhere closes lightbox
        >
          {/* Close button for lightbox */}
          <button onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }} className="absolute top-4 right-4 text-white text-3xl hover:text-green-400 z-50">
            ×
          </button>

          {/* Left/Right arrows for lightbox */}
          <button
            disabled={lightboxMedia.length <= 1}
            onClick={(e) => {
              e.stopPropagation();
              goLightboxLeft();
            }}
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/70 text-white text-2xl rounded-full border border-white z-50 ${
              lightboxMedia.length <= 1 ? "opacity-40 pointer-events-none" : "hover:bg-black"
            }`}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            disabled={lightboxMedia.length <= 1}
            onClick={(e) => {
              e.stopPropagation();
              goLightboxRight();
            }}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/70 text-white text-2xl rounded-full border border-white z-50 ${
              lightboxMedia.length <= 1 ? "opacity-40 pointer-events-none" : "hover:bg-black"
            }`}
            aria-label="Next image"
          >
            ›
          </button>

          {/* Centered image */}
          {(() => {
            const src = lightboxMedia[lightboxIndex];
            const isRemote = /^https?:\/\//i.test(src);
            return (
              <>
                {!lightboxLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
                    <div className="h-10 w-10 rounded-full border-2 border-white/25 border-t-neon-green animate-spin" />
                  </div>
                )}
                <Image
                  src={src}
                  alt=""
                  width={1200}
                  height={1200}
                  unoptimized={isRemote}
                  onLoad={() => setLightboxLoaded(true)}
                  className={`object-contain transition-opacity duration-200 ${
                    lightboxLoaded ? "opacity-100" : "opacity-0"
                  } ${
                    portraitSet.has(src)
                      ? "max-h-[calc(100%-160px)]" // Add top/bottom margin for portrait
                      : "max-h-full"
                  }`}
                />
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default PortfolioModal;
