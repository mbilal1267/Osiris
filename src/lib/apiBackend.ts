import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface FetchOptions extends RequestInit {
    rawBody?: boolean;
}

export async function fetchBackend(path: string, options: FetchOptions = {}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("osiris_token")?.value;

    const headers = new Headers(options.headers || {});

    if (token && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    if (!options.rawBody && !headers.has("Content-Type") && options.body) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(`${BACKEND_URL}${path}`, {
        ...options,
        headers,
    });

    return response;
}
