import { Progress } from "../ui/progress";

interface CampaignDetailsProps {
  title: string;
  goals: string;
  budget: {
    spent: number;
    total: number;
  };
}

export function CampaignDetails({ title, goals, budget }: CampaignDetailsProps) {
  const purseRemaining = budget.total - budget.spent;
  const progressPercentage = (budget.spent / budget.total) * 100;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-slate-900">
        Campaign Details
      </h2>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Title
          </label>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900">
            {title}
          </div>
        </div>

        {/* Goals */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Goals
          </label>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900">
            {goals}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Budget
          </label>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-slate-600">
                ${budget.spent.toLocaleString()} / ${budget.total.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {progressPercentage.toFixed(0)}%
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="mt-3 text-sm text-slate-600">
              Purse Remaining:{" "}
              <span className="font-semibold text-slate-900">
                ${purseRemaining.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
