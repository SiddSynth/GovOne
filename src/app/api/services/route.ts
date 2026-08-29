import { NextRequest, NextResponse } from "next/server";
import { services } from "@/data/servicesRegistry";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let list = services;
  if (category) {
    list = services.filter((s) => s.categoryId === category);
  }

  return NextResponse.json(list);
}
