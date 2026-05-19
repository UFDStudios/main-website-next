import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-api";
import { mapProjectToApi } from "@/lib/portfolio-mapper";
import {
  getProjectById,
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

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  const { id } = await context.params;

  try {
    const project = await getProjectById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(mapProjectToApi(project));
  } catch (err) {
    console.error("[api/admin/portfolio/[id]] GET failed", err);
    return NextResponse.json({ error: "Failed to load project" }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  const { id } = await context.params;

  try {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const data = parseProjectBody(await request.json());
    if (!data) {
      return NextResponse.json({ error: "Invalid project data" }, { status: 400 });
    }

    await prisma.project.update({
      where: { id },
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

    await syncProjectGenres(id, data.genres);
    await syncProjectMedia(id, data.images);

    const full = await getProjectById(id);
    return NextResponse.json(full ? mapProjectToApi(full) : { id });
  } catch (err) {
    console.error("[api/admin/portfolio/[id]] PATCH failed", err);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  const { id } = await context.params;

  try {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/admin/portfolio/[id]] DELETE failed", err);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
