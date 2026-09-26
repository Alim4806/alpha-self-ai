'use client';

import React, { useState } from 'react';
import { Search, Plus, MessageSquare } from 'lucide-react';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  time: string;
  model: string;
  active?: boolean;
}

const CONVERSATIONS: Conversation[] = [
  { id: 'conv-001', title: 'Architecture Review Prep', lastMessage: 'Add this to my memory...', time: '12:10', model: 'GPT-4o', active: true },
  { id: 'conv-002', title: 'Q3 Roadmap Analysis', lastMessage: 'Here are the key initiatives...', time: 'Yesterday', model: 'GPT-4o' },
  { id: 'conv-003', title: 'Python async patterns', lastMessage: 'asyncio.gather vs TaskGroup...', time: 'Jul 13', model: 'GPT-4o' },
  { id: 'conv-004', title: 'Marketing copy review', lastMessage: 'The headline could be stronger...', time: 'Jul 12', model: 'GPT-3.5' },
  { id: 'conv-005', title: 'Database optimization', lastMessage: 'Index on user_id + created_at...', time: 'Jul 11', model: 'GPT-4o' },
  { id: 'conv-006', title: 'React 19 features', lastMessage: 'Server components change...', time: 'Jul 10', model: 'GPT-4o' },
  { id: 'conv-007', title: 'Team feedback synthesis', lastMessage: 'Three recurring themes...', time: 'Jul 9', model: 'GPT-4o' },
  { id: 'conv-008', title: 'Kafka consumer groups', lastMessage: 'Partition assignment strategy...', time: 'Jul 8', model: 'GPT-4o' },
];

interface ConversationSidebarProps {
  open: boolean;
  onToggle: () => void;
}

export default function ConversationSidebar({ open, onToggle }: ConversationSidebarProps) {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState('conv-001');

  const filtered = CONVERSATIONS.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="flex flex-col flex-shrink-0 transition-all duration-300"
      style={{
        width: open ? '260px' : '0px',
        overflow: 'hidden',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(11,17,32,0.5)',
      }}
    >
      <div style={{ minWidth: '260px' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <span className="font-display font-600 text-sm text-foreground">Conversations</span>
          <button
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-105"
            style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', color: '#06B6D4' }}
            aria-label="New conversation"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Search */}
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <Search size={12} className="text-foreground-subtle flex-shrink-0" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-xs text-foreground placeholder-foreground-subtle outline-none"
              aria-label="Search conversations"
            />
          </div>
        </div>

        {/* List */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <MessageSquare size={24} className="mx-auto mb-2 text-foreground-subtle" aria-hidden="true" />
              <p className="text-xs text-foreground-subtle">No conversations found</p>
            </div>
          ) : (
            filtered.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActive(conv.id)}
                className="w-full text-left px-3 py-2.5 mx-0 transition-all duration-150"
                style={{
                  background: active === conv.id ? 'rgba(6,182,212,0.08)' : 'transparent',
                  borderLeft: active === conv.id ? '2px solid #06B6D4' : '2px solid transparent',
                }}
                aria-current={active === conv.id ? 'true' : undefined}
                aria-label={`Conversation: ${conv.title}`}
              >
                <div className="flex items-start gap-2.5">
                  <MessageSquare
                    size={13}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: active === conv.id ? '#06B6D4' : '#64748B' }}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <div
                      className="text-xs font-medium truncate"
                      style={{ color: active === conv.id ? '#F8FAFC' : '#94A3B8' }}
                    >
                      {conv.title}
                    </div>
                    <div className="text-xs text-foreground-subtle truncate mt-0.5">
                      {conv.lastMessage}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className="text-xs font-mono"
                        style={{ fontSize: '9px', color: '#64748B' }}
                      >
                        {conv.model}
                      </span>
                      <span className="text-foreground-subtle" style={{ fontSize: '9px' }}>·</span>
                      <span className="text-foreground-subtle font-mono" style={{ fontSize: '9px' }}>
                        {conv.time}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}