import { NextRequest, NextResponse } from "next/server";
import { mockUsers } from "@/data/seed";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, role, name } = body;

  if (!email || !password || !role) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const exists = mockUsers.find((u) => u.email === email);
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const newUser = {
    id: "u" + Date.now(),
    email,
    role,
    name: name || email.split("@")[0],
    handle: role === "creator" ? email.split("@")[0].toLowerCase() : undefined,
    brandSlug: role === "brand" ? email.split("@")[0].toLowerCase() : undefined,
    onboarded: false,
  };

  mockUsers.push({ ...newUser, password });

  const token = "mock_token_" + Date.now();

  const res = NextResponse.json({ user: newUser, token }, { status: 201 });

  // Set cookies for server-side middleware
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
}
