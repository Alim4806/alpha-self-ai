'use client';

import React, { useEffect, useRef, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import AICore from '@/components/AICore';
import type { TranscriptEntry, VoiceSessionState } from './VoiceInterface';

interface VoiceTranscriptProps {
  entries: TranscriptEntry[];
  state: VoiceSessionState;
}

function TypewriterText({ text, speed = 18 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed('');
    indexRef.current = 0;
    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}</span>;
}

export default function VoiceTranscript({ entries, state }: VoiceTranscriptProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [lastEntryId, setLastEntryId] = useState<string | null>(null);

  useEffect(() => {
    if (entries.length > 0) {
      const last = entries[entries.length - 1];
      setLastEntryId(last.id);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [entries]);

  return (
    <GlassCard className="flex flex-col" style={{ height: '420px' }}>
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="font-display font-600 text-xs text-foreground">Live Transcript</span>
        <div className="flex items-center gap-1.5">
          {state !== 'idle' && (
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#EF4444', animation: 'pulseGlow 1s ease-in-out infinite' }}
              aria-hidden="true"
            />
          )}
          <span className="text-xs font-mono text-foreground-subtle tabular-nums">
            {entries.length} entries
          </span>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto px-3 py-3 space-y-3"
        role="log"
        aria-label="Voice conversation transcript"
        aria-live="polite"
      >
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="mb-2 opacity-40">
              <AICore state="idle" size={48} />
            </div>
            <p className="text-xs text-foreground-subtle">No transcript yet. Start speaking to ALION.</p>
          </div>
        ) : (
          entries.map((entry) => {
            const isLatest = entry.id === lastEntryId;
            return (
              <div
                key={entry.id}
                className={`flex gap-2 ${entry.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                {entry.role === 'ai' ? (
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(139,92,246,0.15))',
                      border: '1px solid rgba(6,182,212,0.2)',
                    }}
                    aria-hidden="true"
                  >
                    <AICore state="idle" size={20} />
                  </div>
                ) : (
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold font-display"
                    style={{ background: 'linear-gradient(135deg, #06B6D4, #8B5CF6)', color: '#050816', fontSize: '8px' }}
                    aria-hidden="true"
                  >
                    MK
                  </div>
                )}

                {/* Bubble */}
                <div
                  className="max-w-[85%] px-3 py-2 rounded-2xl"
                  style={{
                    background: entry.role === 'user' ?'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(59,130,246,0.12))' :'rgba(255,255,255,0.03)',
                    border: `1px solid ${entry.role === 'user' ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: entry.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  }}
                >
                  <p className="text-xs text-foreground leading-relaxed">
                    {isLatest && entry.role === 'ai' ? (
                      <TypewriterText text={entry.text} />
                    ) : (
                      entry.text
                    )}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono text-foreground-subtle tabular-nums" style={{ fontSize: '9px' }}>
                      {entry.timestamp}
                    </span>
                    {entry.duration && (
                      <span className="text-xs font-mono" style={{ fontSize: '9px', color: '#8B5CF6' }}>
                        {entry.duration}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>
    </GlassCard>
  );
}