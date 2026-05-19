import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-api";
import { mapProjectToApi } from "@/lib/portfolio-mapper";
import {
  getProjectInclude,
  syncProjectGenres,
  syncProjectMedia,
  type PortfolioProjectInput,
} from "@/lib/portfolio-admin";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function parseProjectBody(body: unknown): PortfolioProjectInput | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  if (typeof b.title !== "string" || !b.title.trim()) return null;
  if (typeof b.shortDescription !== "string") return null;
  if (typeof b.longDescription !== "string") return null;
  if (typeof b.mainImage !== "string" || !b.mainImage.trim()) return null;

  return {
    title: b.title.trim(),
    shortDescription: b.shortDescription,
    longDescription: b.longDescription,
    mainImage: b.mainImage.trim(),
    youtubeUrl: typeof b.youtubeUrl === "string" ? b.youtubeUrl.trim() || null : null,
    googlePlayLink: typeof b.googlePlayLink === "string" ? b.googlePlayLink.trim() || null : null,
    appStoreLink: typeof b.appStoreLink === "string" ? b.appStoreLink.trim() || null : null,
    enableVideo: Boolean(b.enableVideo),
    genres: Array.isArray(b.genres)
      ? b.genres.filter((g): g is string => typeof g === "string")
      : [],
    images: Array.isArray(b.images)
      ? b.images.filter((u): u is string => typeof u === "string")
      : [],
  };
}

export async function GET() {
  const authError = await requireAdminApi();
  if (authError) return authError;

  try {
    const projects = await getProjectInclude();
    return NextResponse.json(projects.map(mapProjectToApi));
  } catch (err) {
    console.error("[api/admin/portfolio] GET failed", err);
    return NextResponse.json({ error: "Failed to load portfolio" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  try {
    const data = parseProjectBody(await request.json());
    if (!data) {
      return NextResponse.json({ error: "Invalid project data" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title: data.title,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        mainImage: data.mainImage,
        youtubeUrl: data.youtubeUrl,
        googlePlayLink: data.googlePlayLink,
        appStoreLink: data.appStoreLink,
        enableVideo: data.enableVideo ?? false,
      },
    });

    await syncProjectGenres(project.id, data.genres);
    await syncProjectMedia(project.id, data.images);

    const full = await prisma.project.findUnique({
      where: { id: project.id },
      include: {
        genres: { include: { genre: true } },
        media: { orderBy: { sortOrder: "asc" } },
      },
    });

    return NextResponse.json(full ? mapProjectToApi(full) : { id: project.id }, { status: 201 });
  } catch (err) {
    console.error("[api/admin/portfolio] POST failed", err);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
