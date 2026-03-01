import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state"); // This contains the 'role'
    const error = searchParams.get("error");

    if (error) {
        return NextResponse.json({ error: `Google Auth Error: ${error}` }, { status: 400 });
    }

    if (!code) {
        return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`;

    if (!clientId || !clientSecret) {
        return NextResponse.json({ error: "Google credentials missing" }, { status: 500 });
    }

    try {
        // 1. Exchange code for access token
        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                code,
                grant_type: "authorization_code",
                redirect_uri: redirectUri,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            console.error("Token exchange failed:", tokenData);
            return NextResponse.json({ error: "Failed to exchange token", details: tokenData }, { status: 500 });
        }

        const accessToken = tokenData.access_token;

        // 2. Fetch user profile
        const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const userData = await userResponse.json();

        if (!userResponse.ok) {
            console.error("User profile fetch failed:", userData);
            return NextResponse.json({ error: "Failed to fetch user profile", details: userData }, { status: 500 });
        }

        // 3. "Upsert" user Logic (Mock for now, normally save to DB)
        // We will just pass the user data to the frontend to handle the state update

        // Construct a safe user object to pass back
        // Must match User interface in src/stores/auth.ts
        const safeUser = {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            picture: userData.picture, // Not in interface but harmless
            role: state || "creator",
            onboarded: false, // Default for new users
        };

        // 4. Redirect to frontend with data
        // We'll encode the user data in the URL checks
        const userString = encodeURIComponent(JSON.stringify(safeUser));
        const finalRedirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?user=${userString}&token=${accessToken}`;

        return NextResponse.redirect(finalRedirectUrl);

    } catch (err: any) {
        console.error("Auth Callback Error:", err);
        return NextResponse.json({ error: "Internal Server Error", details: err.message }, { status: 500 });
    }
}
