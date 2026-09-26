'use client';

import React, { useState, useEffect, useRef } from 'react';
import AICore, { AICoreState } from '@/components/AICore';
import VoiceControls from './VoiceControls';
import VoiceLevelMeter from './VoiceLevelMeter';
import VoiceTranscript from './VoiceTranscript';
import VoiceSessionHistory from './VoiceSessionHistory';
import GlassCard from '@/components/ui/GlassCard';

export type VoiceSessionState = 'idle' | 'listening' | 'thinking' | 'speaking';

export interface TranscriptEntry {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: string;
  duration?: string;
}

const MOCK_TRANSCRIPT: TranscriptEntry[] = [
  { id: 'tr-001', role: 'ai', text: "ALION is ready. How can I assist you today, Marcus?", timestamp: '12:01:04', duration: '3.2s' },
  { id: 'tr-002', role: 'user', text: "What's on my schedule for this afternoon?", timestamp: '12:01:18' },
  { id: 'tr-003', role: 'ai', text: "You have a Product Review meeting at 14:00 for 60 minutes, followed by an ALION Memory Review session at 15:30. I'd recommend preparing the Q3 metrics before the Product Review — shall I pull those now?", timestamp: '12:01:22', duration: '5.8s' },
  { id: 'tr-004', role: 'user', text: "Yes, and remind me about the circuit breaker patterns we discussed.", timestamp: '12:01:45' },
  { id: 'tr-005', role: 'ai', text: "Retrieving from memory... Found 'Circuit Breaker Patterns - July 2026'. Key points: API Gateway with Kong, Resilience4j for fault tolerance, Kafka for async event-driven communication. Redis recommended for state persistence with 30-second TTL. Want me to send this to your notes?", timestamp: '12:01:49', duration: '8.1s' },
];

const STATE_LABELS: Record<VoiceSessionState, string> = {
  idle: 'Ready',
  listening: 'Listening...',
  thinking: 'Processing...',
  speaking: 'Speaking...',
};

const STATE_COLORS: Record<VoiceSessionState, string> = {
  idle: '#94A3B8',
  listening: '#3B82F6',
  thinking: '#8B5CF6',
  speaking: '#06B6D4',
};

