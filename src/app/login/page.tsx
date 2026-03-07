"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore, decodeJwtToUser } from "@/stores/auth";

function LoginRedirectContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const login = useAuthStore((state) => state.login);

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            try {
                // Decode token to get user role and details
                const user = decodeJwtToUser(token);

                // Update local auth state with user and token
                login(user, token);

                // Redirect based on role and onboarded status
                if (user.role === "brand") {
                    router.push(user.onboarded ? "/app/brand" : "/onboarding/brand");
                } else {
                    router.push(user.onboarded ? "/app/creator" : "/onboarding/creator");
                }
            } catch (e) {
                console.error("Failed to parse token data", e);
                router.push("/auth/login?error=parse_failed");
            }
        } else {
            // If missing token, redirect back to standard auth login
            router.push("/auth/login");
        }
    }, [searchParams, login, router]);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center text-black">
            <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin mb-4" />
            <h1 className="text-xl font-medium">Finishing authentication...</h1>
            <p className="text-gray-500 mt-2">Please wait while we log you in.</p>
        </div>
    );
}

export default function LoginRedirectPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <LoginRedirectContent />
        </Suspense>
    );
}
