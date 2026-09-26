import React from 'react';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

const VARIANT_STYLES: Record<string, string> = {
  primary: 'text-background-secondary font-semibold',
  secondary: 'text-secondary font-medium',
  ghost: 'text-foreground-muted font-medium',
  danger: 'text-danger font-medium',
};

const VARIANT_BG: Record<string, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
    border: '1px solid rgba(6,182,212,0.6)',
    boxShadow: '0 0 20px rgba(6,182,212,0.3)',
    color: '#050816',
  },
  secondary: {
    background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.15))',
    border: '1px solid rgba(139,92,246,0.4)',
    boxShadow: '0 0 15px rgba(139,92,246,0.2)',
    color: '#8B5CF6',
  },
  ghost: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: 'none',
    color: '#94A3B8',
  },
  danger: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    boxShadow: '0 0 10px rgba(239,68,68,0.15)',
    color: '#EF4444',
  },
};

const SIZE_STYLES: Record<string, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2.5',
};

export default function GlowButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  ariaLabel,
}: GlowButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-display transition-all duration-200 ${SIZE_STYLES[size]} ${VARIANT_STYLES[variant]} ${className}`}
      style={{
        ...VARIANT_BG[variant],
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        willChange: 'transform',
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)';
          (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.15)';
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1)';
      }}
      onMouseDown={(e) => {
        if (!disabled && !loading) {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)';
        }
      }}
      onMouseUp={(e) => {
        if (!disabled && !loading) {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)';
        }
      }}
      aria-label={ariaLabel}
      aria-disabled={disabled || loading}
    >
      {loading ? (
        <span
          className="w-4 h-4 border-2 rounded-full animate-spin"
          style={{ borderColor: 'currentColor', borderTopColor: 'transparent' }}
          aria-hidden="true"
        />
      ) : (
        children
      )}
    </button>
  );
}