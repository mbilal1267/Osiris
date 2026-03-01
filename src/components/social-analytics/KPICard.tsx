import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface KPICardProps {
  title: string;
  value: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  sparklineData?: Array<{ value: number }>;
}

export function KPICard({ title, value, trend, trendValue, sparklineData }: KPICardProps) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <h3 className="text-sm text-slate-600">{title}</h3>
        {sparklineData && (
          <div className="w-16 h-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2563EB" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-semibold text-slate-900">{value}</span>
        {trend && trendValue && (
          <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-[#10B981]' : 'text-red-500'}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
}
