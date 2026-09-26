'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import GlassCard from '@/components/ui/GlassCard';

const ProductivityChart = dynamic(() => import('./ProductivityChart'), { ssr: false });
const TasksBarChart = dynamic(() => import('./TasksBarChart'), { ssr: false });

export default function DashboardCharts() {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4"
      aria-label="Analytics charts"
    >
      {/* Productivity trend — spans 2 cols */}
      <div className="lg:col-span-2">
        <GlassCard className="p-5 h-full" glowColor="cyan">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-600 text-sm text-foreground">Productivity Trend</h3>
              <p className="text-xs text-foreground-subtle mt-0.5">Last 7 days — composite score</p>
            </div>
            <div
              className="px-2 py-1 rounded-lg text-xs font-mono tabular-nums"
              style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              ↑ +12% week
            </div>
          </div>
          <ProductivityChart />
        </GlassCard>
      </div>

      {/* Tasks completed — 1 col */}
      <div className="lg:col-span-1">
        <GlassCard className="p-5 h-full" glowColor="purple">
          <div className="mb-4">
            <h3 className="font-display font-600 text-sm text-foreground">Tasks Completed</h3>
            <p className="text-xs text-foreground-subtle mt-0.5">Daily breakdown this week</p>
          </div>
          <TasksBarChart />
        </GlassCard>
      </div>
    </section>
  );
}