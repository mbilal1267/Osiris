"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowRight, Star, AlertCircle, CheckCircle } from "lucide-react";

function AuthContent() {
  const params = useSearchParams();
  const router = useRouter();
  const tab = params.get("tab") || "signup";
  const role = params.get("role");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const validatePassword = (pwd: string) => {
    const errors: string[] = [];
    if (pwd.length < 10) errors.push("At least 10 characters");
    if (!/[a-z]/.test(pwd)) errors.push("One lowercase letter");
    if (!/[A-Z]/.test(pwd)) errors.push("One uppercase letter");
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) errors.push("One symbol (!@#$%...)");
    setPasswordErrors(errors);
    return errors.length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password does not meet requirements");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role,
          name: name || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      // Redirect to onboarding based on role
      const onboardingPath = role === "creator" ? "/onboarding/creator" : "/onboarding/brand";
      router.push(onboardingPath);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Redirect to appropriate dashboard
      const dashPath = role === "creator" ? "/app/creator" : "/app/brand";
      router.push(dashPath);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show role/type chooser if no role selected
  if (!role) {
    return (
      <div className="min-h-screen grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
          <Link href="/" className="font-display text-2xl font-bold mb-12 animate-fade-in-down">Osiris</Link>
          {tab === "login" ? (
            <>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2 animate-fade-in-down" style={{animationDelay: "0.1s"}}>Welcome back</h1>
              <p className="text-gray-500 mb-8 animate-fade-in-down" style={{animationDelay: "0.2s"}}>Log in to continue managing your campaigns and collaborations.</p>
              <div className="space-y-4 max-w-md">
                <Link href="/auth?tab=login&role=creator" className="flex items-center justify-between bg-surface hover:shadow-card-hover transition-all rounded-3xl p-6 border border-gray-200 hover:border-brand/30 hover-lift animate-fade-in-up">
                  <div><h3 className="font-bold text-lg">Creator</h3><p className="text-sm text-gray-600">Access your deals &amp; insights</p></div>
                  <ArrowRight className="w-5 h-5 text-brand transition-smooth group-hover:translate-x-1" />
                </Link>
                <Link href="/auth?tab=login&role=brand" className="flex items-center justify-between bg-surface hover:shadow-card-hover transition-all rounded-3xl p-6 border border-gray-200 hover:border-brand/30 hover-lift animate-fade-in-up" style={{animationDelay: "0.1s"}}>
                  <div><h3 className="font-bold text-lg">Brand</h3><p className="text-sm text-gray-600">Manage campaigns &amp; creators</p></div>
                  <ArrowRight className="w-5 h-5 text-brand transition-smooth group-hover:translate-x-1" />
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-8 animate-fade-in-down" style={{animationDelay: "0.4s"}}>Don&apos;t have an account? <Link href="/auth?tab=signup" className="underline font-medium text-black hover:text-brand transition-colors">Sign up</Link></p>
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2 animate-fade-in-down" style={{animationDelay: "0.1s"}}>Join Osiris</h1>
              <div className="flex items-center gap-2 mb-8 animate-fade-in-down" style={{animationDelay: "0.2s"}}>
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-red-500 text-red-500 transition-smooth hover:scale-125" style={{animationDelay: `${i * 0.05}s`}} />)}
                <span className="text-xs font-bold text-red-600 uppercase tracking-wide">&ldquo;Best customer support&rdquo;</span>
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-lg">
                <Link href="/auth?tab=signup&role=brand" className="bg-surface hover:shadow-card-hover transition-all rounded-3xl p-6 col-span-1 row-span-2 flex flex-col justify-end border border-gray-200 hover:border-brand/30 hover-lift animate-fade-in-up">
                  <h3 className="font-bold text-lg">Brand or Agency</h3>
                  <p className="text-sm text-gray-600">Match with creators</p>
                  <ArrowRight className="w-5 h-5 text-brand mt-2 transition-smooth group-hover:translate-x-1" />
                </Link>
                <Link href="/auth?tab=signup&role=creator" className="bg-surface hover:shadow-card-hover transition-all rounded-3xl p-6 flex flex-col justify-between border border-gray-200 hover:border-brand/30 hover-lift animate-fade-in-up" style={{animationDelay: "0.1s"}}>
                  <div>
                    <h3 className="font-bold text-lg">Creator</h3>
                    <p className="text-sm text-gray-600">Match with brands</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-brand mt-2 transition-smooth group-hover:translate-x-1" />
                </Link>
                <div className="bg-gray-50 rounded-3xl p-6 flex flex-col justify-between opacity-60 border border-gray-200 transition-smooth hover:opacity-100 animate-fade-in-up" style={{animationDelay: "0.2s"}}>
                  <div>
                    <h3 className="font-bold text-lg">Talent Agency</h3>
                    <p className="text-sm text-gray-500">Coming soon</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 mt-2" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-8 animate-fade-in-down" style={{animationDelay: "0.4s"}}>Already have an account? <Link href="/auth?tab=login" className="underline font-medium text-black hover:text-brand transition-colors">Log In</Link></p>
            </>
          )}
        </div>
        <div className="hidden lg:block bg-gradient-to-br from-brand via-neon-purple to-accent relative overflow-hidden animate-fade-in-right">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-96 bg-gradient-to-br from-neon-pink to-neon-purple rounded-[3rem] transform rotate-3 shadow-lg animate-float"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show login/signup forms with role selected
  const isCreator = role === "creator";
  const isLogin = tab === "login";
  const roleLabel = isCreator ? "Creator" : "Brand";

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
        <Link href="/" className="font-display text-2xl font-bold mb-12 animate-fade-in-down">Osiris</Link>

        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2 animate-fade-in-down" style={{animationDelay: "0.1s"}}>
          {isLogin ? "Welcome back" : `Join as ${roleLabel}`}
        </h1>
        <p className="text-gray-600 mb-8 animate-fade-in-down" style={{animationDelay: "0.2s"}}>
          {isLogin
            ? "Log in to continue managing your account and collaborations."
            : `Create your ${roleLabel.toLowerCase()} account to get started.`}
        </p>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 animate-fade-in-up">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={isLogin ? handleLogin : handleSignup} className="max-w-md space-y-4 animate-fade-in-up" style={{animationDelay: "0.3s"}}>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all"
              required
            />
            <p className="text-xs text-gray-500 mt-1">RFC 5322 format, max 254 characters</p>
          </div>

          {/* Name Field (Signup only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name <span className="text-gray-400 font-normal">(optional)</span></label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                maxLength={100}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">Defaults to email prefix if not provided, max 100 characters</p>
            </div>
          )}

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (!isLogin) validatePassword(e.target.value);
              }}
              placeholder="••••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all"
              required
            />

            {/* Password Requirements (Signup) */}
            {!isLogin && (
              <div className="mt-3 space-y-2">
                {["At least 10 characters", "One uppercase letter", "One lowercase letter", "One symbol (!@#$%...)"].map((req) => {
                  const isMet = !passwordErrors.includes(req);
                  return (
                    <div key={req} className="flex items-center gap-2 text-xs">
                      {isMet ? (
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0" />
                      )}
                      <span className={isMet ? "text-gray-600" : "text-gray-400"}>{req}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand text-white font-semibold py-3 rounded-xl hover:bg-brand-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? "Processing..." : isLogin ? "Log In" : "Create Account"}
          </button>
        </form>

        {/* Toggle Tab Link */}
        <p className="text-sm text-gray-600 mt-6 text-center animate-fade-in-up" style={{animationDelay: "0.4s"}}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link
            href={`/auth?tab=${isLogin ? "signup" : "login"}&role=${role}`}
            className="font-semibold text-brand hover:text-brand-dark transition-colors"
          >
            {isLogin ? "Sign up" : "Log in"}
          </Link>
        </p>

        {/* Back to Role Selection */}
        <button
          onClick={() => router.push("/auth")}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors mt-4 text-center w-full"
        >
          ← Back to account type selection
        </button>
      </div>

      <div className="hidden lg:block bg-gradient-to-br from-brand via-neon-purple to-accent relative overflow-hidden animate-fade-in-right">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-80 h-96 bg-gradient-to-br from-neon-pink to-neon-purple rounded-[3rem] transform rotate-3 shadow-lg animate-float"></div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
