import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get("role") || "creator"; // Default to creator if not specified

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`;
    const scope = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

    // We use the 'state' parameter to persist the role (creator/brand) across the redirect
    const state = role;

    if (!clientId) {
        return NextResponse.json({ error: "Google Client ID is missing in environment variables" }, { status: 500 });
    }

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;

    return NextResponse.redirect(url);
}
