import { Trash2, Tag } from 'lucide-react';

interface MemoryItemProps {
  id: string;
  title: string;
  content: string;
  tags: string[];
  onDelete: (id: string) => void;
}

export default function MemoryItem({ id, title, content, tags, onDelete }: MemoryItemProps) {
  return (
    <div className="group p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-200 hover:border-cyan-500/30">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white">{title}</h3>
          <p className="text-sm text-gray-300 mt-1.5 leading-relaxed">{content}</p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => onDelete(id)}
          className="flex-shrink-0 p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Delete memory"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}