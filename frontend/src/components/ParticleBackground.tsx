'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

const COLORS = [
  'rgba(6, 182, 212,',
  'rgba(59, 130, 246,',
  'rgba(139, 92, 246,',
  'rgba(6, 182, 212,',
  'rgba(59, 130, 246,',
];

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const createParticle = (): Particle => {
      const maxLife = 120 + Math.floor(200 * (0.5 + 0.5 * Math.sin(Date.now() * 0.001)));
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(0.3 + Math.random() * 0.5),
        size: 1.5 + Math.random() * 2.5,
        opacity: 0.2 + Math.random() * 0.6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 0,
        maxLife,
      };
    };

    // Initialize particles
    for (let i = 0; i < 120; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      p.life = Math.floor(Math.random() * p.maxLife);
      particlesRef.current.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, idx) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const progress = p.life / p.maxLife;
        let alpha = p.opacity;
        if (progress < 0.1) alpha *= progress / 0.1;
        if (progress > 0.8) alpha *= (1 - progress) / 0.2;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.fill();

        if (p.life >= p.maxLife || p.y < -10) {
          particlesRef.current[idx] = createParticle();
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, willChange: 'transform' }}
      aria-hidden="true"
    />
  );
}