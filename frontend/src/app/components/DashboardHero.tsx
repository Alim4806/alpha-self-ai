'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import AICore from '@/components/AICore';
import GlowButton from '@/components/ui/GlowButton';
import Link from 'next/link';

export default function DashboardHero() {
  const [greeting, setGreeting] = useState('');
  const [timeDisplay, setTimeDisplay] = useState('');
  const [dateDisplay, setDateDisplay] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const now = new Date();
      const h = now?.getHours();
      if (h < 12) setGreeting('Good morning');
      else if (h < 17) setGreeting('Good afternoon');
      else setGreeting('Good evening');

      const hStr = h?.toString()?.padStart(2, '0');
      const mStr = now?.getMinutes()?.toString()?.padStart(2, '0');
      const sStr = now?.getSeconds()?.toString()?.padStart(2, '0');
      setTimeDisplay(`${hStr}:${mStr}:${sStr}`);
      setDateDisplay(
        now?.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      );
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      className="relative rounded-2xl overflow-hidden p-6 lg:p-8"
      style={{
        background: 'linear-gradient(135deg, rgba(6,182,212,0.06) 0%, rgba(11,17,32,0.8) 50%, rgba(139,92,246,0.06) 100%)',
        border: '1px solid rgba(6,182,212,0.12)',
        boxShadow: '0 0 60px rgba(6,182,212,0.05), 0 20px 60px rgba(0,0,0,0.4)',
      }}
    >
      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px opacity-30 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, #06B6D4, transparent)',
          animation: 'scan 4s linear infinite',
          top: 0,
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        {/* AI Core */}
        <div className="flex-shrink-0 animate-float" aria-hidden="true">
          <AICore state="idle" size={120} />
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} className="text-primary" aria-hidden="true" />
            <span className="text-xs font-mono uppercase tracking-widest text-foreground-subtle">
              ALION v2.5 — Online
            </span>
          </div>
          <h1
            className="font-display font-700 text-2xl lg:text-3xl xl:text-4xl leading-tight mb-1"
            style={{ color: '#F8FAFC' }}
          >
            {mounted ? greeting : 'Good morning'},{' '}
            <span className="text-gradient-cyan">Marcus</span>
          </h1>
          <p className="text-foreground-muted text-sm lg:text-base leading-relaxed max-w-xl">
            Think. Learn. Assist. Evolve. — Your AI is ready. 7 tasks pending, 3 memories indexed today, productivity at{' '}
            <span style={{ color: '#10B981' }}>84%</span>.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Link href="/ai-chat">
              <GlowButton size="md" ariaLabel="Open AI Chat">
                <span>Ask ALION</span>
                <ArrowRight size={14} aria-hidden="true" />
              </GlowButton>
            </Link>
            <Link href="/voice-assistant">
              <GlowButton variant="secondary" size="md" ariaLabel="Open Voice Assistant">
                <span>Voice Mode</span>
              </GlowButton>
            </Link>
          </div>
        </div>

        {/* Live clock */}
        <div className="hidden xl:flex flex-col items-end flex-shrink-0">
          <div
            className="font-mono tabular-nums font-700"
            style={{ fontSize: '2.5rem', color: '#06B6D4', lineHeight: 1, textShadow: '0 0 20px rgba(6,182,212,0.5)' }}
            aria-live="polite"
            aria-label="Current time"
          >
            {mounted ? timeDisplay : '00:00:00'}
          </div>
          <div className="text-sm text-foreground-subtle mt-1 text-right">
            {mounted ? dateDisplay : 'Loading...'}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <div className="status-dot-online" aria-hidden="true" />
            <span className="text-xs text-success font-medium">All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}