"use client";
import Link from "next/link";
import { Linkedin, Twitter, Instagram, Youtube } from "lucide-react";
import { useState } from "react";

export default function FooterMega() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-1 animate-fade-in-up">
            <h3 className="font-display text-2xl font-bold mb-4">Osiris</h3>
            <Link href="/auth" className="inline-flex items-center gap-2 bg-brand rounded-xl px-5 py-3 text-sm font-medium hover:bg-brand-light transition-smooth shadow-md hover:shadow-lg hover-lift">
              See how it works <span className="text-lg transition-smooth group-hover:translate-x-1">↗</span>
            </Link>
            <p className="text-gray-500 text-xs mt-6">© Osiris Inc. 2026. All rights reserved.</p>
          </div>
          <div className="animate-fade-in-up" style={{animationDelay: "0.1s"}}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/auth" className="hover:text-white transition-smooth hover:translate-x-1 inline-block">Platform Login</Link></li>
              <li><Link href="/creators" className="hover:text-white transition-smooth hover:translate-x-1 inline-block">For Creators</Link></li>
              <li><Link href="/brands" className="hover:text-white transition-smooth hover:translate-x-1 inline-block">For Brands</Link></li>
              <li><Link href="/auth" className="hover:text-white transition-smooth hover:translate-x-1 inline-block">Sign Up</Link></li>
            </ul>
          </div>
          <div className="animate-fade-in-up" style={{animationDelay: "0.2s"}}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><span className="hover:text-white transition-smooth cursor-default">Community</span></li>
              <li><span className="hover:text-white transition-smooth cursor-default">Careers</span></li>
              <li><span className="hover:text-white transition-smooth cursor-default">Help Center</span></li>
            </ul>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 mt-6">Follow Us</h4>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Youtube, Instagram].map((Icon, i) => (
                <div key={i} className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-smooth hover:scale-110 hover:bg-gray-700/50 cursor-pointer">
                  <Icon className="w-4 h-4 text-gray-400 transition-smooth group-hover:text-white" />
                </div>
              ))}
            </div>
          </div>
          <div className="animate-fade-in-up" style={{animationDelay: "0.3s"}}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Legal & Policies</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><span className="cursor-default hover:text-white transition-smooth">Trust Center</span></li>
              <li><span className="cursor-default hover:text-white transition-smooth">Terms of Service</span></li>
              <li><span className="cursor-default hover:text-white transition-smooth">Privacy Policies</span></li>
              <li><span className="cursor-default hover:text-white transition-smooth">Cookie Notice</span></li>
              <li><span className="cursor-default hover:text-white transition-smooth">Creator Terms of Service</span></li>
            </ul>
          </div>
          <div className="animate-fade-in-up" style={{animationDelay: "0.4s"}}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Subscribe to our newsletter</h4>
            {subscribed ? (
              <p className="text-sm text-green-400 animate-fade-in-up">Thanks for subscribing!</p>
            ) : (
              <div className="flex rounded-lg overflow-hidden border border-gray-600 transition-smooth hover:border-accent focus-within:border-accent">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email*" className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-smooth" />
                <button onClick={() => { if (email) setSubscribed(true); }} className="bg-accent text-gray-900 font-bold text-sm px-5 py-2.5 hover:bg-accent-dark transition-smooth hover:shadow-lg active:scale-95">
                  Submit
                </button>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-3">Get emails from Osiris about product updates, industry news, and events. You can unsubscribe at any time.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
