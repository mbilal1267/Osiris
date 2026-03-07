"use client";
import { useAuthStore } from "@/stores/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (!user) {
      router.push("/auth?tab=login&reason=layout_no_user");
      return;
    }
    if (user.role === "creator" && pathname.startsWith("/app/brand")) {
      router.push("/app/creator");
      return;
    }
    if (user.role === "brand" && pathname.startsWith("/app/creator")) {
      router.push("/app/brand");
      return;
    }
    setReady(true);
  }, [user, pathname, router, hydrated]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AppHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
