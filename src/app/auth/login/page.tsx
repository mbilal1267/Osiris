"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import { Eye, EyeOff } from "lucide-react";
import { Toast } from "@/components/UIComponents";
import GoogleButton from "@/components/GoogleButton";

function LoginForm() {
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
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Invalid credentials"); setLoading(false); return; }
      login(data.user, data.token);
      router.push(data.user.role === "creator" ? "/app/creator" : "/app/brand");
    } catch { setError("Something went wrong. Please try again."); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
        <Link href="/" className="font-display text-2xl font-bold mb-12">Osiris</Link>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Log in to your account</h1>
        <p className="text-gray-500 mb-8">Welcome back! Enter your credentials to continue as a {role}.</p>
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="10 characters minimum" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand pr-12" required />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-black text-white font-semibold py-3.5 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50">
            {loading ? "Signing in..." : "Continue"}
          </button>
          <div className="flex items-center gap-4 my-4"><div className="flex-1 h-px bg-gray-200" /><span className="text-xs text-gray-400">or</span><div className="flex-1 h-px bg-gray-200" /></div>
          <GoogleButton text="Sign in with Google" />
          <button type="button" onClick={() => setToast("Apple login coming soon")} className="w-full border border-gray-200 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-50">
            <span>🍎</span> Sign in with Apple
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-6">Don&apos;t have an account yet? <Link href={`/auth/signup?role=${role}`} className="underline font-medium text-black">Sign up here</Link></p>
        <p className="text-sm text-gray-500 mt-2">Demo credentials: <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">creator@test.com</code> / <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">brand@test.com</code> — password: <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">password123</code></p>
      </div>
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
                <source src="/videos/tech_1.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}

export default function LoginPage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}><LoginForm /></Suspense>;
}
