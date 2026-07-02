import { NextResponse } from "next/server";
import { fetchPortfolioGenres, PORTFOLIO_CACHE_HEADERS } from "@/lib/portfolio-public";

export const runtime = "nodejs";
export const revalidate = 60;

export async function GET() {
  try {
    const genres = await fetchPortfolioGenres();
    return NextResponse.json(genres, { headers: PORTFOLIO_CACHE_HEADERS });
  } catch (err) {
    console.error("[api/portfolio/genres] GET failed", err);
    const message = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json(
      process.env.NODE_ENV === "production"
        ? { error: "Portfolio genres API failed" }
        : { error: "Portfolio genres API failed", detail: message },
      { status: 500 }
    );
  }
}
