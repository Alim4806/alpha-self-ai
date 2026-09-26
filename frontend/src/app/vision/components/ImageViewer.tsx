import { ImageData } from '../page';
import { Calendar, Tag, FileText, Sparkles } from 'lucide-react';
import VisionChat from './VisionChat';

interface ImageViewerProps {
  image: ImageData;
}

export default function ImageViewer({ image }: ImageViewerProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden h-full">
      <div className="aspect-video w-full bg-black/50 relative">
        <img
          src={image.url}
          alt={image.name}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="p-4 space-y-4">
        {/* Info */}
        <div>
          <h3 className="text-lg font-semibold text-white">{image.name}</h3>
          <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {image.uploadedAt}
            </span>
          </div>
        </div>

        {/* Description */}
        {image.description && (
          <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            <div className="flex items-start gap-2">
              <Sparkles size={14} className="text-cyan-400 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-cyan-400">AI Analysis</p>
                <p className="text-sm text-gray-200 mt-0.5">{image.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        {image.tags.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
              <Tag size={12} />
              Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {image.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/5"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Chat */}
        <div className="pt-2 border-t border-white/10">
          <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
            <FileText size={12} />
            Ask about this image
          </p>
          <VisionChat imageId={image.id} imageName={image.name} />
        </div>
      </div>
    </div>
  );
}