"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PortfolioModal from "./PortfolioModal";
import ProjectCard from "./ProjectCard";
import type { PortfolioProject } from "./types";

type Project = PortfolioProject;

const SectionSpinner = ({ label = "Loading" }: { label?: string }) => {
  return (
    <div className="w-full py-14 flex items-center justify-center" role="status" aria-label={label}>
      <div className="h-7 w-7 rounded-full border-2 border-white/20 border-t-neon-green animate-spin" />
    </div>
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
        if (!res.ok) {
          let serverMessage = "";
          try {
            const contentType = res.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
              const body = (await res.json()) as unknown;
              if (body && typeof body === "object" && "error" in body) {
                const maybeError = (body as { error?: unknown }).error;
                if (typeof maybeError === "string") serverMessage = maybeError;
              }
            } else {
              serverMessage = (await res.text()).trim();
            }
          } catch {
            // ignore parse errors
          }

          const suffix = serverMessage ? `: ${serverMessage}` : "";
          throw new Error(`Failed to load portfolio (${res.status})${suffix}`);
        }
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
            <div className="relative mb-10 overflow-visible">

              {/* Left Arrow */}
              <button
                onClick={scrollLeft}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full"
              >
                ‹
              </button>

              {/* Scroll Container */}
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide justify-start sm:justify-center min-w-full px-12"
              >
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
              <button
                onClick={scrollRight}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full"
              >
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
