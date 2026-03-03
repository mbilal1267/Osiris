import Link from "next/link";
import { MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { creators, deals } from "@/data/seed";
import { SocialMediaToolkit } from "@/components/social-analytics/SocialMediaToolkit";
import { formatCurrency, formatNumber, getInitials } from "@/lib/utils";

type CreatorProfileViewProps = {
  handle: string;
  inviteHref?: string;
};

export default function CreatorProfileView({ handle, inviteHref = "/auth" }: CreatorProfileViewProps) {
  const creator = creators.find((c) => c.handle === handle);
  if (!creator) {
    notFound();
  }

  const pastBrands = deals.filter((d) => d.creatorId === creator.id).map((d) => ({
    name: d.brandName,
    campaign: d.campaign,
    status: "Completed",
  }));

  if (pastBrands.length === 0) {
    pastBrands.push(
      { name: "TechNova", campaign: "SmartHub Pro Launch", status: "Completed" },
      { name: "Glow Labs", campaign: "Summer Glow Campaign", status: "Completed" },
    );
  }

  const portfolioPhotos = (creator as { portfolioPhotos?: string[] }).portfolioPhotos;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-brand to-brand-light" />
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-start gap-6 -mt-12">
            <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-brand text-3xl font-bold">
              {getInitials(creator.name)}
            </div>
            <div className="flex-1 pt-4">
              <h1 className="font-display text-3xl font-bold">{creator.name}</h1>
              <p className="text-gray-500">@{creator.handle}</p>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                <MapPin className="w-4 h-4" /> {creator.location}
              </div>
            </div>
            <Link
              href={inviteHref}
              className="mt-4 sm:mt-6 bg-brand text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-dark transition-colors text-sm"
            >
              Invite to Collaborate
            </Link>
          </div>
          <p className="mt-6 text-gray-600 max-w-2xl">{creator.bio}</p>
          <SocialMediaToolkit />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#10B981]">98%</p>
              <p className="text-xs text-gray-500">Reliability Score</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-lg mb-3">Niches</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              {creator.niches.map((n, i) => (
                <div
                  key={n}
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 ${i === 0 ? "bg-brand/10 text-brand" : "bg-gray-50 text-gray-700 border border-gray-100"}`}
                >
                  <span className="text-sm font-semibold uppercase tracking-wider opacity-70">
                    {i === 0 ? "Primary:" : "Secondary:"}
                  </span>
                  <span className="font-medium">{n}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-lg mb-3">Rate Card</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(creator.rates)
                .filter(([_, value]) => value > 0)
                .map(([type, rate]) => (
                  <div key={type} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-sm capitalize">{type}</span>
                    <span className="font-bold">{formatCurrency(rate)}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-lg mb-3">Social Platforms</h2>
            <div className="flex gap-3 flex-wrap">
              {Object.entries(creator.platforms)
                .filter(([_, value]) => value)
                .map(([platform, platformHandle]) => (
                  <div key={platform} className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 text-sm">
                    <span className="capitalize font-medium">{platform}</span>
                    <span className="text-gray-500">{platformHandle}</span>
                  </div>
                ))}
            </div>
          </div>

          {pastBrands.length > 0 && (
            <div className="mt-8">
              <h2 className="font-bold text-lg mb-3">Previous History (Brands)</h2>
              <div className="space-y-3">
                {pastBrands.map((brand, i) => (
                  <div key={`${brand.name}-${brand.campaign}-${i}`} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center text-brand font-bold">{i + 1}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{brand.name}</p>
                      <p className="text-xs text-gray-500">{brand.campaign}</p>
                    </div>
                    <span className="text-sm font-medium text-green-600">{brand.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {creator.topContent.length > 0 && (
            <div className="mt-8">
              <h2 className="font-bold text-lg mb-3">Top Content</h2>
              <div className="space-y-3">
                {creator.topContent.map((content, i) => (
                  <div key={`${content.title}-${i}`} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center text-brand font-bold">{i + 1}</div>
                    <div className="flex-1">
                      <p className="font-medium">{content.title}</p>
                      <p className="text-xs text-gray-400">{formatNumber(content.views)} views</p>
                    </div>
                    <span className="text-sm font-medium text-green-600">{content.engagement}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {portfolioPhotos && portfolioPhotos.length > 0 && (
            <div className="mt-8">
              <h2 className="font-bold text-lg mb-3">Portfolio Photos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {portfolioPhotos.map((photo, i) => (
                  <div
                    key={`${photo}-${i}`}
                    className="aspect-square rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover rounded-xl" />
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
