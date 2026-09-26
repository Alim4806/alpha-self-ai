'use client';

import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Mic, Clock, FileText } from 'lucide-react';

interface VoiceSession {
  id: string;
  title: string;
  date: string;
  duration: string;
  messageCount: number;
  actionItems: number;
}

const SESSIONS: VoiceSession[] = [
  { id: 'vs-001', title: 'Daily standup', date: 'Today, 09:15', duration: '4:32', messageCount: 12, actionItems: 2 },
  { id: 'vs-002', title: 'Architecture discussion', date: 'Jul 14, 16:40', duration: '11:08', messageCount: 28, actionItems: 5 },
  { id: 'vs-003', title: 'Q3 planning review', date: 'Jul 13, 10:22', duration: '7:45', messageCount: 19, actionItems: 3 },
  { id: 'vs-004', title: 'Quick task capture', date: 'Jul 12, 08:30', duration: '1:12', messageCount: 4, actionItems: 1 },
  { id: 'vs-005', title: 'Research summary', date: 'Jul 11, 14:15', duration: '9:20', messageCount: 22, actionItems: 4 },
];

export default function VoiceSessionHistory() {
  return (
    <GlassCard className="flex flex-col flex-1" style={{ minHeight: 0 }}>
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="font-display font-600 text-xs text-foreground">Session History</span>
        <span className="text-xs font-mono text-foreground-subtle tabular-nums">{SESSIONS.length} sessions</span>
      </div>

      <div className="overflow-y-auto divide-y" style={{ divideColor: 'rgba(255,255,255,0.04)' }}>
        {SESSIONS.map((session) => (
          <button
            key={session.id}
            className="w-full text-left px-4 py-3 transition-all duration-150 hover:bg-white/5 group"
            aria-label={`Voice session: ${session.title}, ${session.date}`}
          >
            <div className="flex items-start gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.15)', color: '#06B6D4' }}
                aria-hidden="true"
              >
                <Mic size={12} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {session.title}
                </div>
                <div className="text-xs text-foreground-subtle mt-0.5">{session.date}</div>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1">
                    <Clock size={9} className="text-foreground-subtle" aria-hidden="true" />
                    <span className="text-xs font-mono tabular-nums text-foreground-subtle" style={{ fontSize: '10px' }}>
                      {session.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText size={9} className="text-foreground-subtle" aria-hidden="true" />
                    <span className="text-xs text-foreground-subtle" style={{ fontSize: '10px' }}>
                      {session.actionItems} actions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </GlassCard>
  );
}