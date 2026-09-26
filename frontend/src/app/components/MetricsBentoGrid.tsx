'use client';

import React, { useState, useEffect } from 'react';
import { CheckSquare, Brain, Zap, MessageSquare, Cpu, MemoryStick, TrendingUp, TrendingDown, AlertTriangle, Target, Activity,  } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

// Bento grid plan:
// 8 cards → grid-cols-4 → row1: hero(spans 2) + 2 regular; row2: 4 regular cards

interface MetricCardData {
  id: string;
  title: string;
  value: string;
  subValue?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'warning' | 'neutral';
  icon: React.ReactNode;
  accentColor: string;
  glowColor: string;
  isHero?: boolean;
  isAlert?: boolean;
  description?: string;
}

const METRICS: MetricCardData[] = [
  {
    id: 'metric-productivity',
    title: 'Productivity Score',
    value: '84%',
    subValue: '+6% vs yesterday',
    change: '+6%',
    changeType: 'positive',
    icon: <Target size={20} />,
    accentColor: '#06B6D4',
    glowColor: 'rgba(6,182,212,0.15)',
    isHero: true,
    description: 'Composite of task completion, focus time, and AI utilization',
  },
  {
    id: 'metric-tasks',
    title: 'Tasks Today',
    value: '7',
    subValue: '3 completed · 4 pending',
    changeType: 'warning',
    icon: <CheckSquare size={18} />,
    accentColor: '#F59E0B',
    glowColor: 'rgba(245,158,11,0.1)',
    isAlert: true,
    description: '4 tasks require attention',
  },
  {
    id: 'metric-memory',
    title: 'Memory Entries',
    value: '1,247',
    subValue: '+3 indexed today',
    change: '+3',
    changeType: 'positive',
    icon: <Brain size={18} />,
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139,92,246,0.1)',
  },
  {
    id: 'metric-conversations',
    title: 'Conversations',
    value: '18',
    subValue: '5 today · 13 this week',
    changeType: 'positive',
    icon: <MessageSquare size={18} />,
    accentColor: '#3B82F6',
    glowColor: 'rgba(59,130,246,0.1)',
  },
  {
    id: 'metric-tokens',
    title: 'Token Usage',
    value: '142K',
    subValue: '71% of daily limit',
    changeType: 'warning',
    icon: <Zap size={18} />,
    accentColor: '#F59E0B',
    glowColor: 'rgba(245,158,11,0.1)',
    isAlert: true,
  },
  {
    id: 'metric-cpu',
    title: 'System CPU',
    value: '34%',
    subValue: 'Normal load',
    changeType: 'positive',
    icon: <Cpu size={18} />,
    accentColor: '#10B981',
    glowColor: 'rgba(16,185,129,0.1)',
  },
  {
    id: 'metric-memory-ram',
    title: 'RAM Usage',
    value: '11.2 GB',
    subValue: 'of 32 GB · 35%',
    changeType: 'positive',
    icon: <MemoryStick size={18} />,
    accentColor: '#10B981',
    glowColor: 'rgba(16,185,129,0.1)',
  },
  {
    id: 'metric-response',
    title: 'Avg Response',
    value: '42ms',
    subValue: 'GPT-4o · Excellent',
    changeType: 'positive',
    icon: <Activity size={18} />,
    accentColor: '#06B6D4',
    glowColor: 'rgba(6,182,212,0.1)',
  },
];

function MetricCard({ metric, index }: { metric: MetricCardData; index: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  const changeIcon =
    metric.changeType === 'positive' ? (
      <TrendingUp size={12} aria-hidden="true" />
    ) : metric.changeType === 'negative' ? (
      <TrendingDown size={12} aria-hidden="true" />
    ) : metric.changeType === 'warning' ? (
      <AlertTriangle size={12} aria-hidden="true" />
    ) : null;

  const changeColorMap: Record<string, string> = {
    positive: '#10B981',
    negative: '#EF4444',
    warning: '#F59E0B',
    neutral: '#94A3B8',
  };

  const changeColor = metric.changeType ? changeColorMap[metric.changeType] : '#94A3B8';

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.4s ease ${index * 0.08}s, transform 0.4s ease ${index * 0.08}s`,
      }}
    >
      <GlassCard
        className="h-full p-4 lg:p-5"
        style={{
          background: metric.isHero
            ? `linear-gradient(135deg, ${metric.glowColor}, rgba(11,17,32,0.8))`
            : `rgba(255,255,255,${metric.isAlert ? '0.04' : '0.02'})`,
          border: `1px solid ${metric.isAlert ? 'rgba(245,158,11,0.25)' : metric.isHero ? `${metric.accentColor}30` : 'rgba(255,255,255,0.06)'}`,
          boxShadow: metric.isAlert ? '0 0 20px rgba(245,158,11,0.08)' : metric.isHero ? `0 0 40px ${metric.glowColor}` : '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${metric.glowColor}`,
              border: `1px solid ${metric.accentColor}30`,
              color: metric.accentColor,
            }}
            aria-hidden="true"
          >
            {metric.icon}
          </div>
          {changeIcon && (
            <div
              className="flex items-center gap-1 text-xs font-medium"
              style={{ color: changeColor }}
              aria-label={`Trend: ${metric.changeType}`}
            >
              {changeIcon}
              {metric.change && <span className="tabular-nums">{metric.change}</span>}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <div
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: '#64748B', letterSpacing: '0.06em' }}
          >
            {metric.title}
          </div>
          <div
            className="font-display font-700 tabular-nums leading-none"
            style={{
              fontSize: metric.isHero ? '2.5rem' : '1.75rem',
              color: metric.isHero ? metric.accentColor : '#F8FAFC',
              textShadow: metric.isHero ? `0 0 20px ${metric.accentColor}60` : 'none',
            }}
            aria-label={`${metric.title}: ${metric.value}`}
          >
            {metric.value}
          </div>
          {metric.subValue && (
            <div className="text-xs" style={{ color: changeColor || '#94A3B8' }}>
              {metric.subValue}
            </div>
          )}
          {metric.description && metric.isHero && (
            <p className="text-xs text-foreground-subtle mt-2 leading-relaxed">{metric.description}</p>
          )}
        </div>

        {/* Hero progress bar */}
        {metric.isHero && (
          <div className="mt-4">
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.06)' }}
              role="progressbar"
              aria-valuenow={84}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Productivity score progress"
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: '84%',
                  background: 'linear-gradient(90deg, #06B6D4, #3B82F6)',
                  boxShadow: '0 0 8px rgba(6,182,212,0.6)',
                  transition: 'width 1.5s ease',
                }}
              />
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}

export default function MetricsBentoGrid() {
  const heroMetric = METRICS[0];
  const rest = METRICS.slice(1);

  return (
    <section aria-label="Key metrics dashboard">
      {/* Row 1: hero spans 2 cols + 2 regular = 4 cols */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mb-4">
        <div className="md:col-span-2">
          <MetricCard metric={heroMetric} index={0} />
        </div>
        {rest.slice(0, 2).map((m, i) => (
          <MetricCard key={m.id} metric={m} index={i + 1} />
        ))}
      </div>

      {/* Row 2: 4 regular cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {rest.slice(2).map((m, i) => (
          <MetricCard key={m.id} metric={m} index={i + 3} />
        ))}
      </div>
    </section>
  );
}