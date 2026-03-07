"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { TagPill, Toast } from "@/components/UIComponents";
import { getInitials, formatNumber } from "@/lib/utils";
import Link from "next/link";
import { ExternalLink, Save } from "lucide-react";

export default function CreatorProfile() {
  const { user } = useAuthStore();

  // Resolve creator record from logged-in user's handle
  const [creator, setCreator] = useState<any>({ handle: user?.handle });
  const [bio, setBio] = useState(creator?.bio || "");
  const [toast, setToast] = useState("");
  const [portfolio, setPortfolio] = useState<string[]>(creator?.portfolio || []);
  const [saving, setSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/api/me?_t=${Date.now()}`);
      if (response.data && !response.data.error) {
        const d = response.data;
        setCreator((prev: any) => ({
          ...prev,
          handle: d.handle || user?.handle || prev.handle,
          name: d.name || prev.name,
          email: d.email || prev.email,
          location: d.location || prev.location,
          bio: d.bio || prev.bio,
          niches: [d.primaryNiche, d.secondaryNiche].filter(Boolean) as string[] || prev?.niches || [],
          platforms: {
            ...(prev?.platforms || {}),
            instagram: d.instagram || prev?.platforms?.instagram || "",
            youtube: d.youtube || prev?.platforms?.youtube || "",
            tiktok: d.tiktok || prev?.platforms?.tiktok || "",
            twitter: d.twitter || prev?.platforms?.twitter || "",
          } as any,
          rates: {
            ...(prev?.rates || {}),
            reel: d.instagramReel || prev?.rates?.reel || 0,
            short: d.ytShort || prev?.rates?.short || 0,
            story: d.instagramStory || prev?.rates?.story || 0,
            youtube: d.youtubeIntegration || prev?.rates?.youtube || 0,
          } as any
        }));

        if (d.bio) setBio(d.bio);

        if (d.portfolioPhotos) {
          const photos = Array.isArray(d.portfolioPhotos) ? d.portfolioPhotos : d.portfolioPhotos.split(",");
          setPortfolio(photos);
        } else {
          setPortfolio([]);
        }
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to fetch creator profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPortfolio([...portfolio, url]);
    }
  };

  const removePhoto = (index: number) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
  };

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);

    try {
      await axios.post("/api/creator/onboarding/basic-info", {
        name: formData.get("name"),
        phoneNumber: creator?.phoneNumber || "",
        email: formData.get("email"),
        location: formData.get("location"),
        bio: formData.get("bio"),
      });

      await axios.post("/api/creator/onboarding/handle", {
        instagram: formData.get("instagram"),
        twitter: formData.get("twitter"),
        youtube: formData.get("youtube"),
        tiktok: formData.get("tiktok"),
        portfolioPhotos: portfolio.length > 0 ? portfolio.join(",") : "",
      });

      await axios.post("/api/creator/onboarding/rate-card", {
        instagramReel: parseFloat(formData.get("reel") as string) || 0,
        ytShort: parseFloat(formData.get("short") as string) || 0,
        instagramStory: parseFloat(formData.get("story") as string) || 0,
        youtubeIntegration: parseFloat(formData.get("youtube") as string) || 0,
        amount: creator.rates?.amount || 0,
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
        <h2 className="font-display text-3xl font-bold">Edit Profile</h2>
        <Link
          href={creator?.handle ? `/app/creator/preview/${creator.handle}` : "#"}
          className={`flex items-center gap-2 text-sm font-medium ${creator?.handle ? 'text-brand hover:underline' : 'text-gray-400 cursor-not-allowed'}`}
          onClick={(e) => !creator?.handle && e.preventDefault()}
        >
          Preview public profile <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-lg mb-4">Basic Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input name="name" defaultValue={creator.name} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Handle</label>
                <input name="handle" defaultValue={`@${creator.handle}`} readOnly className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none cursor-not-allowed text-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input name="location" defaultValue={creator.location} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input name="email" defaultValue={creator.email} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-lg mb-4">Niche Tags</h3>
            <div className="flex flex-wrap gap-2">
              {creator?.niches?.map((n: string) => <TagPill key={n} label={n} />)}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-lg mb-4">Social Links</h3>
            <div className="space-y-3">
              {Object.entries(creator?.platforms || {})
                .map(([platform, handle]) => (
                  <div key={platform} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-24 capitalize">{platform}</span>
                    <input
                      name={platform}
                      defaultValue={handle as string}
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 text-sm"
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-lg mb-4">Rate Card</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(creator?.rates || {})
                .map(([type, rate]) => (
                  <div key={type} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-24 capitalize">{type}</span>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                      <input
                        name={type}
                        defaultValue={rate as number}
                        type="number"
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 text-sm font-semibold text-gray-900"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="font-bold text-lg mb-4">Portfolio Gallery</h3>
            <div className="grid grid-cols-3 gap-3">
              {portfolio?.map((photo, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden relative group bg-gray-100 flex items-center justify-center p-2 text-center break-all">
                  {photo.startsWith('http') || photo.startsWith('data:') || photo.startsWith('blob:') ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={photo} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-medium text-gray-500">{photo}</span>
                  )}
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
              {portfolio.length < 6 && (
                <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors cursor-pointer relative">
                  <span className="flex flex-col items-center gap-2">
                    <span className="text-2xl">+</span>
                    <span className="text-xs font-medium">Add Photo</span>
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar preview */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <div className="text-center mb-4">
              <div className="w-20 h-20 rounded-full bg-brand mx-auto flex items-center justify-center text-white text-2xl font-bold">
                {getInitials(creator.name || "Creator Name")}
              </div>
              <h3 className="font-bold text-lg mt-3">{creator.name || "Loading..."}</h3>
              <p className="text-sm text-gray-500">@{creator.handle}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center bg-gray-50 rounded-xl p-3">
                <p className="text-lg font-bold">{formatNumber(creator.followers || 0)}</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div className="text-center bg-gray-50 rounded-xl p-3">
                <p className="text-lg font-bold">{creator.engagement || 0}%</p>
                <p className="text-xs text-gray-500">Engagement</p>
              </div>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-brand text-white font-semibold py-3 rounded-xl hover:bg-brand-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </form>
  );
}
