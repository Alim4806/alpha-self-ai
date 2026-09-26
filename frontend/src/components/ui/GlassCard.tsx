import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'blue' | 'none';
  noBorder?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
}

export default function GlassCard({
  children,
  className = '',
  glowColor = 'none',
  noBorder = false,
  style,
  onClick,
  as: Tag = 'div',
}: GlassCardProps) {
  const glowMap: Record<string, string> = {
    cyan: '0 0 30px rgba(6,182,212,0.12), 0 8px 32px rgba(0,0,0,0.4)',
    purple: '0 0 30px rgba(139,92,246,0.12), 0 8px 32px rgba(0,0,0,0.4)',
    blue: '0 0 30px rgba(59,130,246,0.12), 0 8px 32px rgba(0,0,0,0.4)',
    none: '0 8px 32px rgba(0,0,0,0.3)',
  };

  const TagComponent = Tag as React.ElementType;

  return (
    <TagComponent
      className={`glass-card ${className}`}
      style={{
        boxShadow: glowMap[glowColor],
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </TagComponent>
  );
}