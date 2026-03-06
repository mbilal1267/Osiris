import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
        return NextResponse.json({ error: "Backend URL missing" }, { status: 500 });
    }

    // According to docs: 1.3 Google Login -> Endpoint: GET /oauth2/authorization/google
    // redirect to the actual backend oauth endpoint
    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get("role") || "creator";
    const url = `${backendUrl}/oauth2/authorization/google?role=${role.toUpperCase()}`;
    return NextResponse.redirect(url);
}
