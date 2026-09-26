'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const DATA = [
  { day: 'Mon', completed: 5, total: 7 },
  { day: 'Tue', completed: 3, total: 5 },
  { day: 'Wed', completed: 8, total: 8 },
  { day: 'Thu', completed: 7, total: 10 },
  { day: 'Fri', completed: 6, total: 9 },
  { day: 'Sat', completed: 2, total: 3 },
  { day: 'Sun', completed: 3, total: 7 },
];

const BAR_COLORS = ['#8B5CF6', '#6366F1', '#06B6D4', '#8B5CF6', '#6366F1', '#3B82F6', '#06B6D4'];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: 'rgba(11,17,32,0.97)',
        border: '1px solid rgba(139,92,246,0.2)',
        borderRadius: '10px',
        padding: '8px 12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      <div className="font-display text-xs text-foreground-muted mb-1">{label}</div>
      <div className="text-xs tabular-nums">
        <span className="text-foreground-muted">Completed: </span>
        <span className="font-mono font-600 text-secondary">{payload[0]?.value}</span>
        <span className="text-foreground-subtle"> / {payload[0]?.payload?.total}</span>
      </div>
    </div>
  );
}

export default function TasksBarChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={DATA} margin={{ top: 5, right: 5, left: -25, bottom: 0 }} barSize={18}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis
          dataKey="day"
          tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'var(--font-mono)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'var(--font-mono)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Bar dataKey="completed" radius={[4, 4, 0, 0]}>
          {DATA.map((entry, i) => (
            <Cell
              key={`bar-cell-${i}`}
              fill={BAR_COLORS[i % BAR_COLORS.length]}
              fillOpacity={0.85}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}