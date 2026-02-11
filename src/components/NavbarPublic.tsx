"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function NavbarPublic() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm transition-all hover:shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-display text-2xl font-bold tracking-tight hover:text-brand transition-colors">
            Osiris
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/brands" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-smooth flex items-center gap-1 group">
              Brands <ChevronDown className="w-3 h-3 transition-smooth group-hover:rotate-180" />
            </Link>
            <Link href="/creators" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-smooth">
              Creators
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth" className="text-sm font-medium px-5 py-2.5 rounded-full border border-gray-300 hover:bg-gray-50 transition-smooth hover:border-brand/30">
              Log in
            </Link>
            <Link href="/auth" className="text-sm font-medium px-5 py-2.5 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-smooth shadow-md hover:shadow-lg hover-lift">
              Get started
            </Link>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 transition-smooth hover:bg-gray-100 rounded-lg">
            {open ? <X className="w-5 h-5 transition-transform" /> : <Menu className="w-5 h-5 transition-transform" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3 animate-slide-in-down">
          <Link href="/brands" className="block text-sm font-medium py-2 hover:text-brand transition-colors">Brands</Link>
          <Link href="/creators" className="block text-sm font-medium py-2 hover:text-brand transition-colors">Creators</Link>
          <Link href="/auth" className="block text-sm font-medium py-2 hover:text-brand transition-colors">Log in</Link>
          <Link href="/auth" className="block text-sm font-medium py-2 px-4 bg-gray-900 text-white rounded-full text-center hover:bg-gray-800 transition-smooth">Get started</Link>
        </div>
      )}
    </nav>
  );
}
