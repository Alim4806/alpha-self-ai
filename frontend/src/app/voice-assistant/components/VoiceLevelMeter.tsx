'use client';

import React, { useEffect, useState } from 'react';
import type { VoiceSessionState } from './VoiceInterface';

interface VoiceLevelMeterProps {
  active: boolean;
  state: VoiceSessionState;
}

const BAR_COUNT = 20;

export default function VoiceLevelMeter({ active, state }: VoiceLevelMeterProps) {
  const [levels, setLevels] = useState<number[]>(Array.from({ length: BAR_COUNT }, () => 0.1));

  useEffect(() => {
    if (!active) {
      setLevels(Array.from({ length: BAR_COUNT }, () => 0.08));
      return;
    }

    // Backend integration point: replace with real Web Audio API AnalyserNode data
    const interval = setInterval(() => {
      setLevels(
        Array.from({ length: BAR_COUNT }, (_, i) => {
          const center = BAR_COUNT / 2;
          const distFromCenter = Math.abs(i - center) / center;
          const base = 0.2 + (1 - distFromCenter) * 0.5;
          const noise = (Math.sin(Date.now() * 0.003 + i * 0.8) + 1) / 2;
          return Math.max(0.08, Math.min(1, base * noise + 0.1));
        })
      );
    }, 80);

    return () => clearInterval(interval);
  }, [active]);

  const barColor = state === 'listening' ? '#3B82F6' : state === 'speaking' ? '#06B6D4' : '#8B5CF6';

  return (
    <div
      className="flex items-center justify-center gap-1"
      style={{ height: '48px' }}
      role="meter"
      aria-label={`Voice level meter — ${active ? 'active' : 'inactive'}`}
      aria-valuenow={active ? 50 : 0}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {levels.map((level, i) => (
        <div
          key={`bar-${i}`}
          className="rounded-full flex-shrink-0"
          style={{
            width: '3px',
            height: `${level * 44}px`,
            background: active
              ? `linear-gradient(to top, ${barColor}40, ${barColor})`
              : 'rgba(255,255,255,0.08)',
            boxShadow: active && level > 0.5 ? `0 0 6px ${barColor}60` : 'none',
            transition: 'height 0.08s ease, background 0.3s ease',
            willChange: 'height',
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}