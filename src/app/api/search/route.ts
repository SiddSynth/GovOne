import { NextRequest, NextResponse } from "next/server";
import { processSearch } from "@/utils/searchEngine";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const state = searchParams.get("state") || "";

  const results = processSearch(q, state);

  return NextResponse.json({
    query: q,
    results,
    timestamp: new Date().toISOString(),
  });
}
