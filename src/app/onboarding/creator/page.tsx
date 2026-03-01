"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import OnboardingStepper from "@/components/OnboardingStepper";
import Link from "next/link";
import { categories } from "@/data/seed";

const STEPS = ["Basics", "Platforms", "Niche", "Rates", "Finish"];
const COUNTRIES = ["United States", "United Kingdom", "Canada", "India", "Australia", "Germany", "Brazil", "France", "Japan", "Mexico", "South Korea", "Spain", "Italy", "UAE"];

export default function CreatorOnboarding() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, any>>({ niches: [], countries: [] });
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const update = (key: string, val: any) => setData((d) => ({ ...d, [key]: val }));

  const isStepValid = () => {
    switch (step) {
      case 0:
        return data.name && data.phone && (data.email || user?.email);
      case 1:
        return true;
      case 2:
        return data.primaryNiche && data.secondaryNiche;
      case 3:
        return Object.values(data).some(v => typeof v === 'string' && v.trim());
      default:
        return true;
    }
  };

  const finish = () => {
    if (user) setUser({ ...user, onboarded: true });
    router.push("/app/creator");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link href="/" className="font-display text-2xl font-bold">Osiris</Link>
        <div className="mt-8">
          <OnboardingStepper steps={STEPS} currentStep={step} />
        </div>
        <div className="mt-8">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold">Tell us about yourself</h2>
              <p className="text-gray-500 text-sm">This helps brands find and connect with you.</p>
              <div><label className="block text-sm font-medium mb-1">Full name <span className="text-red-500">*</span></label><input value={data.name || ""} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" required /></div>
              <div><label className="block text-sm font-medium mb-1">Phone number <span className="text-red-500">*</span></label><input value={data.phone || ""} onChange={(e) => update("phone", e.target.value)} placeholder="Enter your phone number" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" required /></div>
              <div><label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label><input value={data.email || user?.email || ""} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" required /></div>
              <div><label className="block text-sm font-medium mb-1">Location</label><input value={data.location || ""} onChange={(e) => update("location", e.target.value)} placeholder="City, Country" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" /></div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold">Connect your platforms</h2>
              <p className="text-gray-500 text-sm">Add your social media handles so brands can see your reach.</p>
              <div><label className="block text-sm font-medium mb-1">Instagram</label><input value={data.instagram || ""} onChange={(e) => update("instagram", e.target.value)} placeholder="@handle" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" /></div>
              <div><label className="block text-sm font-medium mb-1">X (Twitter)</label><input value={data.x || ""} onChange={(e) => update("x", e.target.value)} placeholder="@handle" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" /></div>
              <div><label className="block text-sm font-medium mb-1">YouTube</label><input value={data.youtube || ""} onChange={(e) => update("youtube", e.target.value)} placeholder="Channel name" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" /></div>
              <div><label className="block text-sm font-medium mb-1">Portfolio Photos</label><input value={data.portfolioPhotos || ""} onChange={(e) => update("portfolioPhotos", e.target.value)} placeholder="Comma-separated photo URLs" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" /></div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold">Pick your niches</h2>
              <p className="text-gray-500 text-sm">Select your primary and secondary niches that best describe your content.</p>
              <div><label className="block text-sm font-medium mb-1">Primary niche <span className="text-red-500">*</span></label>
                <select value={data.primaryNiche || ""} onChange={(e) => {
                  update("primaryNiche", e.target.value);
                  update("secondaryNiche", "");
                }} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" required>
                  <option value="">Select primary niche</option>{categories.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              {data.primaryNiche && (
                <div><label className="block text-sm font-medium mb-1">Secondary niche <span className="text-red-500">*</span></label>
                  <select value={data.secondaryNiche || ""} onChange={(e) => update("secondaryNiche", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" required>
                    <option value="">Select secondary niche</option>{categories.find((c) => c.name === data.primaryNiche)?.subCategories.map((sc) => <option key={sc} value={sc}>{sc}</option>)}
                  </select>
                </div>
              )}
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold">Set your rates <span className="text-red-500">*</span></h2>
              <p className="text-gray-500 text-sm">Brands will see these when reviewing your profile. You can change them anytime.</p>
              <div><label className="block text-sm font-medium mb-3">Convert your minimum charges to INR</label>
                <div className="flex gap-2">
                  <div className="flex-1"><label className="block text-xs text-gray-600 mb-1">Amount (USD)</label><input type="number" value={data.minChargesUSD || ""} onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    update("minChargesUSD", e.target.value);
                    update("minChargesINR", (val * 83).toFixed(2));
                  }} placeholder="Enter amount" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20" /></div>
                  <div className="flex-1"><label className="block text-xs text-gray-600 mb-1">Amount (INR)</label><input type="text" value={data.minChargesINR || ""} disabled placeholder="Auto calculated" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50" /></div>
                </div>
              </div>
              {["Instagram Reel", "X (Twitter)", "Instagram Story", "YouTube Integration"].map((type) => (
                <div key={type}><label className="block text-sm font-medium mb-1">{type}</label>
                  <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input type="number" value={data[type] || ""} onChange={(e) => update(type, e.target.value)} placeholder="0" className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {step === 4 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6"><span className="text-4xl">🎉</span></div>
              <h2 className="font-display text-3xl font-bold mb-2">You&apos;re all set!</h2>
              <p className="text-gray-500 max-w-sm mx-auto">Your creator profile is ready. Start exploring brand partnerships and landing your first deal.</p>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-10">
          {step > 0 && <button onClick={() => setStep(step - 1)} className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">Back</button>}
          {step < 4 ? (
            <button onClick={() => {
              if (isStepValid()) {
                setStep(step + 1);
              }
            }} disabled={!isStepValid()} className="ml-auto px-8 py-3 bg-black text-white font-semibold rounded-xl text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">Continue</button>
          ) : (
            <button onClick={finish} className="ml-auto px-8 py-3 bg-brand text-white font-semibold rounded-xl text-sm hover:bg-brand-dark">Go to Dashboard</button>
          )}
        </div>
      </div>
    </div>
  );
}
