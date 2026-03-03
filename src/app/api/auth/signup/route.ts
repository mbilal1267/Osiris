import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    // forward raw request directly to Java/Spring real backend auth API
    const backendRes = await fetch(`${backendUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: rawBody,
    });

    const data = await backendRes.json();
    if (!backendRes.ok) {
      return NextResponse.json({ error: data.error || "Signup failed" }, { status: backendRes.status });
    }

    // Docs specifies Response: { "osiris_token": "JWT_TOKEN" }
    const token = data.osiris_token || data.token;

    const bodyObj = JSON.parse(rawBody);
    const role = bodyObj.role;

    // Simulate backend user object for frontend zustand store (frontend expects user context)
    const mockUser = {
      id: "u" + Date.now(),
      email: bodyObj.email,
      role: role,
      name: bodyObj.name || bodyObj.email.split("@")[0],
      handle: role === "creator" ? bodyObj.email.split("@")[0].toLowerCase() : undefined,
      brandSlug: role === "brand" ? bodyObj.email.split("@")[0].toLowerCase() : undefined,
      onboarded: false,
    };

    const res = NextResponse.json({ user: mockUser, token: token }, { status: 201 });

    const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
    res.cookies.set("osiris_token", token, {
      path: "/",
      httpOnly: false,
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
    if (role) {
      res.cookies.set("osiris_role", role, {
        path: "/",
        httpOnly: false,
        maxAge: COOKIE_MAX_AGE,
        sameSite: "lax",
      });
    }

    return res;
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error updating via backend" }, { status: 500 });
  }
}

