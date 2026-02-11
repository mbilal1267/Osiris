"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function NavbarPublic() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-display text-2xl font-bold tracking-tight">
            Osiris
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/brands" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-1">
              Brands <ChevronDown className="w-3 h-3" />
            </Link>
            <Link href="/creators" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              Creators
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth" className="text-sm font-medium px-5 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
              Log in
            </Link>
            <Link href="/auth" className="text-sm font-medium px-5 py-2.5 rounded-full bg-surface-dark text-white hover:bg-gray-800 transition-colors">
              Get started
            </Link>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <Link href="/brands" className="block text-sm font-medium py-2">Brands</Link>
          <Link href="/creators" className="block text-sm font-medium py-2">Creators</Link>
          <Link href="/auth" className="block text-sm font-medium py-2">Log in</Link>
          <Link href="/auth" className="block text-sm font-medium py-2 px-4 bg-surface-dark text-white rounded-full text-center">Get started</Link>
        </div>
      )}
    </nav>
  );
}
