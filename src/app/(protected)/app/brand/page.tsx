"use client";
import { useAuthStore } from "@/stores/auth";
import { StatCard, TagPill, Toast } from "@/components/UIComponents";
import { Users, Megaphone, DollarSign, Plus } from "lucide-react";
import Link from "next/link";
import { creators, campaigns, deals, brands } from "@/data/seed";
import { formatCurrency, formatNumber, getInitials } from "@/lib/utils";
import { useState } from "react";

export default function BrandDashboard() {
  const { user } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [toast, setToast] = useState("");

  // Resolve brand record from logged-in user's brandSlug
  const brandRecord = brands.find((b) => b.slug === user?.brandSlug);
  const brandCampaigns = campaigns.filter((c) => c.brandId === brandRecord?.id);
  const brandDeals = deals.filter((d) => d.brandId === brandRecord?.id);

  const createCampaign = () => {
    if (campaignName) {
      setShowModal(false);
      setCampaignName("");
      setToast("Campaign created!");
      setTimeout(() => setToast(""), 3000);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-3xl font-bold">
            Welcome back, {user?.name?.split(" ")[0] || "Brand"} 👋
          </h2>
          <p className="text-gray-500 mt-1">Manage your creator partnerships and campaigns.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-brand text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-brand-dark transition-colors"
        >
          <Plus className="w-4 h-4" /> Create Campaign
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Active Deals" value={String(brandDeals.filter((d) => d.status === "active").length)} icon={Users} trend="+3 this month" />
        <StatCard label="Active Campaigns" value={String(brandCampaigns.filter((c) => c.status === "active").length)} icon={Megaphone} />
        <StatCard label="Spend This Month" value={formatCurrency(brandDeals.filter((d) => d.status === "active").reduce((s, d) => s + d.budget, 0))} icon={DollarSign} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Active Campaigns */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Active Campaigns</h3>
            <Link href="/app/brand/campaigns" className="text-sm text-brand font-medium hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {brandCampaigns.slice(0, 3).map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
                <div>
                  <p className="font-medium text-sm">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.timeline}</p>
                </div>
                <div className="flex items-center gap-3">
                  <TagPill label={c.status} type="status" />
                  <span className="text-sm font-bold">{formatCurrency(c.budget)}</span>
                </div>
              </div>
            ))}
            {brandCampaigns.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No campaigns yet.</p>
            )}
          </div>
        </div>

        {/* Suggested Creators */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Suggested Creators</h3>
            <Link href="/app/brand/creators" className="text-sm text-brand font-medium hover:underline">
              Discover more
            </Link>
          </div>
          <div className="space-y-3">
            {creators.slice(0, 4).map((c) => (
              <Link key={c.id} href={`/app/brand/creators/${c.handle}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand text-xs font-bold shrink-0">
                  {getInitials(c.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{c.name}</p>
                  <p className="text-xs text-gray-400">@{c.handle} · {formatNumber(c.followers)} followers</p>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {c.niches.map((n) => <TagPill key={n} label={n} />)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-2xl font-bold mb-4">Create Campaign</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Campaign name</label>
                <input
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g. Summer Product Launch"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Goals</label>
                <input placeholder="Brand awareness, sales..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Budget</label>
                <input placeholder="₹10,000" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createCampaign}
                  className="flex-1 py-3 bg-brand text-white rounded-xl font-medium text-sm hover:bg-brand-dark transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}
