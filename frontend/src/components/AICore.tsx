'use client';

import React from 'react';

export type AICoreState = 'idle' | 'listening' | 'thinking' | 'speaking';

interface AICoreProps {
  state?: AICoreState;
  size?: number;
  className?: string;
}

const STATE_COLORS: Record<AICoreState, { primary: string; secondary: string; glow: string }> = {
  idle: { primary: '#06B6D4', secondary: '#3B82F6', glow: 'rgba(6,182,212,0.5)' },
  listening: { primary: '#3B82F6', secondary: '#06B6D4', glow: 'rgba(59,130,246,0.6)' },
  thinking: { primary: '#8B5CF6', secondary: '#6366F1', glow: 'rgba(139,92,246,0.6)' },
  speaking: { primary: '#F8FAFC', secondary: '#06B6D4', glow: 'rgba(248,250,252,0.5)' },
};

export default function AICore({ state = 'idle', size = 200, className = '' }: AICoreProps) {
  const colors = STATE_COLORS[state];
  const center = size / 2;
  const sphereR = size * 0.22;
  const ring1R = size * 0.35;
  const ring2R = size * 0.42;
  const ring3R = size * 0.48;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`ALION AI Core — ${state}`}
    >
      {/* Outer glow rings (wave effect) */}
      {state === 'speaking' && (
        <>
          {[0, 0.4, 0.8].map((delay, i) => (
            <div
              key={`wave-${i}`}
              className="absolute rounded-full border"
              style={{
                width: size * 0.7,
                height: size * 0.7,
                borderColor: `${colors.primary}60`,
                animation: `wave 2s ease-out infinite`,
                animationDelay: `${delay}s`,
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </>
      )}

      {/* Listening ripples */}
      {state === 'listening' && (
        <>
          {[0, 0.6, 1.2].map((delay, i) => (
            <div
              key={`ripple-${i}`}
              className="absolute rounded-full border"
              style={{
                width: size * 0.65,
                height: size * 0.65,
                borderColor: `${colors.primary}50`,
                animation: `ripple 2s ease-out infinite`,
                animationDelay: `${delay}s`,
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </>
      )}

      {/* SVG Core */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: 'absolute', inset: 0 }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`sphere-grad-${state}`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="30%" stopColor={colors.primary} stopOpacity="0.9" />
            <stop offset="70%" stopColor={colors.secondary} stopOpacity="0.8" />
            <stop offset="100%" stopColor="#050816" stopOpacity="0.6" />
          </radialGradient>
          <radialGradient id={`glow-grad-${state}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.3" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </radialGradient>
          <filter id={`blur-glow-${state}`}>
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Glow halo */}
        <circle
          cx={center}
          cy={center}
          r={sphereR * 2}
          fill={`url(#glow-grad-${state})`}
          style={{ animation: 'breathe 3s ease-in-out infinite' }}
        />

        {/* Orbital ring 1 */}
        <ellipse
          cx={center}
          cy={center}
          rx={ring1R}
          ry={ring1R * 0.25}
          fill="none"
          stroke={colors.primary}
          strokeWidth="1.5"
          strokeOpacity="0.6"
          style={{
            transformOrigin: `${center}px ${center}px`,
            animation: 'orbit1 8s linear infinite',
            willChange: 'transform',
          }}
        />

        {/* Orbital ring 2 */}
        <ellipse
          cx={center}
          cy={center}
          rx={ring2R}
          ry={ring2R * 0.3}
          fill="none"
          stroke={colors.secondary}
          strokeWidth="1.2"
          strokeOpacity="0.5"
          style={{
            transformOrigin: `${center}px ${center}px`,
            animation: 'orbit2 12s linear infinite reverse',
            willChange: 'transform',
          }}
        />

        {/* Orbital ring 3 */}
        <ellipse
          cx={center}
          cy={center}
          rx={ring3R}
          ry={ring3R * 0.15}
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="1"
          strokeOpacity="0.4"
          style={{
            transformOrigin: `${center}px ${center}px`,
            animation: 'orbit3 16s linear infinite',
            willChange: 'transform',
          }}
        />

        {/* Central sphere */}
        <circle
          cx={center}
          cy={center}
          r={sphereR}
          fill={`url(#sphere-grad-${state})`}
          style={{
            animation: 'breathe 3s ease-in-out infinite',
            willChange: 'transform',
            filter: `drop-shadow(0 0 ${size * 0.05}px ${colors.primary})`,
          }}
        />

        {/* Orbiting particles */}
        {[0, 90, 180, 270].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const px = center + ring2R * Math.cos(rad);
          const py = center + ring2R * 0.3 * Math.sin(rad);
          return (
            <circle
              key={`particle-${i}`}
              cx={px}
              cy={py}
              r={size * 0.018}
              fill={i % 2 === 0 ? colors.primary : colors.secondary}
              opacity="0.9"
              style={{
                filter: `drop-shadow(0 0 4px ${i % 2 === 0 ? colors.primary : colors.secondary})`,
                transformOrigin: `${center}px ${center}px`,
                animation: `orbit2 ${8 + i * 2}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
                willChange: 'transform',
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}