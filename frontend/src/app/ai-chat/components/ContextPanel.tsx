'use client';

import React from 'react';
import { Brain, FileText, Clock, ChevronRight } from 'lucide-react';

interface ContextRef {
  id: string;
  type: 'memory' | 'document' | 'conversation';
  title: string;
  excerpt: string;
  relevance: number;
  date: string;
}

const CONTEXT_REFS: ContextRef[] = [
  {
    id: 'ctx-001',
    type: 'memory',
    title: 'Microservices Patterns — July 8',
    excerpt: 'API Gateway, Circuit Breaker, Event-driven via Kafka, Service Mesh with Istio...',
    relevance: 97,
    date: 'Jul 8, 2026',
  },
  {
    id: 'ctx-002',
    type: 'memory',
    title: 'Tech Stack Preferences',
    excerpt: 'TypeScript-first, Kafka for async, Redis for caching, PostgreSQL primary DB...',
    relevance: 84,
    date: 'Jun 30, 2026',
  },
  {
    id: 'ctx-003',
    type: 'document',
    title: 'Architecture-Review-Q3.pdf',
    excerpt: 'System design proposals for the new API gateway migration project...',
    relevance: 79,
    date: 'Jul 14, 2026',
  },
  {
    id: 'ctx-004',
    type: 'conversation',
    title: 'Kafka Consumer Groups',
    excerpt: 'Partition assignment strategy, consumer group rebalancing, offset management...',
    relevance: 62,
    date: 'Jul 8, 2026',
  },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  memory: <Brain size={12} />,
  document: <FileText size={12} />,
  conversation: <Clock size={12} />,
};

const TYPE_COLORS: Record<string, string> = {
  memory: '#8B5CF6',
  document: '#06B6D4',
  conversation: '#3B82F6',
};

export default function ContextPanel() {
  return (
    <div
      className="w-64 flex-shrink-0 flex flex-col"
      style={{ borderLeft: '1px solid rgba(255,255,255,0.06)', background: 'rgba(11,17,32,0.4)' }}
      aria-label="Context references panel"
    >
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="font-display font-600 text-xs text-foreground">Context Active</span>
        <div
          className="px-2 py-0.5 rounded-full text-xs font-mono tabular-nums"
          style={{ background: 'rgba(6,182,212,0.1)', color: '#06B6D4', border: '1px solid rgba(6,182,212,0.2)' }}
        >
          {CONTEXT_REFS.length} refs
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {CONTEXT_REFS.map((ref) => (
          <div
            key={ref.id}
            className="p-3 rounded-xl cursor-pointer transition-all duration-150 hover:bg-white/5 group"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
            role="button"
            tabIndex={0}
            aria-label={`Context: ${ref.title}`}
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5">
                <span style={{ color: TYPE_COLORS[ref.type] }} aria-hidden="true">{TYPE_ICONS[ref.type]}</span>
                <span
                  className="text-xs font-medium leading-tight"
                  style={{ color: TYPE_COLORS[ref.type] }}
                >
                  {ref.type}
                </span>
              </div>
              <div
                className="text-xs font-mono tabular-nums"
                style={{ color: ref.relevance >= 90 ? '#10B981' : ref.relevance >= 70 ? '#F59E0B' : '#64748B' }}
                aria-label={`Relevance: ${ref.relevance}%`}
              >
                {ref.relevance}%
              </div>
            </div>
            <div className="text-xs font-medium text-foreground truncate mb-1">{ref.title}</div>
            <p className="text-xs text-foreground-subtle leading-relaxed line-clamp-2">{ref.excerpt}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-foreground-subtle font-mono" style={{ fontSize: '10px' }}>{ref.date}</span>
              <ChevronRight size={10} className="text-foreground-subtle opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </div>

            {/* Relevance bar */}
            <div
              className="h-0.5 rounded-full mt-2 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.06)' }}
              role="progressbar"
              aria-valuenow={ref.relevance}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${ref.relevance}%`,
                  background: ref.relevance >= 90
                    ? 'linear-gradient(90deg, #10B981, #06B6D4)'
                    : ref.relevance >= 70
                    ? 'linear-gradient(90deg, #F59E0B, #06B6D4)'
                    : '#64748B',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Model info footer */}
      <div
        className="px-4 py-3 flex-shrink-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="text-xs text-foreground-subtle font-mono space-y-1">
          <div className="flex justify-between">
            <span>Model</span>
            <span className="text-foreground-muted">GPT-4o</span>
          </div>
          <div className="flex justify-between">
            <span>Context</span>
            <span className="text-foreground-muted tabular-nums">8,241 / 128K</span>
          </div>
          <div className="flex justify-between">
            <span>Temp</span>
            <span className="text-foreground-muted tabular-nums">0.72</span>
          </div>
        </div>
      </div>
    </div>
  );
}