'use client';

import React, { useState } from 'react';
import { Copy, ThumbsUp, ThumbsDown, RefreshCw, Check } from 'lucide-react';
import AICore from '@/components/AICore';
import type { Message } from './ChatInterface';

interface MessageThreadProps {
  messages: Message[];
  isTyping: boolean;
  onReaction: (id: string, type: 'like' | 'dislike') => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const CODE_SNIPPET = `interface CircuitBreakerState {
  status: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  failureCount: number;
  successCount: number;
  lastFailureTime: number | null;
  threshold: number;
  resetTimeout: number;
}

interface CircuitBreaker {
  state: CircuitBreakerState;
  execute<T>(fn: () => Promise<T>): Promise<T>;
  getState(): CircuitBreakerState;
  reset(): void;
  forceOpen(): void;
}

interface CircuitBreakerConfig {
  failureThreshold: number;
  successThreshold: number;
  resetTimeout: number;
  monitorInterval: number;
  onStateChange?: (from: string, to: string) => void;
}`;

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mt-3 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(6,182,212,0.15)' }}>
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(6,182,212,0.1)' }}
      >
        <span className="text-xs font-mono text-foreground-subtle uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium transition-all hover:scale-105"
          style={{ color: copied ? '#10B981' : '#94A3B8' }}
          aria-label={copied ? 'Copied to clipboard' : 'Copy code'}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre
        className="p-4 text-xs overflow-x-auto leading-relaxed"
        style={{
          background: 'rgba(0,0,0,0.3)',
          fontFamily: 'var(--font-mono)',
          color: '#06B6D4',
          margin: 0,
        }}
        aria-label={`${language} code block`}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(139,92,246,0.15))',
          border: '1px solid rgba(6,182,212,0.2)',
        }}
        aria-hidden="true"
      >
        <AICore state="thinking" size={28} />
      </div>
      <div
        className="flex items-center gap-1.5 px-4 py-3 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '18px 18px 18px 4px',
        }}
        aria-label="ALION is thinking"
        role="status"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={`dot-${i}`}
            className="w-2 h-2 rounded-full"
            style={{
              background: '#8B5CF6',animation: `waveformBounce ${0.6 + i * 0.15}s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function renderContent(content: string, isCode: boolean, codeLanguage?: string) {
  if (isCode) {
    return (
      <div>
        <p className="text-sm text-foreground leading-relaxed mb-1">Here&apos;s a TypeScript interface for a circuit breaker:</p>
        <CodeBlock code={CODE_SNIPPET} language={codeLanguage || 'typescript'} />
      </div>
    );
  }

  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={`part-${i}`} style={{ color: '#06B6D4', fontWeight: 600 }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={`part-${i}`}>{part}</span>;
      })}
    </p>
  );
}

export default function MessageThread({ messages, isTyping, onReaction, messagesEndRef }: MessageThreadProps) {
  const [hoveredMsg, setHoveredMsg] = useState<string | null>(null);

  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex items-start gap-3 group py-1 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          onMouseEnter={() => setHoveredMsg(msg.id)}
          onMouseLeave={() => setHoveredMsg(null)}
        >
          {/* Avatar */}
          {msg.role === 'ai' ? (
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
              style={{
                background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(139,92,246,0.15))',
                border: '1px solid rgba(6,182,212,0.2)',
              }}
              aria-hidden="true"
            >
              <AICore state="idle" size={28} />
            </div>
          ) : (
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold font-display"
              style={{
                background: 'linear-gradient(135deg, #06B6D4, #8B5CF6)',
                color: '#050816',
              }}
              aria-hidden="true"
            >
              MK
            </div>
          )}

          {/* Bubble */}
          <div className={`max-w-[72%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
            <div
              className={`px-4 py-3 ${msg.role === 'user' ? 'message-user' : 'message-ai'}`}
              style={{ maxWidth: '100%' }}
            >
              {renderContent(msg.content, !!msg.isCode, msg.codeLanguage)}
            </div>

            {/* Timestamp + actions */}
            <div
              className={`flex items-center gap-2 mt-1 px-1 transition-opacity duration-150 ${hoveredMsg === msg.id ? 'opacity-100' : 'opacity-0'}`}
              style={{ flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}
            >
              <span className="text-xs font-mono text-foreground-subtle tabular-nums">{msg.timestamp}</span>

              {msg.role === 'ai' && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onReaction(msg.id, 'like')}
                    className="w-6 h-6 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      background: msg.reactions?.like ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)',
                      color: msg.reactions?.like ? '#10B981' : '#64748B',
                      border: `1px solid ${msg.reactions?.like ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.06)'}`,
                    }}
                    aria-label="Like message"
                    aria-pressed={msg.reactions?.like}
                  >
                    <ThumbsUp size={11} />
                  </button>
                  <button
                    onClick={() => onReaction(msg.id, 'dislike')}
                    className="w-6 h-6 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    style={{
                      background: msg.reactions?.dislike ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
                      color: msg.reactions?.dislike ? '#EF4444' : '#64748B',
                      border: `1px solid ${msg.reactions?.dislike ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.06)'}`,
                    }}
                    aria-label="Dislike message"
                    aria-pressed={msg.reactions?.dislike}
                  >
                    <ThumbsDown size={11} />
                  </button>
                  <button
                    className="w-6 h-6 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: 'rgba(255,255,255,0.04)', color: '#64748B', border: '1px solid rgba(255,255,255,0.06)' }}
                    aria-label="Regenerate response"
                  >
                    <RefreshCw size={11} />
                  </button>
                  <button
                    className="w-6 h-6 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: 'rgba(255,255,255,0.04)', color: '#64748B', border: '1px solid rgba(255,255,255,0.06)' }}
                    aria-label="Copy message"
                    onClick={() => navigator.clipboard.writeText(msg.content)}
                  >
                    <Copy size={11} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}