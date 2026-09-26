'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'AI Chat', value: 65 },
  { name: 'Voice', value: 20 },
  { name: 'PDF', value: 10 },
  { name: 'Search', value: 5 },
];
const COLORS = ['#06B6D4', '#3B82F6', '#8B5CF6', '#F59E0B'];

export default function UsageBreakdown() {
  return (
    <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm h-72">
      <h3 className="text-sm font-medium text-white mb-2">Feature Usage</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie data={data} innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: '8px' }} />
          <Legend verticalAlign="bottom" height={20} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94A3B8' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}