export default function VoiceInterface() {
  const [sessionState, setSessionState] = useState<VoiceSessionState>('idle');
  const [transcript, setTranscript] = useState<TranscriptEntry[]>(MOCK_TRANSCRIPT);
  const [isMuted, setIsMuted] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isSessionActive) {
      timerRef.current = setInterval(() => {
        setSessionTime((t) => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSessionActive]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const handleMicPress = () => {
    if (sessionState === 'idle') {
      setSessionState('listening');
      setIsSessionActive(true);

      // Simulate voice session flow
      setTimeout(() => setSessionState('thinking'), 3000);
      setTimeout(() => setSessionState('speaking'), 5000);
      setTimeout(() => {
        setSessionState('idle');
        // Backend integration point: replace with real Web Speech API + AI response stream
        const newEntry: TranscriptEntry = {
          id: `tr-${Date.now()}`,
          role: 'ai',
          text: "I've processed your request. Based on your current context and memory, here's what I found...",
          timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          duration: '4.2s',
        };
        setTranscript((prev) => [...prev, newEntry]);
      }, 8000);
    } else {
      setSessionState('idle');
    }
  };

  const handleStop = () => {
    setSessionState('idle');
    setIsSessionActive(false);
    setSessionTime(0);
  };

  const handleMute = () => setIsMuted((m) => !m);

  const coreState: AICoreState = sessionState === 'idle' ? 'idle' : sessionState;

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-4 2xl:grid-cols-4 gap-4 min-h-[calc(100vh-var(--topbar-height)-80px)]">

        {/* Main voice area — spans 3 cols */}
        <div className="xl:col-span-3 flex flex-col gap-4">

          {/* Status bar */}
          <div
            className="flex items-center justify-between px-5 py-3 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: STATE_COLORS[sessionState],
                  boxShadow: `0 0 8px ${STATE_COLORS[sessionState]}`,
                  animation: sessionState !== 'idle' ? 'pulseGlow 1.5s ease-in-out infinite' : 'none',
                }}
                aria-hidden="true"
              />
              <span
                className="font-display font-600 text-sm"
                style={{ color: STATE_COLORS[sessionState] }}
                aria-live="polite"
                aria-label={`Voice assistant status: ${STATE_LABELS[sessionState]}`}
              >
                {STATE_LABELS[sessionState]}
              </span>
              {isSessionActive && (
                <span className="font-mono tabular-nums text-xs text-foreground-subtle">
                  {formatTime(sessionTime)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-foreground-subtle font-mono">
              <span>Model: GPT-4o</span>
              <span>·</span>
              <span>Lang: EN-US</span>
              <span>·</span>
              <span style={{ color: isMuted ? '#EF4444' : '#10B981' }}>
                {isMuted ? 'Muted' : 'Active'}
              </span>
            </div>
          </div>

          {/* AI Core centerpiece */}
          <GlassCard
            className="flex-1 flex flex-col items-center justify-center py-10 relative overflow-hidden"
            glowColor={sessionState === 'idle' ? 'cyan' : sessionState === 'thinking' ? 'purple' : 'cyan'}
            style={{ minHeight: '360px' }}
          >
            {/* Background scan line */}
            <div
              className="absolute left-0 right-0 h-px pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent, ${STATE_COLORS[sessionState]}, transparent)`,
                opacity: sessionState !== 'idle' ? 0.4 : 0.15,
                animation: 'scan 4s linear infinite',
                top: 0,
              }}
              aria-hidden="true"
            />

            {/* Core */}
            <div
              className="relative"
              style={{ animation: sessionState === 'idle' ? 'float 6s ease-in-out infinite' : 'none' }}
            >
              <AICore
                state={coreState}
                size={280}
                className="relative z-10"
              />

              {/* Ripple rings when listening */}
              {sessionState === 'listening' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                  {[0, 0.5, 1.0].map((delay, i) => (
                    <div
                      key={`listen-ring-${i}`}
                      className="absolute rounded-full border"
                      style={{
                        width: `${320 + i * 60}px`,
                        height: `${320 + i * 60}px`,
                        borderColor: 'rgba(59,130,246,0.3)',
                        animation: `ripple 2.5s ease-out infinite`,
                        animationDelay: `${delay}s`,
                        willChange: 'transform, opacity',
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Speaking waves */}
              {sessionState === 'speaking' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                  {[0, 0.3, 0.6, 0.9].map((delay, i) => (
                    <div
                      key={`speak-wave-${i}`}
                      className="absolute rounded-full border"
                      style={{
                        width: `${300 + i * 50}px`,
                        height: `${300 + i * 50}px`,
                        borderColor: 'rgba(6,182,212,0.25)',
                        animation: `wave 2s ease-out infinite`,
                        animationDelay: `${delay}s`,
                        willChange: 'transform, opacity',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* State label under core */}
            <div className="mt-6 text-center">
              <div
                className="font-display font-600 text-lg"
                style={{ color: STATE_COLORS[sessionState] }}
                aria-live="polite"
              >
                {sessionState === 'idle' ? 'ALION' : STATE_LABELS[sessionState]}
              </div>
              <div className="text-sm text-foreground-subtle mt-1">
                {sessionState === 'idle' && 'Press and hold to speak'}
                {sessionState === 'listening' && 'Listening for your voice...'}
                {sessionState === 'thinking' && 'Processing with memory context...'}
                {sessionState === 'speaking' && 'Generating response...'}
              </div>
            </div>

            {/* Voice level meter */}
            <div className="mt-6 w-full max-w-sm px-8">
              <VoiceLevelMeter active={sessionState === 'listening' || sessionState === 'speaking'} state={sessionState} />
            </div>
          </GlassCard>

          {/* Controls */}
          <VoiceControls
            state={sessionState}
            isMuted={isMuted}
            onMicPress={handleMicPress}
            onStop={handleStop}
            onMute={handleMute}
          />
        </div>

        {/* Right panel — transcript + history */}
        <div className="xl:col-span-1 flex flex-col gap-4">
          <VoiceTranscript entries={transcript} state={sessionState} />
          <VoiceSessionHistory />
        </div>
      </div>
    </div>
  );
}