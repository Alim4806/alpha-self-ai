'use client';

import React, { useState, useRef, useEffect } from 'react';
import ConversationSidebar from './ConversationSidebar';
import MessageThread from './MessageThread';
import ContextPanel from './ContextPanel';
import ChatInputBar from './ChatInputBar';

export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
  isCode?: boolean;
  codeLanguage?: string;
  reactions?: { like: boolean; dislike: boolean };
  isStreaming?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  time: string;
  messageCount: number;
  model: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-001',
    role: 'ai',
    content: "Hello Marcus. I'm ALION — your Artificial Learning Intelligent Operations Network. I've reviewed your calendar and memory context for today. You have a Product Review at 14:00 and 4 pending tasks. How can I assist you right now?",
    timestamp: '12:01',
    reactions: { like: false, dislike: false },
  },
  {
    id: 'msg-002',
    role: 'user',
    content: "Can you summarize the microservices architecture patterns we discussed last week? I need to prep for the architecture review.",
    timestamp: '12:03',
    reactions: { like: false, dislike: false },
  },
  {
    id: 'msg-003',
    role: 'ai',
    content: "Based on your memory from July 8th, here's a concise summary of the patterns we covered:\n\n**1. API Gateway Pattern**\nCentralizes entry points, handles auth, rate limiting, and routing. Recommended Kong or AWS API Gateway for your stack.\n\n**2. Circuit Breaker**\nUsed Resilience4j for fault tolerance. Prevents cascade failures when downstream services are slow.\n\n**3. Event-Driven via Kafka**\nAsync communication between Order Service and Inventory Service. Reduces coupling significantly.\n\nShould I generate a diagram or prepare talking points for your 14:00 review?",
    timestamp: '12:03',
    reactions: { like: true, dislike: false },
  },
  {
    id: 'msg-004',
    role: 'user',
    content: "Yes, generate a TypeScript interface for a basic circuit breaker implementation.",
    timestamp: '12:05',
    reactions: { like: false, dislike: false },
  },
  {
    id: 'msg-005',
    role: 'ai',
    content: "Here's a TypeScript interface for a circuit breaker:",
    timestamp: '12:05',
    isCode: true,
    codeLanguage: 'typescript',
    reactions: { like: false, dislike: false },
  },
  {
    id: 'msg-006',
    role: 'user',
    content: "Perfect. What's the best way to handle state persistence across service restarts?",
    timestamp: '12:08',
    reactions: { like: false, dislike: false },
  },
  {
    id: 'msg-007',
    role: 'ai',
    content: "For circuit breaker state persistence across restarts, there are three main approaches depending on your requirements:\n\n**Redis-based State Store** — Best for distributed systems. Store state with TTL, works across multiple instances. Latency: ~1-2ms.\n\n**Database persistence** — Use PostgreSQL with a `circuit_breaker_state` table. Slower but durable. Good for audit trails.\n\n**In-memory with warm-up** — Accept cold start behavior. Circuit starts closed, warms up naturally. Simplest approach.\n\nGiven your Kafka + microservices stack, I'd recommend **Redis** with a 30-second state TTL. Want me to generate the Redis implementation?",
    timestamp: '12:09',
    reactions: { like: false, dislike: false },
  },
  {
    id: 'msg-008',
    role: 'user',
    content: "That makes sense. Add this to my memory as 'Circuit Breaker Patterns - July 2026'",
    timestamp: '12:10',
    reactions: { like: false, dislike: false },
  },
  {
    id: 'msg-009',
    role: 'ai',
    content: "✓ Memory saved — **\"Circuit Breaker Patterns - July 2026\"** has been indexed in your Knowledge Base under the *Engineering* category with importance level 4/5.\n\nI've also linked it to your existing memory entry from July 8th for full context continuity. Your memory database now has 1,248 entries.",
    timestamp: '12:10',
    reactions: { like: false, dislike: false },
  },
];

const CODE_CONTENT = `interface CircuitBreakerState {
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
  failureThreshold: number;    // e.g. 5 failures
  successThreshold: number;    // e.g. 2 successes in HALF_OPEN
  resetTimeout: number;        // ms before retry (e.g. 30000)
  monitorInterval: number;     // health check interval
  onStateChange?: (from: string, to: string) => void;
}`;

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [contextOpen, setContextOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      reactions: { like: false, dislike: false },
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Backend integration point: replace with real AI streaming API call
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        id: `msg-${Date.now()}-ai`,
        role: 'ai',
        content: "I've processed your request and cross-referenced it with your memory context. Based on our conversation history and your current project context, here's my analysis...\n\nI'm pulling from 3 related memory entries to give you the most relevant response. Would you like me to dive deeper into any specific aspect?",
        timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        reactions: { like: false, dislike: false },
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 2200);
  };

  const handleReaction = (msgId: string, type: 'like' | 'dislike') => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId
          ? { ...m, reactions: { like: type === 'like' ? !m.reactions?.like : false, dislike: type === 'dislike' ? !m.reactions?.dislike : false } }
          : m
      )
    );
  };

  const getContent = (msg: Message) => {
    if (msg.isCode) return CODE_CONTENT;
    return msg.content;
  };

  return (
    <div
      className="flex h-[calc(100vh-var(--topbar-height)-48px)] rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(11,17,32,0.6)' }}
    >
      {/* Conversation Sidebar */}
      <ConversationSidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(11,17,32,0.4)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(139,92,246,0.2))', border: '1px solid rgba(6,182,212,0.2)' }}
              aria-hidden="true"
            >
              <span className="text-xs font-display font-700 text-gradient-cyan">A</span>
            </div>
            <div>
              <div className="font-display font-600 text-sm text-foreground">Architecture Review Prep</div>
              <div className="flex items-center gap-1.5">
                <div className="status-dot-online w-1.5 h-1.5" style={{ width: '6px', height: '6px' }} aria-hidden="true" />
                <span className="text-xs text-foreground-subtle">GPT-4o · Context: 8.2K tokens</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setContextOpen(!contextOpen)}
            className="text-xs text-foreground-subtle hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
            aria-label={contextOpen ? 'Hide context panel' : 'Show context panel'}
          >
            {contextOpen ? 'Hide context' : 'Show context'}
          </button>
        </div>

        {/* Messages */}
        <MessageThread
          messages={messages.map((m) => ({ ...m, content: getContent(m) }))}
          isTyping={isTyping}
          onReaction={handleReaction}
          messagesEndRef={messagesEndRef}
        />

        {/* Input */}
        <ChatInputBar onSend={handleSend} disabled={isTyping} />
      </div>

      {/* Context Panel */}
      {contextOpen && <ContextPanel />}
    </div>
  );
}