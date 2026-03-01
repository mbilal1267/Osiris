import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Users, Target, DollarSign, AlertCircle } from 'lucide-react';

interface AnalyticsCardProps {
  type: 'total' | 'score' | 'cost' | 'risk';
}

export function AnalyticsCard({ type }: AnalyticsCardProps) {
  const cardConfig: Record<string, any> = {
    total: {
      icon: Users,
      title: 'Total Shortlisted',
      value: '24',
      subtitle: 'Creators',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    score: {
      icon: Target,
      title: 'Average AI Match Score',
      value: '88%',
      subtitle: 'High compatibility',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      showProgress: true,
      progressValue: 88,
    },
    cost: {
      icon: DollarSign,
      title: 'Estimated Total Cost',
      value: '$12,400',
      subtitle: 'Campaign budget',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    risk: {
      icon: AlertCircle,
      title: 'Audience Overlap Risk',
      value: '15%',
      subtitle: 'Low Risk',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      showBadge: true,
      badgeVariant: 'success' as const,
    },
  };

  const config = cardConfig[type];
  const Icon = config.icon;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`${config.iconBg} ${config.iconColor} w-12 h-12 rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      <h3 className="text-sm font-medium text-slate-600 mb-2">{config.title}</h3>

      <div className="flex items-baseline gap-2 mb-2">
        <p className="text-3xl font-bold text-slate-900">{config.value}</p>
      </div>

      {config.showProgress && (
        <div className="mb-2">
          <Progress value={config.progressValue} className="h-2" />
        </div>
      )}

      {config.showBadge ? (
        <Badge
          variant={config.badgeVariant}
          className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
        >
          {config.subtitle}
        </Badge>
      ) : (
        <p className="text-sm text-slate-500">{config.subtitle}</p>
      )}
    </div>
  );
}
