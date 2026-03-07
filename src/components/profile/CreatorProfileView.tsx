"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MapPin, Loader2 } from "lucide-react";
import { SocialMediaToolkit } from "@/components/social-analytics/SocialMediaToolkit";
import { formatCurrency, formatNumber, getInitials } from "@/lib/utils";

type CreatorProfileViewProps = {
  handle: string;
  inviteHref?: string;
  isPreview?: boolean;
};

export default function CreatorProfileView({ handle, inviteHref = "/auth", isPreview = false }: CreatorProfileViewProps) {
  const [creator, setCreator] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const endpoint = isPreview ? "/api/me" : `/api/creators/${handle}`;
        const response = await axios.get(endpoint);
        if (response.data && !response.data.error) {
          const d = response.data;
          setCreator({
            id: d.id,
            name: d.name,
            handle: d.handle || handle,
            bio: d.bio,
            location: d.location,
            niches: [d.primaryNiche, d.secondaryNiche].filter(Boolean),
            platforms: {
              instagram: d.instagram || "",
              youtube: d.youtube || "",
              tiktok: d.tiktok || "",
            },
            rates: {
              reel: d.instagramReel || 0,
              short: d.ytShort || 0,
              story: d.instagramStory || 0,
              youtube: d.youtubeIntegration || 0,
            },
            portfolioPhotos: Array.isArray(d.portfolioPhotos)
              ? d.portfolioPhotos
              : (d.portfolioPhotos ? d.portfolioPhotos.split(",") : []),
            topContent: d.topContent || [],
            followers: d.followers || 0,
            engagement: d.engagement || 0,
            reliabilityScore: d.reliabilityScore || null,
            pastBrands: d.pastBrands || []
          });
        }
      } catch (err) {
        console.error("Failed to fetch creator", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [handle]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  if (!creator) {
    return <div className="text-center py-12">Creator not found</div>;
  }

  const pastBrands = creator.pastBrands || [];

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
              <h1 className="font-display text-3xl font-bold">{creator.name || "Creator Name"}</h1>
              <p className="text-gray-500">@{creator.handle}</p>
              {creator.location && (
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" /> {creator.location}
                </div>
              )}
            </div>
            <Link
              href={inviteHref}
              className="mt-4 sm:mt-6 bg-brand text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-dark transition-colors text-sm"
            >
              Invite to Collaborate
            </Link>
          </div>
          {creator.bio && <p className="mt-6 text-gray-600 max-w-2xl">{creator.bio}</p>}
          <SocialMediaToolkit creator={creator} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className={`text-2xl font-bold ${creator.reliabilityScore != null ? 'text-[#10B981]' : 'text-gray-400'}`}>
                {creator.reliabilityScore != null ? `${creator.reliabilityScore}%` : 'N/A'}
              </p>
              <p className="text-xs text-gray-500">Reliability Score</p>
            </div>
          </div>

          {creator.niches && creator.niches.length > 0 && (
            <div className="mt-8">
              <h2 className="font-bold text-lg mb-3">Niches</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                {creator.niches.map((n: string, i: number) => (
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
          )}

          <div className="mt-8">
            <h2 className="font-bold text-lg mb-3">Rate Card</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(creator.rates)
                .filter(([_, value]) => (value as number) > 0)
                .map(([type, rate]) => (
                  <div key={type} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-sm capitalize">{type}</span>
                    <span className="font-bold">{formatCurrency(rate as number)}</span>
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
                    <span className="text-gray-500">{platformHandle as string}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-lg mb-3">Previous History (Brands)</h2>
            {pastBrands.length > 0 ? (
              <div className="space-y-3">
                {pastBrands.map((brand: any, i: number) => (
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
            ) : (
              <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500">No brand collaborations yet.</p>
              </div>
            )}
          </div>

          {creator.topContent.length > 0 && (
            <div className="mt-8">
              <h2 className="font-bold text-lg mb-3">Top Content</h2>
              <div className="space-y-3">
                {creator.topContent.map((content: any, i: number) => (
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
