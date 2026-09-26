import { ImageData } from '../page';
import { Image, Trash2, Eye } from 'lucide-react';

interface ImageGridProps {
  images: ImageData[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ImageGrid({ images, selectedId, onSelect, onDelete }: ImageGridProps) {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
        <Image size={32} className="text-gray-600 mb-2" />
        <p className="text-sm text-gray-400">No images uploaded</p>
        <p className="text-xs text-gray-500">Upload your first image above</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 h-full">
      <h3 className="text-sm font-medium text-white mb-4">Uploaded Images</h3>
      <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
        {images.map((img) => (
          <div
            key={img.id}
            className={`relative group rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
              selectedId === img.id
                ? 'border-cyan-400 shadow-lg shadow-cyan-500/30'
                : 'border-transparent hover:border-white/20'
            }`}
            onClick={() => onSelect(img.id)}
          >
            <img
              src={img.url}
              alt={img.name}
              className="w-full aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Eye size={20} className="text-white" />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(img.id);
              }}
              className="absolute top-1 right-1 p-1 rounded-full bg-red-500/80 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Delete image"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}