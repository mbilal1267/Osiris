import { NextRequest, NextResponse } from "next/server";
import { fetchBackend } from "@/lib/apiBackend";

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const backendRes = await fetchBackend(`/brands/${params.slug}`);
    return NextResponse.json(backendRes.data);
  } catch (error: any) {
    return NextResponse.json({ error: "Brand not found" }, { status: error.response?.status || 404 });
  }
}

