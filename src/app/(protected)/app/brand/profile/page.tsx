"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "@/components/UIComponents";
import { Save, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth";

export default function BrandProfile() {
  const { user } = useAuthStore();
  const [brand, setBrand] = useState<{
    name: string;
    description: string;
    website: string;
    categories: string[];
    markets: string[];
    slug: string;
    fullName?: string;
    businessType?: string;
    gstNumber?: string;
    phoneNumber?: string;
    primaryNiche?: string;
    secondaryNiche?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  }>({
    name: "",
    description: "",
    website: "",
    categories: [],
    markets: [],
    slug: user?.brandSlug || "",
  });
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/api/me?_t=${Date.now()}`);
      if (response.data && !response.data.error) {
        const d = response.data;
        setBrand((prev) => ({
          ...prev,
          slug: d.slug || d.brandSlug || user?.brandSlug || prev.slug,
          name: d.businessName || prev.name,
          description: d.brandDescription || prev.description,
          website: d.website || prev.website,
          categories: [d.primaryNiche, d.secondaryNiche].filter(Boolean) as string[] || prev.categories,
          markets: d.targetMarkets || prev.markets,
          fullName: d.fullName,
          businessType: d.businessType,
          gstNumber: d.gstNumber,
          phoneNumber: d.phoneNumber,
          primaryNiche: d.primaryNiche,
          secondaryNiche: d.secondaryNiche,
          instagram: d.instagram || "",
          twitter: d.twitter || "",
          linkedin: d.linkedin || "",
        }));
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to fetch brand profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);

    try {
      await axios.post("/api/brand/onboarding/company-info", {
        fullName: brand.fullName || "",
        businessName: formData.get("name"),
        jobTitle: "Founder/Owner", // Or get from state if it exists
        businessType: brand.businessType || "",
        gstNumber: brand.gstNumber || "",
        targetMarkets: brand.markets || [],
        phoneNumber: brand.phoneNumber || "",
        website: formData.get("website"),
      });

      await axios.post("/api/brand/onboarding/brand-details", {
        brandDescription: formData.get("description"),
        primaryNiche: brand.primaryNiche || "",
        secondaryNiche: brand.secondaryNiche || "",
        instagram: formData.get("Instagram"),
        twitter: formData.get("Twitter"),
        linkedin: formData.get("LinkedIn"),
      });

      setToast("Profile saved successfully!");
      await fetchProfile(); // Auto-refresh data
    } catch (error) {
      console.error(error);
      setToast("Failed to save profile.");
    } finally {
      setSaving(false);
      setTimeout(() => setToast(""), 3000);
    }
  };

  return (
    <form key={refreshKey} onSubmit={save}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold">Brand Profile</h1>
        <Link
          href={brand?.slug ? `/app/brand/preview/${brand.slug}` : "#"}
          className={`flex items-center gap-2 text-sm font-medium ${brand?.slug ? 'text-brand hover:underline' : 'text-gray-400 cursor-not-allowed'}`}
          onClick={(e) => !brand?.slug && e.preventDefault()}
        >
          <ExternalLink className="w-4 h-4" /> Preview public profile
        </Link>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-lg mb-4">Brand Information</h2>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Brand Name</label><input name="name" defaultValue={brand.name} className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
              <div><label className="block text-sm font-medium mb-1">Description</label><textarea name="description" defaultValue={brand.description} rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none" /></div>
              <div><label className="block text-sm font-medium mb-1">Website</label><input name="website" defaultValue={brand.website} className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
              <div><label className="block text-sm font-medium mb-1">Categories</label><div className="flex gap-2">{brand.categories.map((c) => <span key={c} className="px-3 py-1 bg-brand/10 text-brand rounded-full text-xs font-medium">{c}</span>)}</div></div>
              <div><label className="block text-sm font-medium mb-1">Target Markets</label><div className="flex gap-2 flex-wrap">{brand.markets.map((m) => <span key={m} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{m}</span>)}</div></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-bold text-lg mb-4">Social Links</h2>
            <div className="space-y-3">
              {["Instagram", "Twitter", "LinkedIn"].map((p) => {
                const defaultVal = p === "Instagram" ? brand.instagram : p === "Twitter" ? brand.twitter : brand.linkedin;
                return (
                  <div key={p} className="flex items-center gap-3"><span className="text-sm font-medium w-24">{p}</span><input name={p} defaultValue={defaultVal || ""} placeholder={`@${brand.slug}`} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm" /></div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-brand mx-auto flex items-center justify-center text-white text-2xl font-bold mb-3">{brand.name ? brand.name[0] : "B"}</div>
            <h3 className="font-bold text-lg">{brand.name || "Loading..."}</h3>
            <p className="text-sm text-gray-500 mt-1">{brand.categories.join(" · ")}</p>
            <button type="submit" disabled={saving} className="w-full mt-4 bg-brand text-white font-semibold py-3 rounded-xl hover:bg-brand-dark flex items-center justify-center gap-2 disabled:opacity-50"><Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}</button>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </form>
  );
}
