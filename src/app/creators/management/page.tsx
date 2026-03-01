import { TopNavigation } from "@/components/creator-management/TopNavigation";
import { ActionCard } from "@/components/creator-management/ActionCard";
import { TopCreatorsList } from "@/components/creator-management/TopCreatorsList";
import { AnalyticsCard } from "@/components/creator-management/AnalyticsCard";

export default function CreatorManagementPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Top Navigation */}
            <TopNavigation />

            {/* Main Content */}
            <main className="max-w-[1600px] mx-auto px-6 py-8">
                {/* Header Section */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Shortlisted Creators / Review, Create & Compose
                    </h1>
                </header>

                {/* Upper Control & Preview Area - Two Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Left Card - Actions */}
                    <ActionCard />

                    {/* Right Card - Top CreatorsList */}
                    <TopCreatorsList />
                </div>

                {/* Bottom Analytics Grid - 2x2 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnalyticsCard type="total" />
                    <AnalyticsCard type="score" />
                    <AnalyticsCard type="cost" />
                    <AnalyticsCard type="risk" />
                </div>
            </main>
        </div>
    );
}
