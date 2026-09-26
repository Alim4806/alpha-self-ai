'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface VisionChatProps {
  imageId: string;
  imageName: string;
}

export default function VisionChat({ imageId, imageName }: VisionChatProps) {
  const [messages, setMessages] = useState<{ id: string; sender: 'user' | 'bot'; text: string }[]>([
    { id: '1', sender: 'bot', text: `I've analyzed this image. Ask me anything about it!` },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), sender: 'user' as const, text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        `The image shows ${imageName}. It appears to be a visually interesting composition with various elements.`,
        `I can see clear details in the foreground and background. The colors are well balanced.`,
        `This image could be used for a variety of purposes. The clarity is good.`,
        `I notice some interesting patterns and textures in this image.`,
        `Based on my analysis, this image contains several distinct objects that are recognizable.`,
      ];
      const random = responses[Math.floor(Math.random() * responses.length)];
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot' as const,
        text: random,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-2">
      <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-3 py-1.5 rounded-lg text-xs ${
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
            <div className="bg-white/10 text-gray-400 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1">
              <span className="animate-pulse">•</span>
              <span className="animate-pulse delay-100">•</span>
              <span className="animate-pulse delay-200">•</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about this image..."
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-400/30 transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className={`p-1.5 rounded-lg transition-all duration-200 ${
            input.trim()
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105'
              : 'bg-white/5 text-gray-500 cursor-not-allowed'
          }`}
          aria-label="Send"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}