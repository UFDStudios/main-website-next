import { NextResponse } from "next/server";
import { fetchPortfolioProjectById, PORTFOLIO_CACHE_HEADERS } from "@/lib/portfolio-public";

export const runtime = "nodejs";
export const revalidate = 60;

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const project = await fetchPortfolioProjectById(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project, { headers: PORTFOLIO_CACHE_HEADERS });
  } catch (err) {
    console.error("[api/portfolio/[id]] GET failed", err);
    const message = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json(
      process.env.NODE_ENV === "production"
        ? { error: "Portfolio detail API failed" }
        : { error: "Portfolio detail API failed", detail: message },
      { status: 500 }
    );
  }
}
