"use client";
import { cn, getInitials } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";
import {
  BarChart3,
  Handshake,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Search,
  User,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const creatorNav = [
  { href: "/app/creator", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/creator/profile", label: "Profile", icon: User },
  { href: "/app/creator/insights", label: "Insights", icon: BarChart3 },
  { href: "/app/creator/deals", label: "Deals", icon: Handshake },
];

const brandNav = [
  { href: "/app/brand", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/brand/creators", label: "Discover", icon: Search },
  { href: "/app/brand/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/app/brand/profile", label: "Profile", icon: User },
];

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AppSidebar({ open, onClose }: AppSidebarProps) {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const nav = user?.role === "creator" ? creatorNav : brandNav;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside
      className={cn(
        "fixed lg:static inset-y-0 left-0 z-30 w-64 flex flex-col bg-white border-r border-gray-100 shrink-0 transition-transform duration-300 ease-in-out",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100 shrink-0">
        <Link
          href={user?.role === "creator" ? "/app/creator" : "/app/brand"}
          className="font-display text-2xl font-bold tracking-tight text-gray-900 hover:text-brand transition-colors"
          onClick={onClose}
        >
          Osiris
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Role badge */}
      <div className="px-4 pt-4 shrink-0">
        <div className="flex items-center gap-2 px-3 py-2 bg-brand/5 rounded-xl">
          <Zap className="w-3.5 h-3.5 text-brand" />
          <span className="text-xs font-semibold text-brand capitalize">
            {user?.role} workspace
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-brand text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "w-4 h-4 shrink-0",
                  isActive ? "text-white" : "text-gray-400"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="px-4 py-4 border-t border-gray-100 shrink-0">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white text-xs font-bold shrink-0">
            {user ? getInitials(user.name) : "?"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 mt-1 rounded-xl text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors font-medium"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
