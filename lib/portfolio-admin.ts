import { prisma } from "@/lib/prisma";
import { mediaKindFromUrl } from "@/lib/portfolio-mapper";

export type PortfolioProjectInput = {
  title: string;
  shortDescription: string;
  longDescription: string;
  mainImage: string;
  youtubeUrl?: string | null;
  googlePlayLink?: string | null;
  appStoreLink?: string | null;
  enableVideo?: boolean;
  genres: string[];
  images: string[];
};

export async function syncProjectGenres(projectId: string, genreNames: string[]) {
  const uniqueNames = [...new Set(genreNames.map((g) => g.trim()).filter(Boolean))];

  await prisma.projectGenre.deleteMany({ where: { projectId } });

  for (const name of uniqueNames) {
    const genre = await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    await prisma.projectGenre.create({
      data: { projectId, genreId: genre.id },
    });
  }
}

export async function syncProjectMedia(projectId: string, imageUrls: string[]) {
  await prisma.media.deleteMany({ where: { projectId } });

  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i]?.trim();
    if (!url) continue;
    await prisma.media.create({
      data: {
        projectId,
        url,
        kind: mediaKindFromUrl(url),
        sortOrder: i,
      },
    });
  }
}

export async function getProjectInclude() {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      genres: { include: { genre: true } },
      media: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      genres: { include: { genre: true } },
      media: { orderBy: { sortOrder: "asc" } },
    },
  });
}
