'use client';

import { Search, X } from 'lucide-react';

interface MemorySearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function MemorySearch({ searchTerm, onSearchChange }: MemorySearchProps) {
  return (
    <div className="relative flex-1 max-w-md">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search memories by title, content, or tags..."
        className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-8 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-cyan-400/30 transition-colors"
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}