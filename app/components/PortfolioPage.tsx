"use client";

import Image from "next/image";
//import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Key, useCallback, useEffect, useMemo, useRef, useState } from "react";

type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  mainImage: string;
  images: string[];
  genres: string[];
};

type Project = PortfolioProject;

const SectionSpinner = ({ label = "Loading" }: { label?: string }) => {
  return (
    <div className="w-full py-14 flex items-center justify-center" role="status" aria-label={label}>
      <div className="h-7 w-7 rounded-full border-2 border-white/20 border-t-neon-green animate-spin" />
    </div>
  );
};

const PortfolioModal = ({ project, onClose }: { project: any; onClose: () => void }) => {
  const images = project.images || [];
  const containerRef = useRef<HTMLDivElement>(null);

  const [orientations, setOrientations] = useState<boolean[]>([]);
  const [scrollX, setScrollX] = useState(0);

  // For fullscreen lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollAmount = 350;

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  useEffect(() => {
    setOrientations(new Array(images.length).fill(false));
  }, [images]);

  const handleImageLoad = (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const isLandscape = img.naturalWidth > img.naturalHeight;
    setOrientations(prev => {
      const updated = [...prev];
      updated[index] = isLandscape;
      return updated;
    });
  };

  // Separate media
  const portraits: string[] = [];
  const landscapes: string[] = [];
  const videos: string[] = [];

  images.forEach((media: string, index: number) => {
    const isVideo = media.toLowerCase().endsWith(".mp4");
    if (isVideo) videos.push(media);
    else if (orientations[index]) landscapes.push(media);
    else portraits.push(media);
  });

  const orderedMedia = [...portraits, ...landscapes, ...videos];

  // Scroll
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
  const canScrollRight = containerRef.current && scrollX < containerRef.current.scrollWidth - containerRef.current.clientWidth - 5;

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
          <p className="text-gray-300 whitespace-pre-line mb-8">{project.description}</p>

          <div className="flex flex-wrap gap-3 mb-10">
            {project.genres.map((genre: string, i: Key | null | undefined) => (
              <span key={i} className="border border-gray-700 px-4 py-2 rounded-md text-white">{genre}</span>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-white mb-4">Gallery</h3>

          <div className="relative">
            {canScrollLeft && (
              <button onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/70 hover:bg-black text-white text-2xl rounded-full z-10"
              >
                ‹
              </button>
            )}
            {canScrollRight && (
              <button onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/70 hover:bg-black text-white text-2xl rounded-full z-10"
              >
                ›
              </button>
            )}

            <div ref={containerRef} className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth">
              {orderedMedia.map((media, index) => {
                const isVideo = media.toLowerCase().endsWith(".mp4");
                const isPortrait = portraits.includes(media);
                const portraitMarginClasses = isPortrait ? `${index === 0 ? "lg:ml-36" : ""} ${index === orderedMedia.length - 1 ? "lg:mr-36" : ""}`: "";

                return (
                  <div
                    key={index} onClick={() => !isVideo && setLightboxIndex(index)}
                    className={`flex-shrink-0 ${isPortrait ? 'h-64' : 'h-32 lg:h-64'} bg-black flex items-center justify-center rounded-lg shadow-md cursor-pointer
                      ${isPortrait ? "mx-auto max-w-[350px] w-auto" : "w-[250px] lg:w-[350px]"} ${portraitMarginClasses}
                    `}
                  >
                    {isVideo ? (
                      <video src={media} controls className={`${isPortrait ? 'h-64' : 'h-32 lg:h-64'} w-full object-cover rounded-lg`}/>
                    ) : (
                      <Image
                        src={media}
                        alt=""
                        width={500}
                        height={500}
                        onLoad={(e) => handleImageLoad(index, e)}
                        className={`${ isPortrait ? "h-full w-auto object-contain" : "h-full w-full object-cover"} rounded-lg`}
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

          {/* Centered image */}
          <Image
            src={orderedMedia[lightboxIndex]}
            alt=""
            width={1200}
            height={1200}
            className={`object-contain ${
              portraits.includes(orderedMedia[lightboxIndex])
                ? "max-h-[calc(100%-160px)]" // Add top/bottom margin for portrait
                : "max-h-full"
            }`}
          />
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ project, onClick }: { project: any; onClick: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaLoading, setMediaLoading] = useState(true);
  
  const allMedia = useMemo(() => {
    return [project.mainImage, ...project.images];
  }, [project.mainImage, project.images]);

  useEffect(() => {
    // When the media changes (arrow click), show loader until it finishes loading.
    setMediaLoading(true);
  }, [currentIndex]);

  const goLeft = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goRight = () => {
    if (currentIndex < allMedia.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const currentMedia = allMedia[currentIndex] || "";
  const isVideo = currentMedia.toLowerCase().endsWith(".mp4");

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
          {currentIndex > 0 && (
            <button
              disabled={mediaLoading}
              onClick={(e) => {
                e.stopPropagation();
                goLeft();
              }}
              className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/70 text-white text-lg rounded-full border border-white z-10 ${
                mediaLoading ? "opacity-40 pointer-events-none" : "hover:bg-black"
              }`}
            >
              ‹
            </button>
          )}

          {/* Right Arrow */}
          {currentIndex < allMedia.length - 1 && (
            <button
              disabled={mediaLoading}
              onClick={(e) => {
                e.stopPropagation();
                goRight();
              }}
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/70 text-white text-lg rounded-full border border-white z-10 ${
                mediaLoading ? "opacity-40 pointer-events-none" : "hover:bg-black"
              }`}
            >
              ›
            </button>
          )}

          {/* Loader overlay while switching media */}
          {mediaLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none">
              <div className="h-7 w-7 rounded-full border-2 border-white/25 border-t-neon-green animate-spin" />
            </div>
          )}

          {/* Media Display */}
          {isVideo ? (
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
            {project.description}
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

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeGenre, setActiveGenre] = useState<string>("All");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setLoadError(null);
        const res = await fetch("/api/portfolio", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load portfolio (${res.status})`);
        const data = (await res.json()) as PortfolioProject[];
        if (!cancelled) setProjects(Array.isArray(data) ? data : []);
      } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to load portfolio";
        console.error("[PortfolioPage] load failed", e);
        if (!cancelled) setLoadError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // 🔹 Unique genres (clean + sorted)
  const allGenres = useMemo(() => {
    const genreCount: Record<string, number> = {};

    // Count occurrences
    projects.forEach(project => {
      project.genres.forEach(genre => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    });

    // Sort by frequency (highest first)
    const sortedGenres = Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7) // 👈 top 7 only
      .map(entry => entry[0]);

    return ["All", ...sortedGenres];
  }, [projects]);

  // 🔹 Sync URL with genre filter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlGenre = urlParams.get("genre") || "All";

    if (allGenres.includes(urlGenre)) setActiveGenre(urlGenre);
    else setActiveGenre("All");
  }, [allGenres]);

  // 🔹 Update URL when genre changes
  const updateUrl = useCallback((genre: string) => {
    const url = new URL(window.location.href);
    if (genre === "All") url.searchParams.delete("genre");
    else url.searchParams.set("genre", genre);
    window.history.replaceState({}, "", url);
  }, []);

  // 🔹 Handle genre click with URL update
  const handleGenreClick = useCallback(
    (genre: string) => {
      setActiveGenre(genre);
      updateUrl(genre);
    },
    [updateUrl]
  );

  const filteredProjects = useMemo(() => {
    if (activeGenre === "All") return projects;
    return projects.filter(p =>
      p.genres.includes(activeGenre)
    );
  }, [activeGenre, projects]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <>
      <section className="mx-auto max-w-[96rem] px-6 pb-20">
        <div>
          {/* HEADER */}
          <div className="text-center mb-7">
            <h1 className="text-5xl font-extrabold text-white">
              Our <span className="text-neon-green">Portfolio</span>
            </h1>
          </div>

          {/* 🔥 GENRE BAR */}
          {!loading && !loadError && (
            <div className="relative mb-10">

              {/* Left Arrow */}
              <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full">
                ‹
              </button>

              {/* Scroll Container */}
              <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide justify-center min-w-full">
                {allGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreClick(genre)}  // 👈 Updated handler
                    className={`
                      px-8 py-3 text-lg rounded-full border whitespace-nowrap transition-all duration-200
                      ${
                        activeGenre === genre
                          ? "bg-neon-green text-black border-neon-green"
                          : "border-white/30 text-white/80 hover:border-neon-green hover:text-white"
                      }
                    `}
                  >
                    {genre}
                  </button>
                ))}
              </div>

              {/* Right Arrow */}
              <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full">
                ›
              </button>
            </div>
          )}

          {/* GRID */}
          {loading ? (
            <SectionSpinner label="Loading portfolio" />
          ) : loadError ? (
            <div className="text-center text-red-300 py-14">
              {loadError}
              <div className="text-white/60 text-sm mt-2">Open DevTools → Console to see details.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setActiveProject(project)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {activeProject && (
        <PortfolioModal project={activeProject} onClose={() => setActiveProject(null)}/>
      )}
    </>
  );
};

export default Portfolio;