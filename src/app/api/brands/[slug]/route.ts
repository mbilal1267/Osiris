import { NextRequest, NextResponse } from "next/server";
import { fetchBackend } from "@/lib/apiBackend";

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const backendRes = await fetchBackend(`/brands/${params.slug}`);
  if (!backendRes.ok) {
    return NextResponse.json({ error: "Brand not found" }, { status: 404 });
  }
  const data = await backendRes.json();
  return NextResponse.json(data);
}

