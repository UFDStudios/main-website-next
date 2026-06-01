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
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: {
      genres: { include: { genre: true } },
      media: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getNextProjectSortOrder() {
  const result = await prisma.project.aggregate({ _max: { sortOrder: true } });
  return (result._max.sortOrder ?? -1) + 1;
}

export async function reorderProjects(orderedIds: string[]) {
  const existing = await prisma.project.findMany({ select: { id: true } });
  const existingIds = new Set(existing.map((p) => p.id));

  if (orderedIds.length !== existing.length) {
    throw new Error("Reorder list must include every project exactly once");
  }

  const seen = new Set<string>();
  for (const id of orderedIds) {
    if (!existingIds.has(id) || seen.has(id)) {
      throw new Error("Invalid project id in reorder list");
    }
    seen.add(id);
  }

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.project.update({
        where: { id },
        data: { sortOrder: index },
      }),
    ),
  );
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
