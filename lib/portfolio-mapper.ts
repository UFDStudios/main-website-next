import type { MediaKind, Prisma } from "@prisma/client";
import type { PortfolioProject, PortfolioProjectSummary } from "@/app/components/portfolio/types";

export type PortfolioApiProject = PortfolioProject;

type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    genres: { include: { genre: true } };
    media: true;
  };
}>;

type ProjectSummaryRow = Prisma.ProjectGetPayload<{
  select: {
    id: true;
    title: true;
    shortDescription: true;
    mainImage: true;
    youtubeUrl: true;
    enableVideo: true;
    genres: { select: { genre: { select: { name: true } } } };
    _count: { select: { media: true } };
  };
}>;

export function mapProjectSummaryToApi(project: ProjectSummaryRow): PortfolioProjectSummary {
  return {
    id: project.id,
    title: project.title,
    shortDescription: project.shortDescription,
    mainImage: project.mainImage,
    youtubeUrl: project.youtubeUrl,
    enableVideo: project.enableVideo,
    genres: project.genres.map((g) => g.genre.name),
    mediaCount: project._count.media,
  };
}

export function mapProjectToApi(project: ProjectWithRelations): PortfolioApiProject {
  return {
    id: project.id,
    title: project.title,
    shortDescription: project.shortDescription,
    longDescription: project.longDescription,
    mainImage: project.mainImage,
    youtubeUrl: project.youtubeUrl,
    googlePlayLink: project.googlePlayLink,
    appStoreLink: project.appStoreLink,
    enableVideo: project.enableVideo,
    genres: project.genres.map((g) => g.genre.name),
    mediaCount: project.media.length,
    images: project.media
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((m) => m.url),
  };
}

export function mediaKindFromUrl(url: string): MediaKind {
  return url.toLowerCase().endsWith(".mp4") ? "VIDEO" : "IMAGE";
}
