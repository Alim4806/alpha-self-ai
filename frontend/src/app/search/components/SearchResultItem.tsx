import { ExternalLink, Globe, Hash } from 'lucide-react';

interface SearchResultItemProps {
  title: string;
  url: string;
  snippet: string;
  category?: string;
}

export default function SearchResultItem({ title, url, snippet, category }: SearchResultItemProps) {
  // Clean up URL for display (remove https://)
  const displayUrl = url.replace(/^https?:\/\//, '');

  return (
    <div className="group p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-200 hover:border-cyan-500/30">
      <div className="flex items-start gap-3">
        {/* Favicon / Icon Placeholder */}
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-white/10">
          <Globe size={14} className="text-cyan-400" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title with link */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors group-hover:underline line-clamp-1"
          >
            {title}
          </a>

          {/* URL */}
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-500 truncate">{displayUrl}</span>
            <ExternalLink size={10} className="text-gray-600 flex-shrink-0" />
            {category && (
              <span className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5">
                {category}
              </span>
            )}
          </div>

          {/* Snippet */}
          <p className="text-sm text-gray-300 mt-1.5 leading-relaxed line-clamp-2">
            {snippet}
          </p>
        </div>
      </div>
    </div>
  );
}