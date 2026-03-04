import { NextRequest, NextResponse } from "next/server";
import { fetchBackend } from "@/lib/apiBackend";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = url.searchParams.toString();

  try {
    const backendRes = await fetchBackend(`/creators${searchParams ? `?${searchParams}` : ''}`);
    return NextResponse.json(backendRes.data);
  } catch (error: any) {
    return NextResponse.json({ error: "Creators search failed" }, { status: error.response?.status || 500 });
  }
}

