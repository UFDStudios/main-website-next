import { prisma } from "@/lib/prisma";
import { mapProjectSummaryToApi, mapProjectToApi } from "@/lib/portfolio-mapper";

export const PORTFOLIO_PAGE_SIZE = 9;

export const PORTFOLIO_CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
};

const projectListSelect = {
  id: true,
  title: true,
  shortDescription: true,
  mainImage: true,
  youtubeUrl: true,
  enableVideo: true,
  genres: { select: { genre: { select: { name: true } } } },
  _count: { select: { media: true } },
} as const;

export function parsePortfolioQuery(searchParams: URLSearchParams) {
  const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10) || 1);
  const limit = Math.min(
    50,
    Math.max(1, Number.parseInt(searchParams.get("limit") || String(PORTFOLIO_PAGE_SIZE), 10) || PORTFOLIO_PAGE_SIZE)
  );
  const genre = searchParams.get("genre")?.trim() || null;

  return { page, limit, genre };
}

export function portfolioGenreWhere(genre: string | null) {
  if (!genre || genre === "All") return undefined;
  return { genres: { some: { genre: { name: genre } } } };
}

export async function fetchPortfolioPage(page: number, limit: number, genre: string | null) {
  const where = portfolioGenreWhere(genre);

  const rows = await prisma.project.findMany({
    where,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    skip: (page - 1) * limit,
    take: limit + 1,
    select: projectListSelect,
  });

  const hasMore = rows.length > limit;
  const pageRows = hasMore ? rows.slice(0, limit) : rows;

  return {
    projects: pageRows.map(mapProjectSummaryToApi),
    pagination: {
      page,
      limit,
      hasMore,
    },
  };
}

export async function fetchPortfolioProjectById(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      genres: { include: { genre: true } },
      media: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!project) return null;
  return mapProjectToApi(project);
}

export async function fetchPortfolioProjectMedia(id: string) {
  const media = await prisma.media.findMany({
    where: { projectId: id },
    orderBy: { sortOrder: "asc" },
    select: { url: true },
  });

  return media.map((m) => m.url);
}

export async function fetchPortfolioGenres() {
  const genres = await prisma.genre.findMany({
    include: { _count: { select: { projects: true } } },
  });

  const sorted = genres
    .filter((g) => g._count.projects > 0)
    .sort((a, b) => b._count.projects - a._count.projects || a.name.localeCompare(b.name))
    .map((g) => g.name);

  return ["All", ...sorted];
}
