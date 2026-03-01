"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import { Eye, EyeOff } from "lucide-react";
import { Toast } from "@/components/UIComponents";
import GoogleButton from "@/components/GoogleButton";

function SignupForm() {
  const params = useSearchParams();
  const role = params.get("role") || "creator";
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 10) { setError("Password must be at least 10 characters long."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role, name: email.split("@")[0] }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Signup failed"); setLoading(false); return; }
      login(data.user, data.token);
      router.push(role === "creator" ? "/onboarding/creator" : "/onboarding/brand");
    } catch { setError("Something went wrong."); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-brand to-pink-500 rounded-2xl"></div>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-center mb-1">Sign up as a {role === "creator" ? "Creator" : "Brand"}</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@domain.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="10 characters minimum" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand pr-12" required />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Your password must be minimum 10 characters long.</p>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-black text-white font-semibold py-3.5 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50">
            {loading ? "Creating account..." : "Continue"}
          </button>
          <p className="text-center text-sm text-gray-500">Already have an account? <Link href={`/auth/login?role=${role}`} className="underline font-medium text-black">Sign in</Link></p>
          <div className="flex items-center gap-4 my-2"><div className="flex-1 h-px bg-gray-200" /><span className="text-xs text-gray-400">or</span><div className="flex-1 h-px bg-gray-200" /></div>
          <GoogleButton text="Sign up with Google" />
          <button type="button" onClick={() => setToast("Apple signup coming soon")} className="w-full border border-gray-200 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-50">🍎 Sign up with Apple</button>
          <p className="text-xs text-gray-400 text-center">By signing up, you agree to the <span className="underline">Terms &amp; Conditions</span> and <span className="underline">Privacy Policy</span>.</p>
        </form>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
      <div className="hidden lg:block bg-gradient-to-br from-brand via-neon-purple to-accent relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-80 h-96 rounded-[3rem] transform rotate-3 shadow-lg animate-float relative overflow-hidden bg-gradient-to-br from-neon-pink to-neon-purple p-1">
            <div className="w-full h-full rounded-[2.8rem] overflow-hidden relative">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/fitness_1.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default function SignupPage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}><SignupForm /></Suspense>;
}
