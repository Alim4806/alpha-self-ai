import { FileText, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface PDF {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  status: 'processed' | 'processing' | 'error';
}

interface PDFListProps {
  pdfs: PDF[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function PDFList({ pdfs, selectedId, onSelect, onDelete }: PDFListProps) {
  const getStatusIcon = (status: PDF['status']) => {
    switch (status) {
      case 'processed':
        return <CheckCircle size={14} className="text-emerald-400" />;
      case 'processing':
        return <Clock size={14} className="text-yellow-400 animate-spin" />;
      case 'error':
        return <AlertCircle size={14} className="text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: PDF['status']) => {
    switch (status) {
      case 'processed': return 'Ready';
      case 'processing': return 'Processing...';
      case 'error': return 'Error';
      default: return '';
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 h-full">
      <h3 className="text-sm font-medium text-white mb-4">Your PDFs</h3>
      {pdfs.length === 0 ? (
        <div className="text-center py-8">
          <FileText size={24} className="text-gray-600 mx-auto mb-2" />
          <p className="text-sm text-gray-400">No PDFs uploaded yet</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
          {pdfs.map((pdf) => (
            <div
              key={pdf.id}
              onClick={() => onSelect(pdf.id)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedId === pdf.id
                  ? 'bg-cyan-500/20 border border-cyan-500/30'
                  : 'bg-white/5 hover:bg-white/10 border border-transparent'
              }`}
            >
              <FileText size={16} className="text-cyan-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{pdf.name}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{pdf.size}</span>
                  <span>•</span>
                  <span>{pdf.uploadedAt}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-1 text-xs">
                  {getStatusIcon(pdf.status)}
                  <span className="text-gray-400">{getStatusText(pdf.status)}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(pdf.id); }}
                  className="text-gray-500 hover:text-red-400 transition-colors p-1 rounded hover:bg-red-500/10"
                  aria-label="Delete PDF"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}