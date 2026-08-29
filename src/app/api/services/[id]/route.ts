import { NextRequest, NextResponse } from "next/server";
import { services } from "@/data/servicesRegistry";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  return NextResponse.json(service);
}
