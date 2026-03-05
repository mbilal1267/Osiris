"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { brands } from "@/data/seed";
import { Toast } from "@/components/UIComponents";
import { Save, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function BrandProfile() {
  const [brand, setBrand] = useState(brands[0]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/me");
        if (response.data && !response.data.error) {
          const d = response.data;
          setBrand((prev) => ({
            ...prev,
            name: d.businessName || prev.name,
            description: d.brandDescription || prev.description,
            website: d.website || prev.website,
            categories: [d.primaryNiche, d.secondaryNiche].filter(Boolean) as string[] || prev.categories,
            markets: d.targetMarkets || prev.markets,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch brand profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold">Brand Profile</h1>
        <Link href={`/app/brand/preview/${brand.slug}`} className="flex items-center gap-2 text-sm text-brand font-medium hover:underline"><ExternalLink className="w-4 h-4" /> Preview public profile</Link>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-lg mb-4">Brand Information</h2>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Brand Name</label><input defaultValue={brand.name} className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
              <div><label className="block text-sm font-medium mb-1">Description</label><textarea defaultValue={brand.description} rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none" /></div>
              <div><label className="block text-sm font-medium mb-1">Website</label><input defaultValue={brand.website} className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
              <div><label className="block text-sm font-medium mb-1">Categories</label><div className="flex gap-2">{brand.categories.map((c) => <span key={c} className="px-3 py-1 bg-brand/10 text-brand rounded-full text-xs font-medium">{c}</span>)}</div></div>
              <div><label className="block text-sm font-medium mb-1">Target Markets</label><div className="flex gap-2 flex-wrap">{brand.markets.map((m) => <span key={m} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{m}</span>)}</div></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-lg mb-4">Social Links</h2>
            <div className="space-y-3">
              {["Instagram", "Twitter", "LinkedIn"].map((p) => (
                <div key={p} className="flex items-center gap-3"><span className="text-sm font-medium w-24">{p}</span><input placeholder={`@${brand.slug}`} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm" /></div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-brand mx-auto flex items-center justify-center text-white text-2xl font-bold mb-3">{brand.name[0]}</div>
            <h3 className="font-bold text-lg">{brand.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{brand.categories.join(" · ")}</p>
            <button onClick={() => { setToast("Profile saved!"); setTimeout(() => setToast(""), 3000); }} className="w-full mt-4 bg-brand text-white font-semibold py-3 rounded-xl hover:bg-brand-dark flex items-center justify-center gap-2"><Save className="w-4 h-4" /> Save Changes</button>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}
