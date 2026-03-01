"use client";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth";
import { creators } from "@/data/seed";
import { TagPill, Toast } from "@/components/UIComponents";
import { getInitials, formatNumber, formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { ExternalLink, Save } from "lucide-react";

export default function CreatorProfile() {
  const { user } = useAuthStore();
  const creator = creators[0]; // mock: use first creator
  const [bio, setBio] = useState(creator.bio);
  const [toast, setToast] = useState("");

  const save = () => setToast("Profile saved successfully!");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold">Edit Profile</h1>
        <Link href={`/c/${creator.handle}`} className="flex items-center gap-2 text-sm text-brand font-medium hover:underline">
          Preview public profile <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-lg mb-4">Basic Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-1">Name</label><input defaultValue={creator.name} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" /></div>
              <div><label className="block text-sm font-medium mb-1">Handle</label><input defaultValue={`@${creator.handle}`} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" /></div>
              <div><label className="block text-sm font-medium mb-1">Location</label><input defaultValue={creator.location} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" /></div>
              <div><label className="block text-sm font-medium mb-1">Email</label><input defaultValue={creator.email} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" /></div>
            </div>
            <div className="mt-4"><label className="block text-sm font-medium mb-1">Bio</label><textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none" /></div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-lg mb-4">Niche Tags</h2>
            <div className="flex flex-wrap gap-2">{creator.niches.map((n) => <TagPill key={n} label={n} />)}</div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-lg mb-4">Social Links</h2>
            <div className="space-y-3">
              {Object.entries(creator.platforms).filter(([_, v]) => v).map(([platform, handle]) => (
                <div key={platform} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-24 capitalize">{platform}</span>
                  <input defaultValue={handle} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 text-sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-lg mb-4">Rate Card</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(creator.rates).filter(([_, v]) => v > 0).map(([type, rate]) => (
                <div key={type} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                  <span className="text-sm font-medium capitalize">{type}</span>
                  <span className="font-bold">{formatCurrency(rate)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-lg mb-4">Portfolio Gallery</h2>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xs hover:bg-gray-200 transition-colors cursor-pointer">
                  {i <= 2 ? "Content" : "+ Add"}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <div className="text-center mb-4">
              <div className="w-20 h-20 rounded-full bg-brand mx-auto flex items-center justify-center text-white text-2xl font-bold">{getInitials(creator.name)}</div>
              <h3 className="font-bold text-lg mt-3">{creator.name}</h3>
              <p className="text-sm text-gray-500">@{creator.handle}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center bg-gray-50 rounded-xl p-3"><p className="text-lg font-bold">{formatNumber(creator.followers)}</p><p className="text-xs text-gray-500">Followers</p></div>
              <div className="text-center bg-gray-50 rounded-xl p-3"><p className="text-lg font-bold">{creator.engagement}%</p><p className="text-xs text-gray-500">Engagement</p></div>
            </div>
            <button onClick={save} className="w-full bg-brand text-white font-semibold py-3 rounded-xl hover:bg-brand-dark transition-colors flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}
