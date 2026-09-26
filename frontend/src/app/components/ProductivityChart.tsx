'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const DATA = [
  { day: 'Mon', score: 71, tasks: 5, conversations: 8 },
  { day: 'Tue', score: 65, tasks: 3, conversations: 6 },
  { day: 'Wed', score: 78, tasks: 8, conversations: 12 },
  { day: 'Thu', score: 82, tasks: 7, conversations: 9 },
  { day: 'Fri', score: 74, tasks: 6, conversations: 7 },
  { day: 'Sat', score: 58, tasks: 2, conversations: 4 },
  { day: 'Sun', score: 84, tasks: 9, conversations: 14 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: 'rgba(11,17,32,0.97)',
        border: '1px solid rgba(6,182,212,0.2)',
        borderRadius: '12px',
        padding: '10px 14px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      <div className="font-display font-600 text-xs text-foreground-muted mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={`tt-${p.dataKey}`} className="flex items-center gap-2 text-xs tabular-nums">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-foreground-muted capitalize">{p.name}:</span>
          <span className="font-mono text-foreground font-600">{p.value}{p.dataKey === 'score' ? '%' : ''}</span>
        </div>
      ))}
    </div>
  );
}

export default function ProductivityChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="grad-score" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="grad-tasks" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
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
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="score"
          name="score"
          stroke="#06B6D4"
          strokeWidth={2}
          fill="url(#grad-score)"
        />
        <Area
          type="monotone"
          dataKey="tasks"
          name="tasks"
          stroke="#8B5CF6"
          strokeWidth={1.5}
          fill="url(#grad-tasks)"
          strokeDasharray="4 2"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}