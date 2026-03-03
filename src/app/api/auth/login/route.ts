import { NextRequest, NextResponse } from "next/server";
import { mockUsers } from "@/data/seed";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  const user = mockUsers.find((u) => u.email === email && u.password === password);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = "mock_token_" + Date.now();
  const { password: _, ...safeUser } = user;

  const res = NextResponse.json({ user: safeUser, token });

  // Set cookies for server-side middleware
  res.cookies.set("osiris_token", token, {
    path: "/",
    httpOnly: false, // must be readable by client store too
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  res.cookies.set("osiris_role", safeUser.role, {
    path: "/",
    httpOnly: false,
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });

  return res;
}
