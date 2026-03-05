import { NextRequest, NextResponse } from "next/server";
import { fetchBackend } from "@/lib/apiBackend";

export async function GET(req: NextRequest) {
  try {
    const role = req.cookies.get("osiris_role")?.value;

    const endpoint = role === "brand" ? "/brand/onboarding/brand-details" : "/creator/onboarding/me";
    let backendRes;
    try {
      backendRes = await fetchBackend(endpoint, { method: "GET" });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: "Not authenticated" }, { status: error.response?.status || 500 });
    }

    const userData = backendRes.data;
    return NextResponse.json({ ...userData, role: role });
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

