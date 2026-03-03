import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Default to app logic mapping against backend login endpoint
    const backendRes = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: rawBody,
    });

    const data = await backendRes.json();
    if (!backendRes.ok) {
      return NextResponse.json({ error: data.error || "Invalid credentials" }, { status: backendRes.status });
    }

    const token = data.osiris_token || data.token;

    // In actual auth, we might fetch user via GET /brand/onboarding/brand-details or creator equivalent here to populate context.
    // For now, reconstruct role mock.
    const bodyObj = JSON.parse(rawBody);
    const mockUser = {
      id: "u" + Date.now(),
      email: bodyObj.email,
      role: bodyObj.email.includes("brand") ? "brand" : "creator", // Fake fallback mock until actual profiles are merged
      name: bodyObj.email.split("@")[0],
      onboarded: false,
    };

    const res = NextResponse.json({ user: mockUser, token: token });

    const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
    res.cookies.set("osiris_token", token, {
      path: "/",
      httpOnly: false,
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
    res.cookies.set("osiris_role", mockUser.role, {
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

