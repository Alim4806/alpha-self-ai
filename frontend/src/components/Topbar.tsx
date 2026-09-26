'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Search, ChevronDown, Command } from 'lucide-react';



interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'notif-001', title: 'Memory indexed', message: 'ALION stored 3 new memories from today\'s chat', time: '2m ago', type: 'success', read: false },
  { id: 'notif-002', title: 'Task deadline', message: 'Q3 Report Review is due in 2 hours', time: '15m ago', type: 'warning', read: false },
  { id: 'notif-003', title: 'Voice session', message: 'Yesterday\'s voice session transcript is ready', time: '1h ago', type: 'info', read: true },
];

interface TopbarProps {
  sidebarCollapsed: boolean;
}

export default function Topbar({ sidebarCollapsed }: TopbarProps) {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
      setDate(
        now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const notifColors: Record<string, string> = {
    success: '#10B981',
    warning: '#F59E0B',
    info: '#06B6D4',
  };

  return (
    <header
      className="fixed top-0 right-0 flex items-center gap-4 px-6"
      style={{
        left: sidebarCollapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
        height: 'var(--topbar-height)',
        zIndex: 40,
        background: 'rgba(11, 17, 32, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(6, 182, 212, 0.08)',
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      role="banner"
    >
      {/* Search */}
      <div className="flex-1 max-w-lg relative">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200"
          style={{
            background: searchFocused ? 'rgba(6,182,212,0.05)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${searchFocused ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: searchFocused ? '0 0 20px rgba(6,182,212,0.1)' : 'none',
          }}
        >
          <Search size={14} className="text-foreground-subtle flex-shrink-0" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search ALION... ⌘K"
            className="flex-1 bg-transparent text-sm text-foreground placeholder-foreground-subtle outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            aria-label="Global search"
          />
          <div
            className="flex items-center gap-1 px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <Command size={10} className="text-foreground-subtle" aria-hidden="true" />
            <span className="text-foreground-subtle font-mono" style={{ fontSize: '10px' }}>K</span>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Live clock */}
        <div className="hidden lg:flex flex-col items-end">
          <span className="font-mono text-sm tabular-nums text-foreground" style={{ color: '#06B6D4' }}>
            {time}
          </span>
          <span className="text-xs text-foreground-subtle">{date}</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            aria-label={`Notifications — ${unreadCount} unread`}
            aria-expanded={showNotifications}
            aria-haspopup="true"
          >
            <Bell size={16} className="text-foreground-muted" />
            {unreadCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: '#EF4444', color: '#fff', fontSize: '9px' }}
                aria-label={`${unreadCount} unread notifications`}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              className="absolute right-0 top-12 w-80 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(11,17,32,0.97)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(6,182,212,0.15)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                zIndex: 100,
                animation: 'fadeInUp 0.15s ease-out',
              }}
              role="dialog"
              aria-label="Notifications panel"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <span className="font-display font-600 text-sm text-foreground">Notifications</span>
                <button onClick={markAllRead} className="text-xs text-primary hover:text-foreground transition-colors">
                  Mark all read
                </button>
              </div>
              <div className="divide-y" style={{ divideColor: 'rgba(255,255,255,0.04)' }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="flex gap-3 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                      style={{ background: notifColors[n.type], boxShadow: `0 0 6px ${notifColors[n.type]}` }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground truncate">{n.title}</span>
                        {!n.read && (
                          <span
                            className="text-xs px-1.5 rounded"
                            style={{ background: 'rgba(6,182,212,0.15)', color: '#06B6D4' }}
                          >
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-foreground-muted mt-0.5 leading-relaxed">{n.message}</p>
                      <span className="text-xs text-foreground-subtle mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User avatar */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            aria-label="User profile menu"
            aria-expanded={showProfile}
            aria-haspopup="true"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-display"
              style={{ background: 'linear-gradient(135deg, #06B6D4, #8B5CF6)', color: '#fff' }}
              aria-hidden="true"
            >
              MK
            </div>
            <span className="hidden md:block text-sm font-medium text-foreground-muted">Marcus K.</span>
            <ChevronDown size={12} className="text-foreground-subtle" aria-hidden="true" />
          </button>

          {showProfile && (
            <div
              className="absolute right-0 top-12 w-48 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(11,17,32,0.97)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                zIndex: 100,
                animation: 'fadeInUp 0.15s ease-out',
              }}
              role="menu"
              aria-label="User profile dropdown"
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="font-medium text-sm text-foreground">Marcus Klein</div>
                <div className="text-xs text-foreground-muted mt-0.5">marcus@alion.ai</div>
              </div>
              {['Profile', 'Settings', 'Help', 'Sign out'].map((item) => (
                <button
                  key={`profile-${item}`}
                  className="w-full text-left px-4 py-2.5 text-sm text-foreground-muted hover:text-foreground hover:bg-white/5 transition-colors"
                  role="menuitem"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Click outside handler overlay */}
      {(showNotifications || showProfile) && (
        <div
          className="fixed inset-0"
          style={{ zIndex: 99 }}
          onClick={() => { setShowNotifications(false); setShowProfile(false); }}
          aria-hidden="true"
        />
      )}
    </header>
  );
}