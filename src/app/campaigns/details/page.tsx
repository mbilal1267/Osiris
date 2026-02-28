"use client";
import { Navbar } from "@/components/campaign-details/navbar";
import { CampaignDetails } from "@/components/campaign-details/campaign-details";
import { CreatorsList } from "@/components/campaign-details/creators-list";
import { CampaignMetrics } from "@/components/campaign-details/campaign-metrics";

export default function CampaignDetailsPage() {
    // Mock data for the campaign
    const campaignData = {
        title: "Spring Fashion Collection 2026",
        goals: "Increase brand awareness and drive 50K website visits",
        budget: {
            spent: 35000,
            total: 50000,
        },
    };

    const creators = [
        { id: 1, name: "Sarah Johnson", type: "Macro" as const, views: 1250000 },
        { id: 2, name: "Mike Chen", type: "Micro" as const, views: 450000 },
        { id: 3, name: "Emma Davis", type: "Nano" as const, views: 85000 },
        { id: 4, name: "Alex Rivera", type: "Micro" as const, views: 320000 },
    ];

    const metrics = {
        views: 2105000,
        engagement: {
            value: 4.8,
            trend: 12,
        },
        comments: 15420,
        revenue: 127500,
    };

    const handleAddMore = () => {
        console.log("Add more creators clicked");
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="mx-auto max-w-7xl px-6 py-8">
                {/* Two Column Layout */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Left Column - Campaign Details */}
                    <CampaignDetails
                        title={campaignData.title}
                        goals={campaignData.goals}
                        budget={campaignData.budget}
                    />

                    {/* Right Column - Creators List */}
                    <CreatorsList creators={creators} onAddMore={handleAddMore} />
                </div>

                {/* Campaign Metrics Section */}
                <CampaignMetrics metrics={metrics} />
            </main>
        </div>
    );
}
