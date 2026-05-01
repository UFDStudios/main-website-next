import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      genres: { include: { genre: true } },
      media: { orderBy: { sortOrder: "asc" } },
    },
  });

  return NextResponse.json(
    projects.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      mainImage: p.mainImage,
      genres: p.genres.map((g) => g.genre.name),
      images: p.media.map((m) => m.url),
    }))
  );
}

