'use client';

import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import {
  MessageSquare,
  Brain,
  CheckSquare,
  Mic,
  Calendar,
  FileText,
  Clock,
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'chat' | 'memory' | 'task' | 'voice' | 'event' | 'pdf';
  title: string;
  description: string;
  time: string;
  status?: 'completed' | 'in-progress' | 'pending';
}

interface UpcomingEvent {
  id: string;
  title: string;
  time: string;
  duration: string;
  type: 'work' | 'personal' | 'ai';
  color: string;
}

const ACTIVITY: ActivityItem[] = [
  { id: 'act-001', type: 'chat', title: 'AI Chat — Architecture Review', description: 'Discussed microservices patterns for the new API gateway', time: '12 min ago', status: 'completed' },
  { id: 'act-002', type: 'memory', title: 'Memory indexed — React patterns', description: 'ALION stored 3 new code patterns from your session', time: '28 min ago', status: 'completed' },
  { id: 'act-003', type: 'task', title: 'Task completed — Q3 Roadmap', description: 'Marked Q3 Product Roadmap draft as complete', time: '1h ago', status: 'completed' },
  { id: 'act-004', type: 'voice', title: 'Voice session — Daily standup', description: 'Transcribed 4:32 voice session, 2 action items extracted', time: '2h ago', status: 'completed' },
  { id: 'act-005', type: 'event', title: 'Event created — Team Sync', description: 'Added recurring Wednesday sync to calendar', time: '3h ago', status: 'completed' },
  { id: 'act-006', type: 'pdf', title: 'PDF analyzed — Research paper', description: 'Extracted key findings from 42-page ML research paper', time: '5h ago', status: 'completed' },
];

const EVENTS: UpcomingEvent[] = [
  { id: 'evt-001', title: 'Product Review', time: '14:00', duration: '60 min', type: 'work', color: '#06B6D4' },
  { id: 'evt-002', title: 'ALION Memory Review', time: '15:30', duration: '30 min', type: 'ai', color: '#8B5CF6' },
  { id: 'evt-003', title: 'Evening Run', time: '18:00', duration: '45 min', type: 'personal', color: '#10B981' },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  chat: <MessageSquare size={14} />,
  memory: <Brain size={14} />,
  task: <CheckSquare size={14} />,
  voice: <Mic size={14} />,
  event: <Calendar size={14} />,
  pdf: <FileText size={14} />,
};

const TYPE_COLORS: Record<string, string> = {
  chat: '#06B6D4',
  memory: '#8B5CF6',
  task: '#10B981',
  voice: '#3B82F6',
  event: '#F59E0B',
  pdf: '#EF4444',
};

export default function DashboardActivity() {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4"
      aria-label="Activity and upcoming events"
    >
      {/* Recent Activity — spans 2 cols */}
      <div className="lg:col-span-2">
        <GlassCard className="p-5 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-600 text-sm text-foreground">Recent Activity</h3>
            <span className="text-xs text-foreground-subtle font-mono">Today</span>
          </div>
          <div className="space-y-1">
            {ACTIVITY.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-white/5 cursor-pointer group"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: `${TYPE_COLORS[item.type]}15`,
                    color: TYPE_COLORS[item.type],
                    border: `1px solid ${TYPE_COLORS[item.type]}25`,
                  }}
                  aria-hidden="true"
                >
                  {TYPE_ICONS[item.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-foreground-muted mt-0.5 truncate leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Clock size={10} className="text-foreground-subtle" aria-hidden="true" />
                  <span className="text-xs text-foreground-subtle font-mono whitespace-nowrap">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Upcoming Events — 1 col */}
      <div className="lg:col-span-1">
        <GlassCard className="p-5 h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-600 text-sm text-foreground">Upcoming Today</h3>
            <span className="text-xs text-foreground-subtle font-mono">Jul 15</span>
          </div>
          <div className="space-y-3">
            {EVENTS.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-white/5 cursor-pointer"
                style={{
                  background: `${event.color}08`,
                  border: `1px solid ${event.color}20`,
                }}
              >
                <div
                  className="w-1 rounded-full flex-shrink-0 self-stretch"
                  style={{ background: event.color, minHeight: '40px' }}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-foreground truncate">{event.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono tabular-nums" style={{ color: event.color }}>
                      {event.time}
                    </span>
                    <span className="text-xs text-foreground-subtle">·</span>
                    <span className="text-xs text-foreground-subtle">{event.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Motivation quote */}
          <div
            className="mt-4 p-3 rounded-xl"
            style={{
              background: 'rgba(6,182,212,0.04)',
              border: '1px solid rgba(6,182,212,0.1)',
            }}
          >
            <div className="text-xs text-foreground-subtle mb-1 uppercase tracking-wider font-mono">Daily Insight</div>
            <p className="text-xs text-foreground-muted leading-relaxed italic">
              "Your most productive window is 09:00–11:30. ALION has scheduled deep work blocks accordingly."
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}