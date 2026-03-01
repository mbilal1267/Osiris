"use client";
import { Eye, TrendingUp, ThumbsUp, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { KPICard } from '@/components/social-analytics/KPICard';
import { MetricTile } from '@/components/social-analytics/MetricTile';
import { PlatformSelector } from '@/components/social-analytics/PlatformSelector';

const generateSparklineData = () =>
    Array.from({ length: 7 }, (_, i) => ({ value: Math.random() * 100 + 50 }));

export function SocialMediaToolkit() {
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
                            <KPICard title="Followers Growth" value="12.5K" trend="up" trendValue="+8.2%" sparklineData={generateSparklineData()} />
                            <KPICard title="Engagement Rate" value="4.8%" trend="up" trendValue="+2.1%" sparklineData={generateSparklineData()} />
                            <KPICard title="Avg Views" value="8.2K" trend="up" trendValue="+5.3%" sparklineData={generateSparklineData()} />
                            <KPICard title="Audience Quality Score" value="8.7/10" sparklineData={generateSparklineData()} />
                            <KPICard title="Top Country" value="USA" trend="up" trendValue="42%" />
                            <KPICard title="Brand Safety Score" value="9.2/10" sparklineData={generateSparklineData()} />
                            <KPICard title="Followers Retention Rate" value="92.4%" trend="up" trendValue="+1.8%" sparklineData={generateSparklineData()} />
                            <KPICard title="Total Reach" value="156K" trend="up" trendValue="+12%" sparklineData={generateSparklineData()} />
                            <KPICard title="Profile Visits" value="24.3K" trend="up" trendValue="+6.5%" sparklineData={generateSparklineData()} />
                            <KPICard title="Save Rate" value="3.2%" trend="up" trendValue="+0.9%" sparklineData={generateSparklineData()} />
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
                                    <p className="text-3xl font-bold text-slate-900">125.4K</p>
                                </div>
                                <div className="p-6 text-center w-48 shrink-0">
                                    <p className="text-sm text-slate-600 mb-2">30-day Follows Growth</p>
                                    <p className="text-3xl font-bold text-[#10B981]">+12.5%</p>
                                </div>
                                <div className="p-6 text-center w-48 shrink-0">
                                    <p className="text-sm text-slate-600 mb-2">Net Follows Gain</p>
                                    <p className="text-3xl font-bold text-slate-900">+8,234</p>
                                </div>
                                <div className="p-6 text-center w-48 shrink-0">
                                    <p className="text-sm text-slate-600 mb-2">Followers Retention Rate</p>
                                    <p className="text-3xl font-bold text-slate-900">92.4%</p>
                                </div>
                                <div className="p-6 text-center w-48 shrink-0">
                                    <p className="text-sm text-slate-600 mb-2">Followers Growth Velocity</p>
                                    <p className="text-3xl font-bold text-[#10B981]">↑ High</p>
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
                            <MetricTile label="Total Reach" value="156K" sublabel="Last 30 days" />
                            <MetricTile label="Total Impressions" value="324K" sublabel="Last 30 days" />
                            <MetricTile label="Avg Reach per Post" value="5.2K" sublabel="Per post" />
                            <MetricTile label="Profile Visits" value="24.3K" sublabel="Last 30 days" />
                            <MetricTile label="Discovery %" value="34.5%" sublabel="Non-followers" />
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
                                    <p className="text-3xl font-bold text-[#2563EB]">4.8%</p>
                                </div>
                                <div className="p-6 text-center w-40 shrink-0">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <ThumbsUp className="w-4 h-4 text-slate-600" />
                                        <p className="text-sm text-slate-600">Average Likes</p>
                                    </div>
                                    <p className="text-3xl font-bold text-slate-900">1,254</p>
                                </div>
                                <div className="p-6 text-center w-40 shrink-0">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <MessageCircle className="w-4 h-4 text-slate-600" />
                                        <p className="text-sm text-slate-600">Avg Comments</p>
                                    </div>
                                    <p className="text-3xl font-bold text-slate-900">87</p>
                                </div>
                                <div className="p-6 text-center w-40 shrink-0">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Bookmark className="w-4 h-4 text-slate-600" />
                                        <p className="text-sm text-slate-600">Avg Saves</p>
                                    </div>
                                    <p className="text-3xl font-bold text-slate-900">156</p>
                                </div>
                                <div className="p-6 text-center w-40 shrink-0">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Share2 className="w-4 h-4 text-slate-600" />
                                        <p className="text-sm text-slate-600">Avg Shares</p>
                                    </div>
                                    <p className="text-3xl font-bold text-slate-900">45</p>
                                </div>
                                <div className="p-6 text-center w-40 shrink-0">
                                    <p className="text-sm text-slate-600 mb-2">Share Rate</p>
                                    <p className="text-3xl font-bold text-slate-900">2.1%</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    );
}
