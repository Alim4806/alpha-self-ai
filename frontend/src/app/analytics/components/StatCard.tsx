import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export default function StatCard({ title, value, change, trend }: StatCardProps) {
  return (
    <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
      <div className="flex items-center gap-1 mt-1">
        {trend === 'up' ? (
          <ArrowUp size={14} className="text-emerald-400" />
        ) : (
          <ArrowDown size={14} className="text-red-400" />
        )}
        <span className={`text-xs ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
          {change}
        </span>
        <span className="text-xs text-gray-500 ml-1">vs last month</span>
      </div>
    </div>
  );
}