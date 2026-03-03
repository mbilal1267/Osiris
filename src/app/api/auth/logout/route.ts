import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("osiris_token", "", { path: "/", maxAge: 0 });
  res.cookies.set("osiris_role", "", { path: "/", maxAge: 0 });
  return res;
}
