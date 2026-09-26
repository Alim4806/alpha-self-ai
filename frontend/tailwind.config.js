/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: {
          DEFAULT: 'var(--background)',
          secondary: 'var(--background-secondary)',
          tertiary: 'var(--background-tertiary)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          secondary: 'var(--surface-secondary)',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          muted: 'var(--foreground-muted)',
          subtle: 'var(--foreground-subtle)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          glow: 'var(--primary-glow)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        success: { DEFAULT: 'var(--success)' },
        warning: { DEFAULT: 'var(--warning)' },
        danger: { DEFAULT: 'var(--danger)' },
        border: { DEFAULT: 'var(--border)' },
        input: { DEFAULT: 'var(--input)' },
        ring: { DEFAULT: 'var(--ring)' },
        glass: {
          DEFAULT: 'var(--glass-bg)',
          hover: 'var(--glass-bg-hover)',
          border: 'var(--glass-border)',
        },
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'calc(var(--radius) - 8px)',
        md: 'calc(var(--radius) - 4px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.4), 0 0 60px rgba(6, 182, 212, 0.1)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.1)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'orbit-1': 'orbit1 8s linear infinite',
        'orbit-2': 'orbit2 12s linear infinite reverse',
        'orbit-3': 'orbit3 16s linear infinite',
        'wave': 'wave 2s ease-out infinite',
        'scan': 'scan 3s linear infinite',
        'ripple': 'ripple 2s ease-out infinite',
        'gradient-shift': 'gradientShift 4s ease infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'fade-in-up': 'fadeInUp 0.4s ease-out forwards',
        'spin-slow': 'spinSlow 20s linear infinite',
        'counter-spin': 'counterSpin 15s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)', opacity: '1' },
          '50%': { boxShadow: '0 0 40px rgba(6, 182, 212, 0.8)', opacity: '0.85' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.08)', opacity: '0.9' },
        },
        fadeInUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};