'use client';

import { Search, Loader2, X } from 'lucide-react';
import { KeyboardEvent } from 'react';

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export default function SearchBar({ query, setQuery, onSearch, isSearching }: SearchBarProps) {
  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Search Icon or Spinner */}
      <div className="flex-shrink-0 text-gray-500">
        {isSearching ? (
          <Loader2 size={18} className="animate-spin text-cyan-400" />
        ) : (
          <Search size={18} />
        )}
      </div>

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search the web... (e.g., 'Latest AI news 2026')"
        className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-500"
        disabled={isSearching}
        aria-label="Search input"
      />

      {/* Clear Button */}
      {query && (
        <button
          onClick={clearSearch}
          className="flex-shrink-0 text-gray-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}

      {/* Search Button */}
      <button
        onClick={handleSubmit}
        disabled={!query.trim() || isSearching}
        className={`flex-shrink-0 px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          query.trim() && !isSearching
            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 shadow-lg shadow-cyan-500/25'
            : 'bg-white/5 text-gray-500 cursor-not-allowed'
        }`}
        aria-label="Submit search"
      >
        Search
      </button>
    </div>
  );
}