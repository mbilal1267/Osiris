import { NextRequest, NextResponse } from "next/server";
import { mockUsers } from "@/data/seed";

export async function GET(req: NextRequest) {
  // Read token from cookie (set by middleware-compatible auth flow)
  const token = req.cookies.get("osiris_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // In the mock setup there's no real JWT decode; we infer user from request cookie
  const role = req.cookies.get("osiris_role")?.value;

  // Find first user matching the role as a best-effort mock
  const user = mockUsers.find((u) => u.role === role) ?? mockUsers[0];
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { password: _, ...safeUser } = user;
  return NextResponse.json(safeUser);
}
