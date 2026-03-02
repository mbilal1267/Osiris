"use client";
import { useAuthStore } from "@/stores/auth";
import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";
import { getInitials } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  "/app/creator": "Dashboard",
  "/app/creator/profile": "My Profile",
  "/app/creator/insights": "Insights & Analytics",
  "/app/creator/deals": "Deals Pipeline",
  "/app/brand": "Dashboard",
  "/app/brand/creators": "Discover Creators",
  "/app/brand/campaigns": "Campaigns",
  "/app/brand/profile": "Brand Profile",
};

interface AppHeaderProps {
  onMenuClick: () => void;
}

export default function AppHeader({ onMenuClick }: AppHeaderProps) {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] ?? "Dashboard";

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white border-b border-gray-100 shrink-0 z-10">
      {/* Left: hamburger + page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{pageTitle}</h1>
      </div>

      {/* Right: notifications + user info */}
      <div className="flex items-center gap-2">
        <button
          className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand rounded-full" />
        </button>

        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white text-xs font-bold shrink-0">
            {user ? getInitials(user.name) : "?"}
          </div>
          <div className="hidden sm:block leading-none">
            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-400 mt-0.5 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
