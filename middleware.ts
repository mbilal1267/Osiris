import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("osiris_token")?.value;
  const role = req.cookies.get("osiris_role")?.value;

  const isAppRoute = pathname.startsWith("/app");
  const isAuthRoute = pathname === "/auth" || pathname.startsWith("/auth/");

  // Protect all /app/* routes — redirect to auth if no token
  if (isAppRoute && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.set("tab", "login");
    url.searchParams.set("reason", "middleware_no_token");
    return NextResponse.redirect(url);
  }

  // Role-based guarding within /app/*
  if (isAppRoute && token) {
    if (role === "creator" && pathname.startsWith("/app/brand")) {
      return NextResponse.redirect(new URL("/app/creator", req.url));
    }
    if (role === "brand" && pathname.startsWith("/app/creator")) {
      return NextResponse.redirect(new URL("/app/brand", req.url));
    }
  }

  // Redirect already-authenticated users away from /auth
  if (isAuthRoute && token) {
    const dest = role === "brand" ? "/app/brand" : "/app/creator";
    return NextResponse.redirect(new URL(dest, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/auth", "/auth/:path*"],
};
