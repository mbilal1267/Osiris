import { NextRequest, NextResponse } from "next/server";
import { fetchBackend } from "@/lib/apiBackend";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = url.searchParams.toString();

  const backendRes = await fetchBackend(`/creators${searchParams ? `?${searchParams}` : ''}`);

  if (!backendRes.ok) {
    return NextResponse.json({ error: "Creators search failed" }, { status: backendRes.status });
  }

  const data = await backendRes.json();
  return NextResponse.json(data);
}

