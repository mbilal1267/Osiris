interface MetricTileProps {
  label: string;
  value: string;
  sublabel?: string;
}

export function MetricTile({ label, value, sublabel }: MetricTileProps) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-4 flex flex-col gap-1">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="text-2xl font-semibold text-slate-900">{value}</span>
      {sublabel && <span className="text-xs text-slate-500">{sublabel}</span>}
    </div>
  );
}
