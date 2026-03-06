"use client";
import { Eye, TrendingUp, ThumbsUp, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { KPICard } from '@/components/social-analytics/KPICard';
import { MetricTile } from '@/components/social-analytics/MetricTile';
import { PlatformSelector } from '@/components/social-analytics/PlatformSelector';

export function SocialMediaToolkit({ creator }: { creator?: any }) {
    // Fallback numbers if creator data is missing
    const followersText = creator?.followers ? (creator.followers >= 1000 ? (creator.followers / 1000).toFixed(1) + 'K' : String(creator.followers)) : "0";
    const engagementText = creator?.engagement ? `${creator.engagement}%` : "0%";
    const reachText = creator?.followers ? (creator.followers * 1.5 >= 1000 ? ((creator.followers * 1.5) / 1000).toFixed(1) + 'K' : String(Math.floor(creator.followers * 1.5))) : "0";
    // We remove generateSparklineData entirely so KPICard no longer shows fake lines
    const avgViews = creator?.views ? (creator.views >= 1000 ? (creator.views / 1000).toFixed(1) + 'K' : String(creator.views)) : "N/A";

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm mb-8 overflow-hidden">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Social Media Toolkit
                </h2>
                <PlatformSelector />
            </header>

            {/* Tabs */}
            <Tabs.Root defaultValue="kpi" className="w-full">
                <Tabs.List className="flex border-b border-[#E2E8F0] mb-8 overflow-x-auto">
                    <Tabs.Trigger
                        value="kpi"
                        className="flex-shrink-0 px-6 py-3 text-sm font-medium text-slate-600 border-b-2 border-transparent hover:text-slate-900 data-[state=active]:text-[#2563EB] data-[state=active]:border-[#2563EB] transition-colors whitespace-nowrap"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-200 data-[state=active]:bg-[#2563EB] text-slate-600 data-[state=active]:text-white flex items-center justify-center text-xs font-semibold">
                                1
                            </span>
                            Top KPI
                        </div>
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="growth"
                        className="flex-shrink-0 px-6 py-3 text-sm font-medium text-slate-600 border-b-2 border-transparent hover:text-slate-900 data-[state=active]:text-[#2563EB] data-[state=active]:border-[#2563EB] transition-colors whitespace-nowrap"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-200 data-[state=active]:bg-[#2563EB] text-slate-600 data-[state=active]:text-white flex items-center justify-center text-xs font-semibold">
                                2
                            </span>
                            Cost & Growth Metrics
                        </div>
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="reach"
                        className="flex-shrink-0 px-6 py-3 text-sm font-medium text-slate-600 border-b-2 border-transparent hover:text-slate-900 data-[state=active]:text-[#2563EB] data-[state=active]:border-[#2563EB] transition-colors whitespace-nowrap"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-200 data-[state=active]:bg-[#2563EB] text-slate-600 data-[state=active]:text-white flex items-center justify-center text-xs font-semibold">
                                3
                            </span>
                            Reach & Visibility
                        </div>
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="engagement"
                        className="flex-shrink-0 px-6 py-3 text-sm font-medium text-slate-600 border-b-2 border-transparent hover:text-slate-900 data-[state=active]:text-[#2563EB] data-[state=active]:border-[#2563EB] transition-colors whitespace-nowrap"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-200 data-[state=active]:bg-[#2563EB] text-slate-600 data-[state=active]:text-white flex items-center justify-center text-xs font-semibold">
                                4
                            </span>
                            Engagement Performance
                        </div>
                    </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="kpi">
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="w-6 h-6 text-slate-600" />
                            <h3 className="text-xl font-semibold text-slate-900">Top KPI</h3>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                            <KPICard title="Followers Growth" value={followersText} />
                            <KPICard title="Engagement Rate" value={engagementText} />
                            <KPICard title="Avg Views" value={avgViews} />
                            <KPICard title="Reliability Score" value={creator?.reliabilityScore ? `${creator.reliabilityScore}%` : "N/A"} />
                            <KPICard title="Top Country" value={creator?.location?.split(',')[0] || "Global"} />
                            <KPICard title="Brand Safety Score" value="N/A" />
                            <KPICard title="Followers Retention Rate" value="N/A" />
                            <KPICard title="Total Reach" value={reachText} />
                            <KPICard title="Profile Visits" value="N/A" />
                            <KPICard title="Save Rate" value="N/A" />
                        </div>
                    </section>
                </Tabs.Content>

                <Tabs.Content value="growth">
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="w-6 h-6 text-slate-600" />
                            <h3 className="text-xl font-semibold text-slate-900">Cost & Growth Metrics</h3>
                        </div>

                        <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden overflow-x-auto">
                            <div className="flex min-w-max divide-x divide-[#E2E8F0]">
                                <div className="p-6 text-center w-48 shrink-0">
                                    <p className="text-sm text-slate-600 mb-2">Total Followers</p>
                                    <p className="text-3xl font-bold text-slate-900">{followersText}</p>
                                </div>
                                <div className="p-6 text-center w-48 shrink-0">
                                    <p className="text-sm text-slate-600 mb-2">30-day Follows Growth</p>
                                    <p className="text-3xl font-bold text-gray-400">N/A</p>
                                </div>
                                <div className="p-6 text-center w-48 shrink-0">
                                    <p className="text-sm text-slate-600 mb-2">Net Follows Gain</p>
                                    <p className="text-3xl font-bold text-gray-400">N/A</p>
                                </div>
                                <div className="p-6 text-center w-48 shrink-0">
                                    <p className="text-sm text-slate-600 mb-2">Followers Retention Rate</p>
                                    <p className="text-3xl font-bold text-gray-400">N/A</p>
                                </div>
                                <div className="p-6 text-center w-48 shrink-0">
                                    <p className="text-sm text-slate-600 mb-2">Followers Growth Velocity</p>
                                    <p className="text-3xl font-bold text-gray-400">N/A</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Tabs.Content>

                <Tabs.Content value="reach">
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Eye className="w-6 h-6 text-slate-600" />
                            <h3 className="text-xl font-semibold text-slate-900">Reach & Visibility</h3>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                            <MetricTile label="Total Reach" value={reachText} sublabel="Est. monthly" />
                            <MetricTile label="Total Impressions" value="N/A" sublabel="Last 30 days" />
                            <MetricTile label="Avg Reach per Post" value="N/A" sublabel="Per post" />
                            <MetricTile label="Profile Visits" value="N/A" sublabel="Last 30 days" />
                            <MetricTile label="Discovery %" value="N/A" sublabel="Non-followers" />
                        </div>
                    </section>
                </Tabs.Content>

                <Tabs.Content value="engagement">
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <ThumbsUp className="w-6 h-6 text-slate-600" />
                            <h3 className="text-xl font-semibold text-slate-900">Engagement Performance</h3>
                        </div>

                        <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden overflow-x-auto">
                            <div className="flex min-w-max divide-x divide-[#E2E8F0]">
                                <div className="p-6 text-center w-48 shrink-0">
                                    <p className="text-sm text-slate-600 mb-2">Engagement Rate</p>
                                    <p className="text-3xl font-bold text-[#2563EB]">{engagementText}</p>
                                </div>
                                <div className="p-6 text-center w-40 shrink-0">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <ThumbsUp className="w-4 h-4 text-slate-600" />
                                        <p className="text-sm text-slate-600">Average Likes</p>
                                    </div>
                                    <p className="text-3xl font-bold text-gray-400">N/A</p>
                                </div>
                                <div className="p-6 text-center w-40 shrink-0">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <MessageCircle className="w-4 h-4 text-slate-600" />
                                        <p className="text-sm text-slate-600">Avg Comments</p>
                                    </div>
                                    <p className="text-3xl font-bold text-gray-400">N/A</p>
                                </div>
                                <div className="p-6 text-center w-40 shrink-0">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Bookmark className="w-4 h-4 text-slate-600" />
                                        <p className="text-sm text-slate-600">Avg Saves</p>
                                    </div>
                                    <p className="text-3xl font-bold text-gray-400">N/A</p>
                                </div>
                                <div className="p-6 text-center w-40 shrink-0">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Share2 className="w-4 h-4 text-slate-600" />
                                        <p className="text-sm text-slate-600">Avg Shares</p>
                                    </div>
                                    <p className="text-3xl font-bold text-gray-400">N/A</p>
                                </div>
                                <div className="p-6 text-center w-40 shrink-0">
                                    <p className="text-sm text-slate-600 mb-2">Share Rate</p>
                                    <p className="text-3xl font-bold text-gray-400">N/A</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    );
}
