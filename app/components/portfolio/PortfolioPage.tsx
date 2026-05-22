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

    // Sort by frequency (highest first), then alphabetically for ties
    const sortedGenres = Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
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

  const activeProjectIndex = useMemo(() => {
    if (!activeProject) return -1;
    return filteredProjects.findIndex((p) => p.id === activeProject.id);
  }, [activeProject, filteredProjects]);

  const goToPrevProject = useCallback(() => {
    const len = filteredProjects.length;
    if (len <= 1 || activeProjectIndex < 0) return;
    const next = (activeProjectIndex - 1 + len) % len;
    setActiveProject(filteredProjects[next]);
  }, [activeProjectIndex, filteredProjects]);

  const goToNextProject = useCallback(() => {
    const len = filteredProjects.length;
    if (len <= 1 || activeProjectIndex < 0) return;
    const next = (activeProjectIndex + 1) % len;
    setActiveProject(filteredProjects[next]);
  }, [activeProjectIndex, filteredProjects]);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollLeft = 0;
    updateScrollButtons();

    const onScroll = () => updateScrollButtons();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => updateScrollButtons());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [allGenres, updateScrollButtons]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -280, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 280, behavior: "smooth" });
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

          {/* Genre carousel — scroll row; arrows sit beside track so "All" is not clipped */}
          {!loading && !loadError && (
            <div className="flex items-center gap-3 mb-10 min-w-0">
              <button
                type="button"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                aria-label="Scroll genres left"
                className="shrink-0 bg-black/70 hover:bg-black disabled:opacity-30 disabled:pointer-events-none text-white w-10 h-10 rounded-full"
              >
                ‹
              </button>

              <div
                ref={scrollRef}
                className="flex flex-nowrap gap-4 overflow-x-auto scrollbar-hide scroll-smooth justify-start min-w-0 flex-1 py-1"
              >
                {allGenres.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => handleGenreClick(genre)}
                    className={`
                      shrink-0 px-8 py-3 text-lg rounded-full border whitespace-nowrap transition-all duration-200
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

              <button
                type="button"
                onClick={scrollRight}
                disabled={!canScrollRight}
                aria-label="Scroll genres right"
                className="shrink-0 bg-black/70 hover:bg-black disabled:opacity-30 disabled:pointer-events-none text-white w-10 h-10 rounded-full"
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
        <PortfolioModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onPrevProject={goToPrevProject}
          onNextProject={goToNextProject}
          canNavigateProjects={filteredProjects.length > 1}
        />
      )}
    </>
  );
};

export default Portfolio;
