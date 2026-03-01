"use client";
import { useState } from 'react';
import { Facebook, Twitter, Instagram, Globe, ChevronDown } from 'lucide-react';

const platforms = [
  { id: 'facebook', name: 'Facebook', icon: Facebook },
  { id: 'twitter', name: 'Twitter', icon: Twitter },
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  { id: 'web', name: 'Web', icon: Globe },
];

export function PlatformSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const selectedPlatform = platforms.find(p => p.id === selected);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-[#E2E8F0] rounded-lg px-4 py-3 flex items-center justify-between hover:border-[#2563EB] transition-colors"
      >
        <div className="flex items-center gap-2">
          {selectedPlatform ? (
            <>
              <selectedPlatform.icon className="w-5 h-5 text-slate-600" />
              <span className="text-slate-900">{selectedPlatform.name}</span>
            </>
          ) : (
            <>
              <span className="text-slate-600">Select platform (e.g., </span>
              <div className="flex items-center gap-1">
                <Facebook className="w-4 h-4 text-slate-400" />
                <Twitter className="w-4 h-4 text-slate-400" />
                <Instagram className="w-4 h-4 text-slate-400" />
                <Globe className="w-4 h-4 text-slate-400" />
              </div>
              <span className="text-slate-600">)</span>
            </>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E2E8F0] rounded-lg shadow-lg overflow-hidden z-10">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <button
                key={platform.id}
                onClick={() => {
                  setSelected(platform.id);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#2563EB] hover:text-white transition-colors text-left group"
              >
                <Icon className="w-5 h-5 text-slate-600 group-hover:text-white" />
                <span className="text-slate-900 group-hover:text-white">{platform.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
