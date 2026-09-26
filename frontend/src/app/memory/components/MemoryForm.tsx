'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface MemoryFormProps {
  onAdd: (title: string, content: string, tags: string) => void;
}

export default function MemoryForm({ onAdd }: MemoryFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    onAdd(title.trim(), content.trim(), tags.trim());
    setTitle('');
    setContent('');
    setTags('');
    setIsExpanded(false);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <Plus size={18} className="text-cyan-400" />
          <span className="text-sm">Add new memory...</span>
        </button>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Memory title"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-400/30 transition-colors"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What do you want to remember?"
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-400/30 transition-colors resize-none"
          />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated, e.g., work, urgent)"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-400/30 transition-colors"
          />
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => setIsExpanded(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!title.trim() || !content.trim()}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                title.trim() && content.trim()
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 shadow-lg shadow-cyan-500/25'
                  : 'bg-white/5 text-gray-500 cursor-not-allowed'
              }`}
            >
              Save Memory
            </button>
          </div>
        </div>
      )}
    </div>
  );
}