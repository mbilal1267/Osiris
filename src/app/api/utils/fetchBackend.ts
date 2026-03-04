import { NextRequest, NextResponse } from "next/server";

import axios, { AxiosError } from "axios";

export async function fetchBackend(req: NextRequest, endpointPath: string, method: string = "GET") {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const token = req.cookies.get("osiris_token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const headers: Record<string, string> = {
        "Authorization": `Bearer ${token}`,
    };

    let data = undefined;
    if (method !== "GET" && method !== "HEAD") {
        headers["Content-Type"] = "application/json";
        try {
            data = await req.json();
        } catch (e) {
            // Ignored if no body is present
        }
    }

    try {
        const response = await axios({
            url: `${backendUrl}${endpointPath}`,
            method,
            headers,
            data,
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error(`Error forwarding to backend ${endpointPath}:`, error);

        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            const status = axiosError.response?.status || 500;
            const errorData = axiosError.response?.data || { error: "Backend error" };
            return NextResponse.json(errorData, { status });
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
