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
          <div className="lg:col-span-1">
            <h3 className="font-display text-2xl font-bold mb-4">Osiris</h3>
            <Link href="/auth" className="inline-flex items-center gap-2 bg-brand rounded-xl px-5 py-3 text-sm font-medium hover:bg-brand-light transition-colors">
              See how it works <span className="text-lg">↗</span>
            </Link>
            <p className="text-gray-400 text-xs mt-6">© Osiris Inc. 2026. All rights reserved.</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/auth" className="hover:text-white transition-colors">Platform Login</Link></li>
              <li><Link href="/creators" className="hover:text-white transition-colors">For Creators</Link></li>
              <li><Link href="/brands" className="hover:text-white transition-colors">For Brands</Link></li>
              <li><Link href="/auth" className="hover:text-white transition-colors">Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><span className="hover:text-white transition-colors cursor-default">Community</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Careers</span></li>
              <li><span className="hover:text-white transition-colors cursor-default">Help Center</span></li>
            </ul>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 mt-6">Follow Us</h4>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Youtube, Instagram].map((Icon, i) => (
                <div key={i} className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:border-white transition-colors cursor-pointer">
                  <Icon className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Legal & Policies</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><span className="cursor-default">Trust Center</span></li>
              <li><span className="cursor-default">Terms of Service</span></li>
              <li><span className="cursor-default">Privacy Policies</span></li>
              <li><span className="cursor-default">Cookie Notice</span></li>
              <li><span className="cursor-default">Creator Terms of Service</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Subscribe to our newsletter</h4>
            {subscribed ? (
              <p className="text-sm text-green-400">Thanks for subscribing!</p>
            ) : (
              <div className="flex">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email*" className="flex-1 bg-transparent border border-gray-600 rounded-l-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent" />
                <button onClick={() => { if (email) setSubscribed(true); }} className="bg-accent text-black font-bold text-sm px-5 py-2.5 rounded-r-lg hover:bg-accent-dark transition-colors">
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
