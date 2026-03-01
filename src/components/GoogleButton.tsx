"use client";

"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function GoogleButton({
    text = "Sign in with Google",
    onClick
}: {
    text?: string;
    onClick?: () => void;
}) {
    const searchParams = useSearchParams();
    const role = searchParams.get("role") || "creator";
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = () => {
        if (onClick) {
            onClick();
            return;
        }

        setIsLoading(true);
        // Redirect to our Next.js API route that handles the OAuth flow
        window.location.href = `/api/auth/google?role=${role}`;
    };

    return (
        <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 hover:bg-gray-50 font-medium py-3 px-4 rounded-xl border border-gray-200 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
            ) : (
                <Image
                    src="/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                />
            )}
            <span>{text}</span>
        </button>
    );
}
