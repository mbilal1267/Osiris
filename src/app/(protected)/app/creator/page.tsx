"use client";
import { useAuthStore } from "@/stores/auth";
import { StatCard, TagPill } from "@/components/UIComponents";
import { Handshake, Clock, DollarSign, ArrowRight, User, BarChart3, Share2 } from "lucide-react";
import Link from "next/link";
import { creators, deals } from "@/data/seed";
import { formatCurrency } from "@/lib/utils";

export default function CreatorDashboard() {
  const { user } = useAuthStore();

  // Resolve logged-in creator record dynamically from handle
  const creatorRecord = creators.find((c) => c.handle === user?.handle);
  const myDeals = deals.filter((d) => d.creatorId === creatorRecord?.id);
  const activeDeals = myDeals.filter((d) => d.status === "active").length;
  const pendingDeals = myDeals.filter((d) => ["invited", "negotiating"].includes(d.status)).length;
  const earnings = myDeals
    .filter((d) => ["active", "delivered", "paid"].includes(d.status))
    .reduce((s, d) => s + d.budget, 0);

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-3xl font-bold">
          Welcome back, {user?.name?.split(" ")[0] || "Creator"} 👋
        </h2>
        <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your collaborations.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Active Deals" value={String(activeDeals)} icon={Handshake} trend="+2 this month" />
        <StatCard label="Pending Approvals" value={String(pendingDeals)} icon={Clock} />
        <StatCard label="Est. Earnings" value={formatCurrency(earnings)} icon={DollarSign} trend="+12% vs last month" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Complete profile", desc: "Add your portfolio and rates to attract more brands.", href: "/app/creator/profile", icon: User },
          { label: "View insights", desc: "See how your content is performing across platforms.", href: "/app/creator/insights", icon: BarChart3 },
          { label: "Share public profile", desc: "Send your media kit link to potential brand partners.", href: `/c/${creatorRecord?.handle || user?.handle}`, icon: Share2 },
        ].map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
              <a.icon className="w-5 h-5 text-brand" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">{a.label}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{a.desc}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 shrink-0 mt-1" />
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold">Deals Pipeline</h2>
          <Link href="/app/creator/deals" className="text-sm text-brand font-medium hover:underline">
            View all
          </Link>
        </div>
        {myDeals.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No deals yet. Brand invites will appear here.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-gray-500">
                  <th className="py-3 font-medium">Brand</th>
                  <th className="py-3 font-medium">Campaign</th>
                  <th className="py-3 font-medium">Status</th>
                  <th className="py-3 font-medium">Budget</th>
                  <th className="py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {myDeals.map((d) => (
                  <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 font-medium">{d.brandName}</td>
                    <td className="py-3 text-gray-500">{d.campaign}</td>
                    <td className="py-3">
                      <TagPill label={d.status} type="status" />
                    </td>
                    <td className="py-3 font-medium">{formatCurrency(d.budget)}</td>
                    <td className="py-3 text-gray-400">{d.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
