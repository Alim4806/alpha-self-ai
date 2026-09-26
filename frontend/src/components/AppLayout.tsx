'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BackgroundEffects from './BackgroundEffects';
import ParticleBackground from './ParticleBackground';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--background)' }}>
      {/* Background layers */}
      <ParticleBackground />
      <BackgroundEffects />

      {/* Navigation */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />
      <Topbar sidebarCollapsed={sidebarCollapsed} />

      {/* Main content */}
      <main
        className="relative transition-sidebar"
        style={{
          marginLeft: sidebarCollapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
          marginTop: 'var(--topbar-height)',
          minHeight: 'calc(100vh - var(--topbar-height))',
          zIndex: 10,
          padding: '24px 24px 40px',
        }}
        id="main-content"
        tabIndex={-1}
      >
        {children}
      </main>
    </div>
  );
}