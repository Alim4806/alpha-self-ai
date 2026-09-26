'use client';

import React from 'react';
import { Mic, MicOff, Square, Volume2 } from 'lucide-react';
import type { VoiceSessionState } from './VoiceInterface';

interface VoiceControlsProps {
  state: VoiceSessionState;
  isMuted: boolean;
  onMicPress: () => void;
  onStop: () => void;
  onMute: () => void;
}

export default function VoiceControls({ state, isMuted, onMicPress, onStop, onMute }: VoiceControlsProps) {
  const isActive = state !== 'idle';

  return (
    <div className="flex items-center justify-center gap-6 py-4">
      {/* Mute button */}
      <button
        onClick={onMute}
        className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: isMuted ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${isMuted ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.1)'}`,
          color: isMuted ? '#EF4444' : '#94A3B8',
          boxShadow: isMuted ? '0 0 15px rgba(239,68,68,0.15)' : 'none',
        }}
        aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
        aria-pressed={isMuted}
      >
        {isMuted ? <MicOff size={18} /> : <Volume2 size={18} />}
      </button>

      {/* Main microphone button */}
      <div className="relative">
        {/* Ripple layers when active */}
        {isActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            {[0, 0.4, 0.8].map((delay, i) => (
              <div
                key={`mic-ripple-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${88 + i * 24}px`,
                  height: `${88 + i * 24}px`,
                  border: `2px solid ${state === 'listening' ? 'rgba(59,130,246,0.35)' : 'rgba(6,182,212,0.3)'}`,
                  animation: 'ripple 2s ease-out infinite',
                  animationDelay: `${delay}s`,
                  willChange: 'transform, opacity',
                }}
              />
            ))}
          </div>
        )}

        <button
          onClick={onMicPress}
          className="relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 z-10"
          style={{
            background: isActive
              ? state === 'listening' ?'linear-gradient(135deg, #3B82F6, #06B6D4)'
                : state === 'thinking' ?'linear-gradient(135deg, #8B5CF6, #6366F1)' :'linear-gradient(135deg, #06B6D4, #3B82F6)' :'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.15))',
            border: isActive
              ? `2px solid ${state === 'listening' ? 'rgba(59,130,246,0.7)' : 'rgba(6,182,212,0.7)'}`
              : '2px solid rgba(6,182,212,0.4)',
            boxShadow: isActive
              ? `0 0 40px ${state === 'listening' ? 'rgba(59,130,246,0.5)' : 'rgba(6,182,212,0.5)'}, 0 0 80px ${state === 'listening' ? 'rgba(59,130,246,0.2)' : 'rgba(6,182,212,0.2)'}`
              : '0 0 20px rgba(6,182,212,0.2)',
            color: isActive ? '#050816' : '#06B6D4',
            willChange: 'transform',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
          onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.95)'; }}
          onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)'; }}
          aria-label={isActive ? 'Stop listening' : 'Start voice input'}
          aria-pressed={isActive}
        >
          <Mic size={28} />
        </button>
      </div>

      {/* Stop button */}
      <button
        onClick={onStop}
        disabled={!isActive}
        className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: isActive ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.02)',
          border: `1px solid ${isActive ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.06)'}`,
          color: isActive ? '#EF4444' : '#374151',
          cursor: isActive ? 'pointer' : 'not-allowed',
          opacity: isActive ? 1 : 0.4,
        }}
        aria-label="Stop voice session"
        aria-disabled={!isActive}
      >
        <Square size={16} />
      </button>
    </div>
  );
}