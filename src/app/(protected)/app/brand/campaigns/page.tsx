"use client";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth";
import { campaigns, brands } from "@/data/seed";
import { TagPill, Toast } from "@/components/UIComponents";
import { formatCurrency } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import Link from "next/link";

export default function BrandCampaigns() {
  const { user } = useAuthStore();
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState("");
  const [name, setName] = useState("");

  // Resolve brand record from logged-in user's brandSlug
  const brandRecord = brands.find((b) => b.slug === user?.brandSlug);
  const brandCampaigns = campaigns.filter((c) => c.brandId === brandRecord?.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-3xl font-bold">Campaigns</h2>
          <p className="text-gray-500 mt-1">Create, manage, and track your creator campaigns.</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-brand text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-brand-dark transition-colors"
        >
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      {brandCampaigns.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-brand" />
          </div>
          <h3 className="font-bold text-lg mb-2">No campaigns yet</h3>
          <p className="text-gray-500 text-sm mb-6">Create your first campaign to start working with creators.</p>
          <button
            onClick={() => setShowCreate(true)}
            className="px-6 py-3 bg-brand text-white rounded-xl font-medium text-sm hover:bg-brand-dark transition-colors"
          >
            Create Campaign
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brandCampaigns.map((c) => (
            <Link href="/campaigns/details" key={c.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow block">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg">{c.name}</h3>
                <TagPill label={c.status} type="status" />
              </div>
              <p className="text-sm text-gray-500 mb-4">{c.timeline}</p>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-lg font-bold">{c.creatorsAccepted}</p>
                  <p className="text-xs text-gray-500">Creators</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-lg font-bold">{formatCurrency(c.budget)}</p>
                  <p className="text-xs text-gray-500">Budget</p>
                </div>
              </div>
              <div className="flex gap-1 mt-4 flex-wrap">
                {c.goals.map((g) => (
                  <span key={g} className="text-xs bg-brand/5 text-brand px-2 py-0.5 rounded-full">
                    {g}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreate && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowCreate(false)}
        >
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl font-bold">Create Campaign</h2>
              <button onClick={() => setShowCreate(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Campaign Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Summer Product Launch"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Goals</label>
                <input placeholder="Brand awareness, sales..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deliverables</label>
                <input placeholder="e.g. Instagram Reels + Stories" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Budget</label>
                  <input placeholder="₹10,000" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Timeline</label>
                  <input placeholder="Jan - Mar 2026" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCreate(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowCreate(false);
                    setToast("Campaign created!");
                    setTimeout(() => setToast(""), 3000);
                  }}
                  className="flex-1 py-3 bg-brand text-white rounded-xl font-medium text-sm hover:bg-brand-dark transition-colors"
                >
                  Create Campaign
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
