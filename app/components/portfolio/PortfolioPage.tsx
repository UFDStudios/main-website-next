"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PortfolioModal from "./PortfolioModal";
import ProjectCard from "./ProjectCard";
import type { PortfolioPageResponse, PortfolioProject, PortfolioProjectSummary } from "./types";

const PAGE_SIZE = 9;

const SectionSpinner = ({ label = "Loading" }: { label?: string }) => {
  return (
    <div className="w-full py-14 flex items-center justify-center" role="status" aria-label={label}>
      <div className="h-7 w-7 rounded-full border-2 border-white/20 border-t-neon-green animate-spin" />
    </div>
  );
};

async function readApiError(res: Response) {
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
  return `Failed to load portfolio (${res.status})${suffix}`;
}

function buildProjectsUrl(page: number, genre: string) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(PAGE_SIZE),
  });
  if (genre !== "All") params.set("genre", genre);
  return `/api/portfolio?${params.toString()}`;
}

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [activeGenre, setActiveGenre] = useState<string>("All");
  const scrollRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const projectDetailsCache = useRef<Map<string, PortfolioProject>>(new Map());
  const [allGenres, setAllGenres] = useState<string[]>(["All"]);
  const [projects, setProjects] = useState<PortfolioProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);
  const fetchGenerationRef = useRef(0);
  const loadingMoreRef = useRef(false);

  const fetchProjectsPage = useCallback(async (nextPage: number, genre: string, append: boolean) => {
    const generation = fetchGenerationRef.current;
    const res = await fetch(buildProjectsUrl(nextPage, genre));
    if (!res.ok) throw new Error(await readApiError(res));

    const data = (await res.json()) as PortfolioPageResponse;
    if (generation !== fetchGenerationRef.current) return;

    const incoming = Array.isArray(data.projects) ? data.projects : [];
    setProjects((prev) => (append ? [...prev, ...incoming] : incoming));
    setHasMore(Boolean(data.pagination?.hasMore));
    setPage(nextPage);
  }, []);

  const loadProjectDetail = useCallback(async (summary: PortfolioProjectSummary) => {
    const cached = projectDetailsCache.current.get(summary.id);
    if (cached) {
      setActiveProject(cached);
      return;
    }

    setModalLoading(true);
    try {
      const res = await fetch(`/api/portfolio/${summary.id}`);
      if (!res.ok) throw new Error(await readApiError(res));
      const project = (await res.json()) as PortfolioProject;
      projectDetailsCache.current.set(summary.id, project);
      setActiveProject(project);
    } catch (e) {
      console.error("[PortfolioPage] detail load failed", e);
    } finally {
      setModalLoading(false);
    }
  }, []);

  const loadInitial = useCallback(async () => {
    const generation = ++fetchGenerationRef.current;
    setLoading(true);
    setLoadingMore(false);
    setLoadError(null);
    setProjects([]);
    setHasMore(false);
    setPage(0);

    const urlParams = new URLSearchParams(window.location.search);
    const urlGenre = urlParams.get("genre") || "All";

    try {
      const [genresRes, projectsRes] = await Promise.all([
        fetch("/api/portfolio/genres"),
        fetch(buildProjectsUrl(1, urlGenre)),
      ]);

      if (!genresRes.ok) throw new Error(await readApiError(genresRes));
      if (!projectsRes.ok) throw new Error(await readApiError(projectsRes));

      const genres = (await genresRes.json()) as string[];
      const genreList = Array.isArray(genres) && genres.length ? genres : ["All"];
      const initialGenre = genreList.includes(urlGenre) ? urlGenre : "All";
      const data = (await projectsRes.json()) as PortfolioPageResponse;

      if (generation !== fetchGenerationRef.current) return;

      setAllGenres(genreList);
      setActiveGenre(initialGenre);

      if (initialGenre !== urlGenre) {
        await fetchProjectsPage(1, initialGenre, false);
      } else {
        setProjects(Array.isArray(data.projects) ? data.projects : []);
        setHasMore(Boolean(data.pagination?.hasMore));
        setPage(1);
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to load portfolio";
      console.error("[PortfolioPage] load failed", e);
      setLoadError(message);
    } finally {
      if (generation === fetchGenerationRef.current) setLoading(false);
    }
  }, [fetchProjectsPage]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  const loadMore = useCallback(async () => {
    if (loading || loadingMoreRef.current || !hasMore) return;

    loadingMoreRef.current = true;
    setLoadingMore(true);
    try {
      await fetchProjectsPage(page + 1, activeGenre, true);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to load more projects";
      console.error("[PortfolioPage] load more failed", e);
      setLoadError(message);
    } finally {
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }
  }, [activeGenre, fetchProjectsPage, hasMore, loading, page]);

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void loadMore();
        }
      },
      { rootMargin: "240px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore, loading, projects.length]);

  const updateUrl = useCallback((genre: string) => {
    const url = new URL(window.location.href);
    if (genre === "All") url.searchParams.delete("genre");
    else url.searchParams.set("genre", genre);
    window.history.replaceState({}, "", url);
  }, []);

  const handleGenreClick = useCallback(
    async (genre: string) => {
      if (genre === activeGenre || loading) return;

      fetchGenerationRef.current += 1;
      setActiveGenre(genre);
      updateUrl(genre);
      setLoading(true);
      setLoadingMore(false);
      setLoadError(null);
      setProjects([]);
      setHasMore(false);
      setPage(0);
      setActiveProject(null);

      try {
        await fetchProjectsPage(1, genre, false);
      } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to load portfolio";
        console.error("[PortfolioPage] genre filter failed", e);
        setLoadError(message);
      } finally {
        setLoading(false);
      }
    },
    [activeGenre, fetchProjectsPage, loading, updateUrl]
  );

  const activeProjectIndex = useMemo(() => {
    if (!activeProject) return -1;
    return projects.findIndex((p) => p.id === activeProject.id);
  }, [activeProject, projects]);

  const goToPrevProject = useCallback(() => {
    const len = projects.length;
    if (len <= 1 || activeProjectIndex < 0) return;
    const next = (activeProjectIndex - 1 + len) % len;
    void loadProjectDetail(projects[next]);
  }, [activeProjectIndex, loadProjectDetail, projects]);

  const goToNextProject = useCallback(() => {
    const len = projects.length;
    if (len <= 1 || activeProjectIndex < 0) return;
    const next = (activeProjectIndex + 1) % len;
    void loadProjectDetail(projects[next]);
  }, [activeProjectIndex, loadProjectDetail, projects]);

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
          <div className="text-center mb-7">
            <h1 className="text-5xl font-extrabold text-white">
              Our <span className="text-neon-green">Portfolio</span>
            </h1>
          </div>

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

          {loading ? (
            <SectionSpinner label="Loading portfolio" />
          ) : loadError ? (
            <div className="text-center text-red-300 py-14">
              {loadError}
              <div className="text-white/60 text-sm mt-2">Open DevTools → Console to see details.</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => void loadProjectDetail(project)}
                  />
                ))}
              </div>

              {projects.length === 0 && (
                <p className="text-center text-white/60 py-14">No projects found for this genre.</p>
              )}

              {hasMore && (
                <div ref={loadMoreRef} className="w-full py-10 flex items-center justify-center">
                  {loadingMore && (
                    <div className="h-7 w-7 rounded-full border-2 border-white/20 border-t-neon-green animate-spin" />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {modalLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="h-8 w-8 rounded-full border-2 border-white/20 border-t-neon-green animate-spin" />
        </div>
      )}

      {activeProject && !modalLoading && (
        <PortfolioModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onPrevProject={goToPrevProject}
          onNextProject={goToNextProject}
          canNavigateProjects={projects.length > 1}
        />
      )}
    </>
  );
};

export default Portfolio;
