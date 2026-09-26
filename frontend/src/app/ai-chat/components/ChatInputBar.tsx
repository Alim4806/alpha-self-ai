'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, X, FileText } from 'lucide-react';


interface ChatInputBarProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInputBar({ onSend, disabled }: ChatInputBarProps) {
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const QUICK_PROMPTS = [
    'Summarize this conversation',
    'Add to memory',
    'Generate code',
    'Explain this',
  ];

  return (
    <div
      className="flex-shrink-0 p-4"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(11,17,32,0.4)' }}
    >
      {/* Quick prompts */}
      <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1">
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={`qp-${prompt}`}
            onClick={() => setText(prompt)}
            className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#94A3B8',
              whiteSpace: 'nowrap',
            }}
            aria-label={`Quick prompt: ${prompt}`}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Attached file indicator */}
      {attachedFile && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl mb-3"
          style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}
        >
          <FileText size={13} style={{ color: '#06B6D4' }} aria-hidden="true" />
          <span className="text-xs text-foreground-muted flex-1 truncate">{attachedFile}</span>
          <button
            onClick={() => setAttachedFile(null)}
            className="text-foreground-subtle hover:text-danger transition-colors"
            aria-label="Remove attached file"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Input area */}
      <div
        className="flex items-end gap-3 px-4 py-3 rounded-2xl transition-all duration-200"
        style={{
          background: focused ? 'rgba(6,182,212,0.04)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${focused ? 'rgba(6,182,212,0.35)' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: focused ? '0 0 20px rgba(6,182,212,0.08)' : 'none',
        }}
      >
        {/* File attach */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-105 mb-0.5"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748B' }}
          aria-label="Attach file"
          disabled={disabled}
        >
          <Paperclip size={14} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) setAttachedFile(e.target.files[0].name);
          }}
          aria-label="File input"
        />

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={disabled ? 'ALION is thinking...' : 'Ask ALION anything... (Shift+Enter for new line)'}
          rows={1}
          disabled={disabled}
          className="flex-1 bg-transparent text-sm text-foreground placeholder-foreground-subtle outline-none resize-none leading-relaxed"
          style={{ maxHeight: '120px', minHeight: '24px' }}
          aria-label="Message input"
          aria-multiline="true"
        />

        {/* Voice input */}
        <button
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-105 mb-0.5"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748B' }}
          aria-label="Voice input"
          disabled={disabled}
        >
          <Mic size={14} />
        </button>

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all mb-0.5"
          style={{
            background: text.trim() && !disabled
              ? 'linear-gradient(135deg, #06B6D4, #3B82F6)'
              : 'rgba(255,255,255,0.04)',
            border: text.trim() && !disabled
              ? '1px solid rgba(6,182,212,0.4)'
              : '1px solid rgba(255,255,255,0.08)',
            color: text.trim() && !disabled ? '#050816' : '#64748B',
            boxShadow: text.trim() && !disabled ? '0 0 15px rgba(6,182,212,0.3)' : 'none',
            transform: text.trim() && !disabled ? undefined : undefined,
            cursor: !text.trim() || disabled ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) => {
            if (text.trim() && !disabled) {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          }}
          aria-label="Send message"
        >
          <Send size={14} />
        </button>
      </div>

      <p className="text-center text-xs text-foreground-subtle mt-2">
        ALION can make mistakes. Verify important information.
      </p>
    </div>
  );
}