"use client";
import { useState } from "react";
import { creators } from "@/data/seed";
import { TagPill, Toast } from "@/components/UIComponents";
import { formatNumber, formatCurrency, getInitials } from "@/lib/utils";
import { Search, SlidersHorizontal, Bookmark, Send, X } from "lucide-react";
import Link from "next/link";

const NICHES = ["All", "Fitness", "Beauty", "Tech", "Food", "Fashion", "Finance", "Travel", "Wellness", "Gaming", "Education"];

export default function BrandCreatorDiscovery() {
  const [query, setQuery] = useState("");
  const [niche, setNiche] = useState("All");
  const [toast, setToast] = useState("");
  const [inviteModal, setInviteModal] = useState<string | null>(null);
  const [brief, setBrief] = useState("");

  const filtered = creators.filter((c) => {
    const matchQuery = !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.handle.toLowerCase().includes(query.toLowerCase());
    const matchNiche = niche === "All" || c.niches.some((n) => n === niche);
    return matchQuery && matchNiche;
  });

  const inviteCreator = creators.find((c) => c.id === inviteModal);

  const sendInvite = () => {
    setInviteModal(null); setBrief(""); setToast("Invite sent successfully!"); setTimeout(() => setToast(""), 3000);
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-2">Discover Creators</h1>
      <p className="text-gray-500 mb-6">Search and filter to find the perfect creators for your campaigns.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, handle, or niche..." className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20" />
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {NICHES.map((n) => (
          <button key={n} onClick={() => setNiche(n)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${niche === n ? "bg-brand text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{n}</button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 bg-gray-50/50 text-left text-gray-500">
              <th className="px-6 py-3 font-medium">Creator</th><th className="px-6 py-3 font-medium">Niches</th><th className="px-6 py-3 font-medium">Followers</th><th className="px-6 py-3 font-medium">Engagement</th><th className="px-6 py-3 font-medium">Est. Rate</th><th className="px-6 py-3 font-medium">Actions</th>
            </tr></thead>
            <tbody>{filtered.map((c) => (
              <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <Link href={`/c/${c.handle}`} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand text-xs font-bold shrink-0">{getInitials(c.name)}</div>
                    <div><p className="font-medium">{c.name}</p><p className="text-xs text-gray-400">@{c.handle} · {c.location}</p></div>
                  </Link>
                </td>
                <td className="px-6 py-4"><div className="flex gap-1 flex-wrap">{c.niches.map((n) => <TagPill key={n} label={n} />)}</div></td>
                <td className="px-6 py-4 font-medium">{formatNumber(c.followers)}</td>
                <td className="px-6 py-4"><span className="text-green-600 font-medium">{c.engagement}%</span></td>
                <td className="px-6 py-4 font-medium">{formatCurrency(c.rates.reel)}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => { setToast("Added to shortlist!"); setTimeout(() => setToast(""), 2000); }} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-brand" title="Shortlist"><Bookmark className="w-4 h-4" /></button>
                    <button onClick={() => setInviteModal(c.id)} className="p-2 rounded-lg hover:bg-brand/10 text-gray-400 hover:text-brand" title="Invite"><Send className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="py-12 text-center text-gray-400">No creators match your search.</div>}
      </div>

      {inviteModal && inviteCreator && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setInviteModal(null)}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl font-bold">Invite {inviteCreator.name}</h2>
              <button onClick={() => setInviteModal(null)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Campaign Brief</label><textarea value={brief} onChange={(e) => setBrief(e.target.value)} placeholder="Describe what you're looking for..." rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none" /></div>
              <div><label className="block text-sm font-medium mb-1">Deliverables</label><input placeholder="e.g. 2 Reels + 3 Stories" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
              <div><label className="block text-sm font-medium mb-1">Budget</label><input placeholder="₹5,000" className="w-full px-4 py-3 border border-gray-200 rounded-xl" /></div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setInviteModal(null)} className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-sm hover:bg-gray-50">Cancel</button>
                <button onClick={sendInvite} className="flex-1 py-3 bg-brand text-white rounded-xl font-medium text-sm hover:bg-brand-dark flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Send Invite</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </div>
  );
}
