"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth";

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const login = useAuthStore((state) => state.login);

    useEffect(() => {
        const userParam = searchParams.get("user");
        const token = searchParams.get("token");

        if (userParam && token) {
            try {
                const user = JSON.parse(decodeURIComponent(userParam));

                // Update local state - pass both user and token
                login(user, token);

                // Redirect based on role and onboarded status
                if (user.role === "brand") {
                    router.push(user.onboarded ? "/app/brand" : "/onboarding/brand");
                } else {
                    router.push(user.onboarded ? "/app/creator" : "/onboarding/creator");
                }
            } catch (e) {
                console.error("Failed to parse user data", e);
                router.push("/auth/login?error=parse_failed");
            }
        } else {
            // If missing params, redirect back to login
            // router.push("/auth/login?error=missing_params");
        }
    }, [searchParams, login, router]);

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
            <div className="w-8 h-8 border-2 border-[#D0FD3E] border-t-transparent rounded-full animate-spin mb-4" />
            <h1 className="text-xl font-medium">Finishing authentication...</h1>
            <p className="text-gray-400 mt-2">Please wait while we log you in.</p>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
            <CallbackContent />
        </Suspense>
    );
}
