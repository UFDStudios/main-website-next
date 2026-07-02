"use client";

import Image from "next/image";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { getYouTubeEmbedSrc, isYouTubeUrl } from "@/lib/youtubeEmbed";
import { stripRichText } from "@/app/components/RichTextContent";
import type { PortfolioProjectSummary } from "./types";

const ProjectCard = ({
  project,
  onClick,
}: {
  project: PortfolioProjectSummary;
  onClick: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaLoading, setMediaLoading] = useState(true);
  const [extraImages, setExtraImages] = useState<string[]>([]);
  const [loadingExtraMedia, setLoadingExtraMedia] = useState(false);

  const loadExtraMedia = useCallback(async () => {
    if (extraImages.length > 0 || project.mediaCount === 0 || loadingExtraMedia) return extraImages;

    setLoadingExtraMedia(true);
    try {
      const res = await fetch(`/api/portfolio/${project.id}/media`);
      if (!res.ok) return extraImages;
      const data = (await res.json()) as { images?: string[] };
      const images = Array.isArray(data.images) ? data.images : [];
      setExtraImages(images);
      return images;
    } catch {
      return extraImages;
    } finally {
      setLoadingExtraMedia(false);
    }
  }, [extraImages, loadingExtraMedia, project.id, project.mediaCount]);

  const buildAllMedia = useCallback(
    (images: string[]) => {
      const combined = [project.mainImage, ...images];
      const deduped = Array.from(new Set(combined.filter(Boolean)));
      const yt = project.youtubeUrl?.trim() && getYouTubeEmbedSrc(project.youtubeUrl)
        ? project.youtubeUrl.trim()
        : null;
      if (!yt) return deduped;
      return project.enableVideo ? [yt, ...deduped] : [...deduped, yt];
    },
    [project.mainImage, project.youtubeUrl, project.enableVideo]
  );

  const allMedia = useMemo(() => buildAllMedia(extraImages), [buildAllMedia, extraImages]);

  const canNavigateMedia = allMedia.length > 1 || project.mediaCount > 0;

  useEffect(() => {
    setCurrentIndex((i) => {
      if (!allMedia.length) return 0;
      return Math.min(i, allMedia.length - 1);
    });
  }, [allMedia]);

  useEffect(() => {
    setMediaLoading(true);
  }, [currentIndex]);

  const goLeft = async () => {
    let images = extraImages;
    if (allMedia.length <= 1 && project.mediaCount > 0) {
      images = await loadExtraMedia();
    }
    const media = buildAllMedia(images);
    setCurrentIndex((i) => (media.length ? (i - 1 + media.length) % media.length : 0));
  };

  const goRight = async () => {
    let images = extraImages;
    if (allMedia.length <= 1 && project.mediaCount > 0) {
      images = await loadExtraMedia();
    }
    const media = buildAllMedia(images);
    setCurrentIndex((i) => (media.length ? (i + 1) % media.length : 0));
  };

  const currentMedia = allMedia[currentIndex] || "";
  const isVideo = currentMedia.toLowerCase().endsWith(".mp4");
  const isYouTube = isYouTubeUrl(currentMedia);
  const youTubeEmbed = isYouTube ? getYouTubeEmbedSrc(currentMedia) : null;
  const isRemote = /^https?:\/\//i.test(currentMedia);

  return (
    <>
      <div
        onClick={onClick}
        className="cursor-pointer bg-[#0b0b0b] border border-gray-800 rounded-2xl
                    overflow-hidden hover:-translate-y-1 hover:shadow-2xl
                    transition-all duration-300"
      >
        {/* Carousel Image/Video Area */}
        <div className="relative w-full h-[220px] bg-black flex items-center justify-center">
          {/* Left Arrow */}
          <button
            disabled={!canNavigateMedia || mediaLoading || loadingExtraMedia}
            onClick={(e) => {
              e.stopPropagation();
              void goLeft();
            }}
            className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/70 text-white text-lg rounded-full border border-white z-10 ${
              !canNavigateMedia || mediaLoading || loadingExtraMedia
                ? "opacity-40 pointer-events-none"
                : "hover:bg-black"
            }`}
            aria-label="Previous media"
          >
            ‹
          </button>

          {/* Right Arrow */}
          <button
            disabled={!canNavigateMedia || mediaLoading || loadingExtraMedia}
            onClick={(e) => {
              e.stopPropagation();
              void goRight();
            }}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/70 text-white text-lg rounded-full border border-white z-10 ${
              !canNavigateMedia || mediaLoading || loadingExtraMedia
                ? "opacity-40 pointer-events-none"
                : "hover:bg-black"
            }`}
            aria-label="Next media"
          >
            ›
          </button>

          {/* Loader overlay while switching media */}
          {(mediaLoading || loadingExtraMedia) && (
            <div className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none">
              <div className="h-7 w-7 rounded-full border-2 border-white/25 border-t-neon-green animate-spin" />
            </div>
          )}

          {/* Media Display */}
          {isYouTube && youTubeEmbed ? (
            <iframe
              title={`${project.title} trailer`}
              src={youTubeEmbed}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className={`h-full w-full max-h-full max-w-full rounded-lg border-0 aspect-video ${
                mediaLoading ? "opacity-0" : "opacity-100"
              } transition-opacity duration-200`}
              onLoad={() => setMediaLoading(false)}
            />
          ) : isVideo ? (
            <video
              src={currentMedia}
              controls
              onLoadedData={() => setMediaLoading(false)}
              className={`max-h-full max-w-full object-contain rounded-lg cursor-pointer transition-[filter] duration-200 ${
                mediaLoading ? "blur-sm" : "blur-0"
              }`}
            />
          ) : currentMedia ? (
            <Image
              src={currentMedia}
              alt={project.title}
              width={800}
              height={450}
              onLoad={() => setMediaLoading(false)}
              unoptimized={isRemote}
              className={`max-h-full max-w-full object-contain rounded-lg cursor-pointer transition-[filter] duration-200 ${
                mediaLoading ? "blur-sm" : "blur-0"
              }`}
            />
          ) : null}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-3">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-5">
            {stripRichText(project.shortDescription)}
          </p>

          <div className="flex gap-3 flex-wrap">
            {project.genres.map((genre: string, i: Key | null | undefined) => (
              <span key={i} className="bg-black border border-gray-700 px-4 py-2 rounded-md text-white text-sm font-bold">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
