'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquare, Mic, Calendar, CheckSquare, Brain, FileText, Eye, Search, BarChart3, Settings, ChevronLeft, ChevronRight,  } from 'lucide-react';
import AICore from './AICore';


interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'nav-dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/' },
  { id: 'nav-chat', label: 'AI Chat', icon: <MessageSquare size={18} />, href: '/ai-chat', badge: 3 },
  { id: 'nav-voice', label: 'Voice Assistant', icon: <Mic size={18} />, href: '/voice-assistant' },
  { id: 'nav-planner', label: 'Planner', icon: <Calendar size={18} />, href: '/planner' },
  { id: 'nav-tasks', label: 'Tasks', icon: <CheckSquare size={18} />, href: '/tasks', badge: 7 },
  { id: 'nav-memory', label: 'Memory', icon: <Brain size={18} />, href: '/memory' },
  { id: 'nav-pdf', label: 'PDF Assistant', icon: <FileText size={18} />, href: '/pdf-assistant' },
  { id: 'nav-vision', label: 'Vision', icon: <Eye size={18} />, href: '/vision' },
  { id: 'nav-search', label: 'Internet Search', icon: <Search size={18} />, href: '/search' },
  { id: 'nav-analytics', label: 'Analytics', icon: <BarChart3 size={18} />, href: '/analytics' },
  { id: 'nav-settings', label: 'Settings', icon: <Settings size={18} />, href: '/settings' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-full flex flex-col transition-sidebar"
      style={{
        width: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
        zIndex: 50,
        background: 'rgba(11, 17, 32, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(6, 182, 212, 0.1)',
        boxShadow: '4px 0 24px rgba(0,0,0,0.4)',
      }}
      aria-label="ALION navigation sidebar"
    >
      {/* Brand */}
      <div
        className="flex items-center px-3 py-4 border-b"
        style={{ borderColor: 'rgba(6,182,212,0.1)', minHeight: 'var(--topbar-height)' }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex-shrink-0">
            <AICore state="idle" size={collapsed ? 36 : 44} />
          </div>
          {!collapsed && (
            <div className="min-w-0 overflow-hidden">
              <div className="font-display font-700 text-base text-gradient-cyan leading-tight truncate">
                ALION
              </div>
              <div className="text-xs text-foreground-subtle font-mono truncate">v2.5</div>
            </div>
          )}
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 space-y-0.5" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`nav-item group ${isActive ? 'active' : ''}`}
              aria-label={collapsed ? item.label : undefined}
              aria-current={isActive ? 'page' : undefined}
              title={collapsed ? item.label : undefined}
            >
              <span className="flex-shrink-0" aria-hidden="true">{item.icon}</span>
              {!collapsed && (
                <span className="flex-1 truncate text-sm">{item.label}</span>
              )}
              {!collapsed && item.badge && (
                <span
                  className="flex-shrink-0 text-xs font-mono tabular-nums px-1.5 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(6,182,212,0.15)',
                    color: '#06B6D4',
                    border: '1px solid rgba(6,182,212,0.3)',
                    fontSize: '10px',
                  }}
                >
                  {item.badge}
                </span>
              )}
              {collapsed && item.badge && (
                <span
                  className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs"
                  style={{ background: '#06B6D4', color: '#050816', fontSize: '9px', fontWeight: 700 }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* AI Status */}
      <div
        className="px-3 py-3 border-t"
        style={{ borderColor: 'rgba(6,182,212,0.1)' }}
      >
        <div className="flex items-center gap-2">
          <div className="status-dot-online flex-shrink-0" aria-label="AI status: online" />
          {!collapsed && (
            <div className="min-w-0 overflow-hidden">
              <div className="text-xs font-medium text-success truncate">Online</div>
              <div className="text-xs text-foreground-subtle font-mono truncate">GPT-4o · 42ms</div>
            </div>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center glow-btn"
        style={{
          background: 'rgba(11,17,32,0.95)',
          border: '1px solid rgba(6,182,212,0.4)',
          zIndex: 51,
        }}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} className="text-primary" /> : <ChevronLeft size={12} className="text-primary" />}
      </button>
    </aside>
  );
}