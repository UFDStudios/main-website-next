import type { MediaKind, Prisma } from "@prisma/client";

export type PortfolioApiProject = {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  mainImage: string;
  youtubeUrl: string | null;
  googlePlayLink: string | null;
  appStoreLink: string | null;
  enableVideo: boolean;
  genres: string[];
  images: string[];
};

type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    genres: { include: { genre: true } };
    media: true;
  };
}>;

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
    images: project.media
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((m) => m.url),
  };
}

export function mediaKindFromUrl(url: string): MediaKind {
  return url.toLowerCase().endsWith(".mp4") ? "VIDEO" : "IMAGE";
}
