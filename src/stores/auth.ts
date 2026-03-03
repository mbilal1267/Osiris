import { create } from "zustand";

export type Role = "creator" | "brand";

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
  handle?: string;
  brandSlug?: string;
  onboarded: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

// ─── Cookie helpers (client-side, readable by middleware) ──────────────────
function setCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 86_400_000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
// ──────────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>((set) => {
  let initialUser: User | null = null;
  let initialToken: string | null = null;
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("osiris_user");
      const storedToken = localStorage.getItem("osiris_token");
      if (stored && storedToken) {
        initialUser = JSON.parse(stored);
        initialToken = storedToken;
        // Ensure cookies are also set (covers sessions restored from localStorage)
        setCookie("osiris_token", storedToken);
        setCookie("osiris_role", initialUser!.role);
      }
    } catch {}
  }
  return {
    user: initialUser,
    token: initialToken,
    login: (user, token) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("osiris_user", JSON.stringify(user));
        localStorage.setItem("osiris_token", token);
      }
      // Set cookies for middleware
      setCookie("osiris_token", token);
      setCookie("osiris_role", user.role);
      set({ user, token });
    },
    logout: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("osiris_user");
        localStorage.removeItem("osiris_token");
      }
      // Clear cookies
      deleteCookie("osiris_token");
      deleteCookie("osiris_role");
      set({ user: null, token: null });
    },
    setUser: (user) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("osiris_user", JSON.stringify(user));
      }
      set({ user });
    },
  };
});

interface OnboardingState {
  step: number;
  data: Record<string, unknown>;
  setStep: (s: number) => void;
  setData: (d: Record<string, unknown>) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 0,
  data: {},
  setStep: (step) => set({ step }),
  setData: (data) => set((s) => ({ data: { ...s.data, ...data } })),
  reset: () => set({ step: 0, data: {} }),
}));
