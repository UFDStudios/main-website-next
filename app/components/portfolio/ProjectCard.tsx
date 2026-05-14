"use client";

import Image from "next/image";
import { Key, useEffect, useMemo, useState } from "react";
import { getYouTubeEmbedSrc, isYouTubeUrl } from "@/lib/youtubeEmbed";
import type { PortfolioProject } from "./types";

const ProjectCard = ({ project, onClick }: { project: PortfolioProject; onClick: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaLoading, setMediaLoading] = useState(true);
  
  const allMedia = useMemo(() => {
    const combined = [project.mainImage, ...project.images];
    const deduped = Array.from(new Set(combined));
    const yt = project.youtubeUrl?.trim() && getYouTubeEmbedSrc(project.youtubeUrl)
      ? project.youtubeUrl.trim()
      : null;
    if (!yt) return deduped;
    // On the grid (modal closed): trailer first only when enableVideo; otherwise mainImage leads.
    return project.enableVideo ? [yt, ...deduped] : [...deduped, yt];
  }, [project.mainImage, project.images, project.youtubeUrl, project.enableVideo]);

  useEffect(() => {
    setCurrentIndex((i) => {
      if (!allMedia.length) return 0;
      return Math.min(i, allMedia.length - 1);
    });
  }, [allMedia]);

  useEffect(() => {
    setMediaLoading(true);
  }, [currentIndex]);

  const goLeft = () => {
    setCurrentIndex((i) => (allMedia.length ? (i - 1 + allMedia.length) % allMedia.length : 0));
  };

  const goRight = () => {
    setCurrentIndex((i) => (allMedia.length ? (i + 1) % allMedia.length : 0));
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
            disabled={mediaLoading || allMedia.length <= 1}
            onClick={(e) => {
              e.stopPropagation();
              goLeft();
            }}
            className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/70 text-white text-lg rounded-full border border-white z-10 ${
              mediaLoading || allMedia.length <= 1 ? "opacity-40 pointer-events-none" : "hover:bg-black"
            }`}
            aria-label="Previous media"
          >
            ‹
          </button>

          {/* Right Arrow */}
          <button
            disabled={mediaLoading || allMedia.length <= 1}
            onClick={(e) => {
              e.stopPropagation();
              goRight();
            }}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/70 text-white text-lg rounded-full border border-white z-10 ${
              mediaLoading || allMedia.length <= 1 ? "opacity-40 pointer-events-none" : "hover:bg-black"
            }`}
            aria-label="Next media"
          >
            ›
          </button>

          {/* Loader overlay while switching media */}
          {mediaLoading && (
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
          ) : (
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
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-3">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-5">
            {project.shortDescription}
          </p>

          <div className="flex gap-3 flex-wrap">
            {project.genres.map((genre: string , i: Key | null | undefined) => (
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
