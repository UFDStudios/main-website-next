import { NextResponse } from "next/server";
import { fetchPortfolioProjectMedia, PORTFOLIO_CACHE_HEADERS } from "@/lib/portfolio-public";

export const runtime = "nodejs";
export const revalidate = 60;

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const images = await fetchPortfolioProjectMedia(id);

    return NextResponse.json({ images }, { headers: PORTFOLIO_CACHE_HEADERS });
  } catch (err) {
    console.error("[api/portfolio/[id]/media] GET failed", err);
    const message = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json(
      process.env.NODE_ENV === "production"
        ? { error: "Portfolio media API failed" }
        : { error: "Portfolio media API failed", detail: message },
      { status: 500 }
    );
  }
}
