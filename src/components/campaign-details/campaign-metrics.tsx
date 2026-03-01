import { Eye, TrendingUp, MessageCircle, DollarSign, ArrowUp } from "lucide-react";

export interface MetricData {
  views: number;
  engagement: {
    value: number;
    trend: number;
  };
  comments: number;
  revenue: number;
}

interface CampaignMetricsProps {
  metrics: MetricData;
}

export function CampaignMetrics({ metrics }: CampaignMetricsProps) {
  return (
    <div className="mt-8">
      <h2 className="mb-6 text-xl font-semibold text-slate-900">
        Campaign Metrics
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Views */}
        <div className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex size-12 items-center justify-center rounded-lg bg-blue-100">
              <Eye className="size-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900">
            {metrics.views.toLocaleString()}
          </div>
          <div className="mt-2 text-sm text-slate-600">Views</div>
        </div>

        {/* Engagement */}
        <div className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex size-12 items-center justify-center rounded-lg bg-green-100">
              <TrendingUp className="size-6 text-green-600" />
            </div>
            {metrics.engagement.trend > 0 && (
              <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1">
                <ArrowUp className="size-3 text-green-600" />
                <span className="text-xs font-medium text-green-600">
                  {metrics.engagement.trend}%
                </span>
              </div>
            )}
          </div>
          <div className="text-3xl font-bold text-slate-900">
            {metrics.engagement.value}%
          </div>
          <div className="mt-2 text-sm text-slate-600">Engagement</div>
        </div>

        {/* Comments */}
        <div className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex size-12 items-center justify-center rounded-lg bg-purple-100">
              <MessageCircle className="size-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900">
            {metrics.comments.toLocaleString()}
          </div>
          <div className="mt-2 text-sm text-slate-600">Comments</div>
        </div>

        {/* Revenue */}
        <div className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex size-12 items-center justify-center rounded-lg bg-orange-100">
              <DollarSign className="size-6 text-orange-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900">
            ${metrics.revenue.toLocaleString()}
          </div>
          <div className="mt-2 text-sm text-slate-600">Revenue</div>
        </div>
      </div>
    </div>
  );
}
