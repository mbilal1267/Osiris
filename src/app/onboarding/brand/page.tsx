"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import OnboardingStepper from "@/components/OnboardingStepper";
import Link from "next/link";
import { categories } from "@/data/seed";

const STEPS = ["Company Info", "Details", "Goals", "Budget", "Finish"];
const BIZ_TYPES = ["E-commerce", "SaaS", "DTC Brand", "Agency", "Retail", "Media", "Non-profit", "Other"];
const GOALS = ["Brand Awareness", "Sales / Conversions", "UGC Content", "Affiliate Program", "Product Launch", "Event Promotion"];
const COUNTRIES = ["United States", "United Kingdom", "Canada", "India", "Australia", "Germany", "Brazil", "France", "Japan", "Mexico"];

export default function BrandOnboarding() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, any>>({ markets: [], goals: [] });
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const update = (key: string, val: any) => setData((d) => ({ ...d, [key]: val }));
  const toggleMarket = (m: string) => update("markets", data.markets.includes(m) ? data.markets.filter((x: string) => x !== m) : [...data.markets, m]);
  const toggleGoal = (g: string) => update("goals", data.goals.includes(g) ? data.goals.filter((x: string) => x !== g) : [...data.goals, g]);

  const isStepValid = () => {
    switch (step) {
      case 0:
        return data.fullName && data.businessName && data.jobTitle && data.bizType && data.gstNumber && data.markets.length > 0 && data.phone && data.website;
      case 1:
        return data.description && data.primaryNiche && data.secondaryNiche;
      case 2:
        return data.goals.length > 0;
      case 3:
        return data.budget;
      default:
        return true;
    }
  };

  const finish = () => {
    if (user) setUser({ ...user, onboarded: true });
    router.push("/app/brand");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link href="/" className="font-display text-2xl font-bold">Osiris</Link>
        <div className="mt-8"><OnboardingStepper steps={STEPS} currentStep={step} /></div>
        <div className="mt-8">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold">Enter your company information</h2>
              <p className="text-gray-500 text-sm">Enter your main brand&apos;s information. If you want to create listings under multiple brands, you can do so later.</p>
              <div><label className="block text-sm font-medium mb-1">Full name <span className="text-red-500">*</span></label><input value={data.fullName || ""} onChange={(e) => update("fullName", e.target.value)} placeholder="Your full name" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" required /></div>
              <div><label className="block text-sm font-medium mb-1">Business name <span className="text-red-500">*</span></label><input value={data.businessName || ""} onChange={(e) => update("businessName", e.target.value)} placeholder="Your business name" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" required /></div>
              <div><label className="block text-sm font-medium mb-1">Job title <span className="text-red-500">*</span></label><input value={data.jobTitle || ""} onChange={(e) => update("jobTitle", e.target.value)} placeholder="Your job title" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" required /></div>
              <div><label className="block text-sm font-medium mb-1">Business type <span className="text-red-500">*</span></label>
                <select value={data.bizType || ""} onChange={(e) => update("bizType", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" required>
                  <option value="">Select your business type</option>{BIZ_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium mb-1">GST number <span className="text-red-500">*</span></label><input value={data.gstNumber || ""} onChange={(e) => update("gstNumber", e.target.value)} placeholder="Your GST number" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" required /></div>
              <div><label className="block text-sm font-medium mb-1">Select your target markets <span className="text-red-500">*</span></label><p className="text-xs text-gray-400 mb-2">You can pick several markets where you offer your goods and services</p>
                <div className="flex flex-wrap gap-2">{COUNTRIES.map((c) => (
                  <button key={c} onClick={() => toggleMarket(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${data.markets.includes(c) ? "bg-brand text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{c}</button>
                ))}</div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Phone number <span className="text-red-500">*</span></label><input value={data.phone || ""} onChange={(e) => update("phone", e.target.value)} placeholder="Enter your phone number" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" required /></div>
              <div><label className="block text-sm font-medium mb-1">Website <span className="text-red-500">*</span></label><input value={data.website || ""} onChange={(e) => update("website", e.target.value)} placeholder="https://yourbrand.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" required /></div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold">Tell us about your brand</h2>
              <p className="text-gray-500 text-sm">This helps us match you with the right creators.</p>
              <div><label className="block text-sm font-medium mb-1">Brand description <span className="text-red-500">*</span></label><textarea value={data.description || ""} onChange={(e) => update("description", e.target.value)} placeholder="Describe your brand in a few sentences..." rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none" required /></div>
              <div><label className="block text-sm font-medium mb-1">Hashtags</label><input value={data.hashtags || ""} onChange={(e) => update("hashtags", e.target.value)} placeholder="e.g. #fitness, #health (comma separated)" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" /></div>
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
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold">What are your goals? <span className="text-red-500">*</span></h2>
              <p className="text-gray-500 text-sm">Select all that apply.</p>
              <div className="grid grid-cols-2 gap-3">{GOALS.map((g) => (
                <button key={g} onClick={() => toggleGoal(g)} className={`p-4 rounded-xl text-sm font-medium text-left transition-colors border ${data.goals.includes(g) ? "border-brand bg-brand/5 text-brand" : "border-gray-200 hover:border-gray-300"}`}>{g}</button>
              ))}</div>
              {data.goals.length === 0 && <p className="text-xs text-red-500">Please select at least one goal</p>}
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold">Budget range <span className="text-red-500">*</span></h2>
              <p className="text-gray-500 text-sm">This helps us recommend the right creators for your budget.</p>
              <div><label className="block text-sm font-medium mb-3">Convert your budget to INR</label>
                <div className="flex gap-2">
                  <div className="flex-1"><label className="block text-xs text-gray-600 mb-1">Amount (USD)</label><input type="number" value={data.budgetUSD || ""} onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    update("budgetUSD", e.target.value);
                    update("budgetINR", (val * 83).toFixed(2));
                  }} placeholder="Enter amount" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20" /></div>
                  <div className="flex-1"><label className="block text-xs text-gray-600 mb-1">Amount (INR)</label><input type="text" value={data.budgetINR || ""} disabled placeholder="Auto calculated" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50" /></div>
                </div>
              </div>
              <div><label className="block text-sm font-medium mb-3">Or select a budget range <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 gap-3">{["Under ₹5K", "₹5K - ₹15K", "₹15K - ₹50K", "₹50K - ₹100K", "₹100K+", "Not sure yet"].map((b) => (
                  <button key={b} onClick={() => update("budget", b)} className={`p-4 rounded-xl text-sm font-medium text-left transition-colors border ${data.budget === b ? "border-brand bg-brand/5 text-brand" : "border-gray-200 hover:border-gray-300"}`}>{b}</button>
                ))}</div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6"><span className="text-4xl">🚀</span></div>
              <h2 className="font-display text-3xl font-bold mb-2">Welcome aboard!</h2>
              <p className="text-gray-500 max-w-sm mx-auto">Your brand profile is ready. Start discovering creators and launching your first campaign.</p>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-10">
          {step > 0 && step < 4 && <button onClick={() => setStep(step - 1)} className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">Back</button>}
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
