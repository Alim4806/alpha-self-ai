'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import MemoryForm from './components/MemoryForm';
import MemorySearch from './components/MemorySearch';
import MemoryItem from './components/MemoryItem';

// Dummy initial memories
const INITIAL_MEMORIES = [
  { id: '1', title: 'Project Alpha', content: 'Started on 2026-07-01. Need to complete by end of month.', tags: ['work', 'urgent'] },
  { id: '2', title: 'Meeting notes with client', content: 'Discussed new feature requirements. Next meeting on Friday.', tags: ['work', 'meeting'] },
  { id: '3', title: 'Recipe: Spaghetti Carbonara', content: 'Ingredients: eggs, pancetta, pecorino, black pepper. Cook pasta al dente.', tags: ['personal', 'food'] },
  { id: '4', title: 'Book recommendation', content: 'Read "The Pragmatic Programmer" – great for software engineering principles.', tags: ['learning', 'books'] },
];

export default function MemoryPage() {
  const [memories, setMemories] = useState(INITIAL_MEMORIES);
  const [searchTerm, setSearchTerm] = useState('');

  // Add a new memory
  const addMemory = (title: string, content: string, tags: string) => {
    const newMemory = {
      id: Date.now().toString(),
      title,
      content,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    };
    setMemories([newMemory, ...memories]);
  };

  // Delete a memory
  const deleteMemory = (id: string) => {
    setMemories(memories.filter(m => m.id !== id));
  };

  // Filter memories based on search term (title, content, tags)
  const filteredMemories = memories.filter(m =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Memory Vault
          </h1>
          <p className="text-sm text-gray-400">
            Store and recall important information, notes, and knowledge
          </p>
        </div>

        {/* Add Memory Form */}
        <MemoryForm onAdd={addMemory} />

        {/* Search & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <MemorySearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <span className="text-xs text-gray-500">
            {filteredMemories.length} memory{filteredMemories.length !== 1 ? 'ies' : 'y'}
          </span>
        </div>

        {/* Memories List */}
        <div className="space-y-3">
          {filteredMemories.length > 0 ? (
            filteredMemories.map((memory) => (
              <MemoryItem
                key={memory.id}
                id={memory.id}
                title={memory.title}
                content={memory.content}
                tags={memory.tags}
                onDelete={deleteMemory}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-white font-medium">No memories found</h3>
              <p className="text-gray-500 text-sm mt-1">
                {searchTerm ? 'Try adjusting your search term' : 'Add your first memory above'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 text-center">
          <p className="text-[10px] text-gray-600 tracking-wider uppercase">
            ALION v2.5 • Memories are stored locally for now
          </p>
        </div>
      </div>
    </AppLayout>
  );
}