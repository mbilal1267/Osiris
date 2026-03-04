import Link from "next/link";
import { Globe } from "lucide-react";
import { notFound } from "next/navigation";
import { brands, campaigns } from "@/data/seed";
import { formatCurrency } from "@/lib/utils";

type BrandProfileViewProps = {
  slug: string;
  actionHref?: string;
};

export default function BrandProfileView({ slug, actionHref = "/auth" }: BrandProfileViewProps) {
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) {
    notFound();
  }

  const brandCampaigns = campaigns.filter((c) => c.brandId === brand.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-accent to-accent-dark" />
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-start gap-6 -mt-12">
            <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-brand">
              {brand.name[0]}
            </div>
            <div className="flex-1 pt-4">
              <h1 className="font-display text-3xl font-bold">{brand.name}</h1>
              <p className="text-gray-500">{brand.categories.join(" · ")}</p>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                <Globe className="w-4 h-4" /> {brand.website}
              </div>
            </div>
            <Link href={actionHref} className="mt-4 sm:mt-6 bg-brand text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-dark text-sm">
              Work With Us
            </Link>
          </div>
          <p className="mt-6 text-gray-600 max-w-2xl">{brand.description}</p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{brand.activeCampaigns}</p>
              <p className="text-xs text-gray-500">Active Campaigns</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{brand.markets.length}</p>
              <p className="text-xs text-gray-500">Markets</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">{formatCurrency(brand.totalSpend)}</p>
              <p className="text-xs text-gray-500">Total Spend</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-lg mb-3">Target Markets</h2>
            <div className="flex gap-2 flex-wrap">
              {brand.markets.map((market) => (
                <span key={market} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                  {market}
                </span>
              ))}
            </div>
          </div>

          {brandCampaigns.length > 0 && (
            <div className="mt-8">
              <h2 className="font-bold text-lg mb-3">Recent Campaigns</h2>
              <div className="space-y-3">
                {brandCampaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-xs text-gray-400">{campaign.timeline}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          campaign.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {campaign.status}
                      </span>
                      <span className="text-sm font-bold">{formatCurrency(campaign.budget)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
