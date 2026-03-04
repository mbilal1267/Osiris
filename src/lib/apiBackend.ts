import { cookies } from "next/headers";
import axios, { AxiosRequestConfig } from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface FetchOptions extends AxiosRequestConfig {
    rawBody?: boolean;
}

export async function fetchBackend(path: string, options: FetchOptions = {}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("osiris_token")?.value;

    const headers: Record<string, string> = (options.headers as Record<string, string>) || {};

    if (token && !headers["Authorization"]) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    if (!options.rawBody && !headers["Content-Type"] && options.data) {
        headers["Content-Type"] = "application/json";
    }

    const { rawBody, ...axiosOptions } = options;

    const response = await axios({
        url: `${BACKEND_URL}${path}`,
        ...axiosOptions,
        headers,
    });

    return response;
}
