import { NextResponse } from "next/server";
import { fetchPortfolioPage, parsePortfolioQuery, PORTFOLIO_CACHE_HEADERS } from "@/lib/portfolio-public";

export const runtime = "nodejs";
export const revalidate = 60;

export async function GET(request: Request) {
  try {
    const { page, limit, genre } = parsePortfolioQuery(new URL(request.url).searchParams);
    const result = await fetchPortfolioPage(page, limit, genre);
    return NextResponse.json(result, { headers: PORTFOLIO_CACHE_HEADERS });
  } catch (err) {
    console.error("[api/portfolio] GET failed", err);
    const message = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json(
      process.env.NODE_ENV === "production"
        ? { error: "Portfolio API failed" }
        : { error: "Portfolio API failed", detail: message },
      { status: 500 }
    );
  }
}
