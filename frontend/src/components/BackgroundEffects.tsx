import React from 'react';

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      {/* Holographic grid */}
      <div
        className="absolute inset-0 holographic-grid opacity-60"
        style={{ animation: 'spinSlow 120s linear infinite', transformOrigin: 'center' }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, #06B6D4, transparent 70%)',
          top: '-100px',
          left: '-100px',
          animation: 'float 10s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl opacity-15"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, #8B5CF6, transparent 70%)',
          bottom: '10%',
          right: '-80px',
          animation: 'float 14s ease-in-out infinite reverse',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl opacity-10"
        style={{
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, #3B82F6, transparent 70%)',
          top: '40%',
          left: '40%',
          animation: 'float 18s ease-in-out infinite',
          animationDelay: '-5s',
          willChange: 'transform',
        }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5, 8, 22, 0.6) 100%)',
        }}
      />
    </div>
  );
}