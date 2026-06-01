import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      include: {
        genres: { include: { genre: true } },
        media: { orderBy: { sortOrder: "asc" } },
      },
    });

    return NextResponse.json(
      projects.map((p) => ({
        id: p.id,
        title: p.title,
        shortDescription: p.shortDescription,
        longDescription: p.longDescription,
        mainImage: p.mainImage,
        youtubeUrl: p.youtubeUrl,
        googlePlayLink: p.googlePlayLink,
        appStoreLink: p.appStoreLink,
        enableVideo: p.enableVideo,
        genres: p.genres.map((g) => g.genre.name),
        images: p.media.map((m) => m.url),
      }))
    );
  } catch (err) {
    console.error("[api/portfolio] GET failed", err);
    const message =
      err instanceof Error
        ? err.message
        : "Unknown error";

    return NextResponse.json(
      process.env.NODE_ENV === "production"
        ? { error: "Portfolio API failed" }
        : { error: "Portfolio API failed", detail: message },
      { status: 500 }
    );
  }
}

