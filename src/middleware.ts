import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("osiris_token")?.value;
  const role = req.cookies.get("osiris_role")?.value?.toLowerCase();

  const isAppRoute = pathname.startsWith("/app");
  const isAuthRoute = pathname === "/auth" || pathname.startsWith("/auth/");
  const isOnboardingRoute = pathname.startsWith("/onboarding");

  // Protect all /app/* AND /onboarding/* routes — redirect to auth if no token
  if ((isAppRoute || isOnboardingRoute) && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.set("tab", "login");
    url.searchParams.set("reason", "middleware_no_token");
    return NextResponse.redirect(url);
  }

  // If going to auth without a token, just let them in to login/signup
  if (isAuthRoute && !token) {
    return NextResponse.next();
  }

  if ((isAppRoute || isOnboardingRoute) && token) {
    // Role-based guarding within /app/* and /onboarding/*
    if (role === "creator" && (pathname.startsWith("/app/brand") || pathname.startsWith("/onboarding/brand"))) {
      return NextResponse.redirect(new URL(isAppRoute ? "/app/creator" : "/onboarding/creator", req.url));
    }
    if (role === "brand" && (pathname.startsWith("/app/creator") || pathname.startsWith("/onboarding/creator"))) {
      return NextResponse.redirect(new URL(isAppRoute ? "/app/brand" : "/onboarding/brand", req.url));
    }

    // Checking Onboarding Status
    const onboardingStatus = req.cookies.get("osiris_onboarding")?.value;

    if (onboardingStatus !== "completed") {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
        const endpoint = role === "brand"
          ? `${backendUrl}/brand/onboarding/me`
          : `${backendUrl}/creator/onboarding/me`;


        const res = await fetch(endpoint, {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          cache: "no-store",
        });

        let isCompleted = false;

        if (res.ok) {
          const data = await res.json();
          isCompleted = data.completed === true;
        }

        if (!isCompleted) {
          // Not completed or profile not found, redirect to onboarding if trying to access /app
          if (isAppRoute) {
            const dest = role === "brand" ? "/onboarding/brand" : "/onboarding/creator";
            console.log(`[Middleware] Redirecting to ${dest}`);
            const response = NextResponse.redirect(new URL(dest, req.url));
            // Just in case they had the cookie somehow, delete it
            response.cookies.delete("osiris_onboarding");
            return response;
          }
        } else {
          // Completed, set cookie to avoid fetching every time
          const response = isAppRoute ? NextResponse.next() : NextResponse.redirect(new URL(role === "brand" ? "/app/brand" : "/app/creator", req.url));
          response.cookies.set("osiris_onboarding", "completed", { maxAge: 60 * 60 * 24 * 7, path: "/" });
          return response;
        }
      } catch (error) {
        console.error("[Middleware] Error checking onboarding status:", error);
        // Fail closed on error: Redirect to onboarding to be safe
        if (isAppRoute) {
          const dest = role === "brand" ? "/onboarding/brand" : "/onboarding/creator";
          return NextResponse.redirect(new URL(dest, req.url));
        }
      }
    } else {
      // If cookie says completed but trying to access onboarding, redirect to app
      if (isOnboardingRoute) {
        return NextResponse.redirect(new URL(role === "brand" ? "/app/brand" : "/app/creator", req.url));
      }
    }
  }

  // Redirect already-authenticated users away from /auth
  if (isAuthRoute && token) {
    const onboardingStatus = req.cookies.get("osiris_onboarding")?.value;
    // We don't check via API here to save a network call on login route; 
    // we just default to /app and the /app check will handle the rest if needed.
    const dest = role === "brand" ? "/app/brand" : "/app/creator";
    return NextResponse.redirect(new URL(dest, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/auth", "/auth/:path*", "/onboarding/:path*"],
};
