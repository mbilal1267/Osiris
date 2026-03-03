import { NextRequest, NextResponse } from "next/server";
import { fetchBackend } from "@/lib/apiBackend";

export async function GET(req: NextRequest) {
  try {
    const role = req.cookies.get("osiris_role")?.value;

    const endpoint = role === "brand" ? "/brand/onboarding/brand-details" : "/creator/onboarding/me";
    const backendRes = await fetchBackend(endpoint, {
      method: "GET",
    });

    if (!backendRes.ok) {
      return NextResponse.json({ error: "Not authenticated" }, { status: backendRes.status });
    }

    const userData = await backendRes.json();
    return NextResponse.json({ ...userData, role: role });
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

