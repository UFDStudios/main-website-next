"use client";

import Image from "next/image";
import { Key, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getYouTubeEmbedSrc } from "@/lib/youtubeEmbed";
import RichTextContent from "@/app/components/RichTextContent";
import type { PortfolioProject } from "./types";

type GalleryEntry =
  | { key: string; kind: "youtube"; embedSrc: string }
  | { key: string; kind: "image"; url: string }
  | { key: string; kind: "mp4"; url: string };

type PortfolioModalProps = {
  project: PortfolioProject;
  onClose: () => void;
  onPrevProject?: () => void;
  onNextProject?: () => void;
  canNavigateProjects?: boolean;
};

const PortfolioModal = ({
  project,
  onClose,
  onPrevProject,
  onNextProject,
  canNavigateProjects = false,
}: PortfolioModalProps) => {
  const images = useMemo(() => {
    const galleryImages: string[] = Array.isArray(project.images) ? project.images : [];
    const mainImage: string | undefined = project.mainImage;
    const combined = mainImage ? [mainImage, ...galleryImages] : galleryImages;
    // Dedupe while preserving order so we can safely use the URL as a React key.
    return Array.from(new Set(combined));
  }, [project.mainImage, project.images]);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  // Bumped whenever gallery media resets so stale cached onLoad events are ignored.
  const mediaEpochRef = useRef(0);
  const lightboxImgRef = useRef<HTMLImageElement | null>(null);

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
    setLightboxIndex(null);
    setScrollX(0);
    containerRef.current?.scrollTo({ left: 0, behavior: "auto" });
  }, [project.id]);

  const applyImageMeta = useCallback((media: string, img: HTMLImageElement, epoch: number) => {
    // Ignore events from a previous gallery generation (cached mainImage often
    // fires onLoad before the reset effect below, then again we must re-apply).
    if (epoch !== mediaEpochRef.current) return;
    if (!img.naturalWidth && !img.naturalHeight) return;

    const isLandscape = img.naturalWidth > img.naturalHeight;
    setOrientations((prev) => {
      if (prev[media] === isLandscape) return prev;
      return { ...prev, [media]: isLandscape };
    });
    setLoadedMedia((prev) => {
      if (prev.has(media)) return prev;
      const next = new Set(prev);
      next.add(media);
      return next;
    });
  }, []);

  useEffect(() => {
    mediaEpochRef.current += 1;
    const epoch = mediaEpochRef.current;
    setOrientations({});
    setLoadedMedia(new Set());

    // Cached images (especially mainImage from the card) may have already fired
    // onLoad before this reset — and won't fire again. Re-read complete nodes
    // after paint so the gallery doesn't stay stuck on the spinner at opacity-0.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const root = containerRef.current;
        if (!root) return;
        root.querySelectorAll<HTMLElement>("[data-portfolio-media]").forEach((el) => {
          const media = el.dataset.portfolioMedia;
          if (!media) return;
          const img =
            el instanceof HTMLImageElement ? el : el.querySelector("img");
          if (!img?.complete) return;
          applyImageMeta(media, img, epoch);
        });
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [images, project.youtubeUrl, applyImageMeta]);

  // Reset lightbox loader whenever the active lightbox image changes.
  useEffect(() => {
    setLightboxLoaded(false);
    const img = lightboxImgRef.current;
    if (img?.complete && (img.naturalWidth || img.naturalHeight)) {
      const raf = requestAnimationFrame(() => setLightboxLoaded(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [lightboxIndex]);

  // Keep fullscreen image in the viewport (modal overlay is scrollable on mobile).
  useEffect(() => {
    if (lightboxIndex === null) return;
    overlayRef.current?.scrollTo({ top: 0, behavior: "auto" });
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
    applyImageMeta(media, e.currentTarget, mediaEpochRef.current);
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

  const openLightbox = useCallback(
    (index: number) => {
      overlayRef.current?.scrollTo({ top: 0, behavior: "auto" });
      setLightboxIndex(index);
    },
    []
  );

  const lightbox =
    lightboxIndex !== null ? (
      <div
        className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] cursor-zoom-out p-4"
        onClick={() => setLightboxIndex(null)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLightboxIndex(null);
          }}
          className="absolute top-4 right-4 text-white text-3xl hover:text-green-400 z-[110]"
          aria-label="Close fullscreen image"
        >
          ×
        </button>

        <button
          disabled={lightboxMedia.length <= 1}
          onClick={(e) => {
            e.stopPropagation();
            goLightboxLeft();
          }}
          className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-black/80 text-white text-2xl rounded-full border border-white z-[110] touch-manipulation ${
            lightboxMedia.length <= 1 ? "opacity-40 pointer-events-none" : "hover:bg-black active:bg-black"
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
          className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-black/80 text-white text-2xl rounded-full border border-white z-[110] touch-manipulation ${
            lightboxMedia.length <= 1 ? "opacity-40 pointer-events-none" : "hover:bg-black active:bg-black"
          }`}
          aria-label="Next image"
        >
          ›
        </button>

        {(() => {
          const src = lightboxMedia[lightboxIndex];
          const isRemote = /^https?:\/\//i.test(src);
          return (
            <>
              {!lightboxLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-[105] pointer-events-none">
                  <div className="h-10 w-10 rounded-full border-2 border-white/25 border-t-neon-green animate-spin" />
                </div>
              )}
              <Image
                ref={(node) => {
                  lightboxImgRef.current = node;
                  if (node?.complete && (node.naturalWidth || node.naturalHeight)) {
                    setLightboxLoaded(true);
                  }
                }}
                src={src}
                alt=""
                width={1200}
                height={1200}
                unoptimized={isRemote}
                onClick={(e) => e.stopPropagation()}
                onLoad={() => setLightboxLoaded(true)}
                className={`max-w-[calc(100%-5.5rem)] sm:max-w-full max-h-[calc(100dvh-2rem)] object-contain transition-opacity duration-200 ${
                  lightboxLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          );
        })()}
      </div>
    ) : null;

  return (
    <>
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-10 px-4 ${
        lightboxIndex !== null ? "overflow-hidden" : "overflow-y-auto"
      }`}
      onClick={() => {
        if (lightboxIndex === null) {
          onClose();
        }
      }}
    >
      {lightboxIndex === null && canNavigateProjects && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrevProject?.();
            }}
            className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 hidden sm:flex items-center justify-center bg-black/80 text-white text-2xl rounded-full border border-white z-[60] touch-manipulation hover:bg-black active:bg-black"
            aria-label="Previous game"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNextProject?.();
            }}
            className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 hidden sm:flex items-center justify-center bg-black/80 text-white text-2xl rounded-full border border-white z-[60] touch-manipulation hover:bg-black active:bg-black"
            aria-label="Next game"
          >
            ›
          </button>
        </>
      )}

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
            <RichTextContent
              html={project.shortDescription}
              className="text-white/90 text-lg"
            />
            <RichTextContent html={project.longDescription} className="text-white/90" />
          </div>

          <div className="mb-8 flex flex-col gap-y-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-3">
            <div className="flex flex-wrap gap-3 sm:min-w-0 sm:flex-1">
              {project.genres.map((genre: string, i: Key | null | undefined) => (
                <span key={i} className="border border-gray-700 px-4 py-2 rounded-md text-white">{genre}</span>
              ))}
            </div>
            {(project.googlePlayLink?.trim() || project.appStoreLink?.trim()) && (
              <div className="flex flex-shrink-0 flex-wrap items-center gap-4 sm:ml-auto sm:justify-end">
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
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 hidden sm:flex items-center justify-center bg-black/70 hover:bg-black text-white text-2xl rounded-full z-10"
                aria-label="Scroll gallery left"
              >
                ‹
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 hidden sm:flex items-center justify-center bg-black/70 hover:bg-black text-white text-2xl rounded-full z-10"
                aria-label="Scroll gallery right"
              >
                ›
              </button>
            )}

            <div
              ref={containerRef}
              className="flex flex-col gap-4 sm:flex-row sm:overflow-x-auto sm:overflow-y-hidden scrollbar-hide scroll-smooth sm:items-center"
            >
              {galleryEntries.map((entry) => {
                if (entry.kind === "youtube") {
                  const isLoaded = loadedMedia.has(entry.key);
                  return (
                    <div
                      key={entry.key}
                      className="relative w-full h-64 sm:flex-shrink-0 sm:w-[min(100%,380px)] lg:w-[420px] bg-black flex items-center justify-center rounded-lg border border-gray-600 shadow-md overflow-hidden"
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
                    data-portfolio-media={isVideo ? undefined : media}
                    onClick={() => {
                      if (isVideo) return;
                      const lbIndex = lightboxMedia.indexOf(media);
                      if (lbIndex >= 0) openLightbox(lbIndex);
                    }}
                    className={`relative w-full h-64 sm:flex-shrink-0 bg-black flex items-center justify-center rounded-lg border border-gray-600 shadow-md overflow-hidden
                      ${isVideo ? "cursor-default" : "cursor-pointer"}
                      ${isPortrait ? "sm:w-[180px] lg:w-[220px]" : "sm:w-[250px] lg:w-[350px]"}
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
    </div>
    {typeof document !== "undefined" && lightbox ? createPortal(lightbox, document.body) : null}
    </>
  );
};

export default PortfolioModal;
