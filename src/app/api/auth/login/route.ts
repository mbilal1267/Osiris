import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const bodyObj = JSON.parse(rawBody);
    const providedRole = bodyObj.role.toUpperCase();

    // Default to app logic mapping against backend login endpoint
    let data;
    try {
      const backendRes = await axios.post(`${backendUrl}/auth/login`, bodyObj, {
        headers: { "Content-Type": "application/json" }
      });
      data = backendRes.data;
    } catch (e: any) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        const errorData = e.response?.data || { error: "Invalid credentials" };
        return NextResponse.json(errorData, { status: e.response?.status || 500 });
      }
      throw e;
    }

    const token = data.osiris_token || data.token || data.jwt;

    let role = providedRole?.toLowerCase() || "creator";
    try {
      if (token) {
        const payloadBase64 = token.split(".")[1];
        if (payloadBase64) {
          const payload = JSON.parse(Buffer.from(payloadBase64, "base64").toString("utf-8"));
          if (payload.role) {
            role = payload.role.toLowerCase();
          }
        }
      }
    } catch (e) {
      console.error("JWT Decode error in login:", e);
    }

    const res = NextResponse.json({ osiris_token: token });

    const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
    res.cookies.set("osiris_token", token, {
      path: "/",
      httpOnly: false,
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
    res.cookies.set("osiris_role", role, {
      path: "/",
      httpOnly: false,
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

