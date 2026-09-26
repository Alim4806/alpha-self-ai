'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import ChatInputBar from '@/app/ai-chat/components/ChatInputBar'; // Reuse existing component

// Dummy chat messages for demonstration
const INITIAL_MESSAGES = [
  { id: '1', sender: 'bot', text: `Hello! I've analyzed the PDF. Ask me any questions about its content.` },
];

interface PDFChatProps {
  pdfName: string;
}

export default function PDFChat({ pdfName }: PDFChatProps) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    // Add user message
    const userMsg = { id: Date.now().toString(), sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);

    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `This is a simulated response to: "${text}". In production, this would query the PDF content via AI.`,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm h-[500px] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b border-white/10">
        <Bot size={16} className="text-cyan-400" />
        <span className="text-sm text-white font-medium">{pdfName}</span>
        <span className="text-xs text-gray-500 ml-auto">Ready</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'bg-white/10 text-gray-200'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 text-gray-400 px-4 py-2 rounded-xl text-sm flex items-center gap-1">
              <span className="animate-pulse">•</span>
              <span className="animate-pulse delay-100">•</span>
              <span className="animate-pulse delay-200">•</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/10 p-3">
        <ChatInputBar onSend={handleSend} disabled={false} />
      </div>
    </div>
  );
}