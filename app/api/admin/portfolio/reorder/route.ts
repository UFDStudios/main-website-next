import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-api";
import { reorderProjects } from "@/lib/portfolio-admin";

export const runtime = "nodejs";

function parseOrderedIds(body: unknown): string[] | null {
  if (!body || typeof body !== "object") return null;
  const ids = (body as { ids?: unknown }).ids;
  if (!Array.isArray(ids)) return null;
  const parsed = ids.filter((id): id is string => typeof id === "string" && id.length > 0);
  return parsed.length === ids.length ? parsed : null;
}

export async function PATCH(request: Request) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  try {
    const orderedIds = parseOrderedIds(await request.json());
    if (!orderedIds || orderedIds.length === 0) {
      return NextResponse.json({ error: "Invalid reorder payload" }, { status: 400 });
    }

    await reorderProjects(orderedIds);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/admin/portfolio/reorder] PATCH failed", err);
    const message = err instanceof Error ? err.message : "Failed to reorder";
    const status = message.includes("Invalid") || message.includes("must include") ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
