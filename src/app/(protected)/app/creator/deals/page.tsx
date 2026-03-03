"use client";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth";
import { creators, deals } from "@/data/seed";
import { TagPill } from "@/components/UIComponents";
import { formatCurrency } from "@/lib/utils";

const STATUSES = ["all", "invited", "negotiating", "active", "delivered", "paid"];

export default function CreatorDeals() {
  const { user } = useAuthStore();
  const [filter, setFilter] = useState("all");

  // Resolve the creator record from the logged-in user's handle
  const creatorRecord = creators.find((c) => c.handle === user?.handle);
  const myDeals = deals.filter((d) => d.creatorId === creatorRecord?.id);
  const filtered = filter === "all" ? myDeals : myDeals.filter((d) => d.status === filter);

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-3xl font-bold">Deals Pipeline</h2>
        <p className="text-gray-500 mt-1">Track all your brand collaborations in one place.</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
              filter === s ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-left text-gray-500">
                <th className="px-6 py-3 font-medium">Brand</th>
                <th className="px-6 py-3 font-medium">Campaign</th>
                <th className="px-6 py-3 font-medium">Deliverables</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Budget</th>
                <th className="px-6 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium">{d.brandName}</td>
                  <td className="px-6 py-4 text-gray-500">{d.campaign}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{d.deliverables}</td>
                  <td className="px-6 py-4">
                    <TagPill label={d.status} type="status" />
                  </td>
                  <td className="px-6 py-4 font-medium">{formatCurrency(d.budget)}</td>
                  <td className="px-6 py-4 text-gray-400">{d.createdAt}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No deals matching this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
