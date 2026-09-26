'use client';

import { useState, useRef, DragEvent } from 'react';
import { Upload, File, X } from 'lucide-react';

interface PDFUploaderProps {
  onUpload: (file: File) => void;
}

export default function PDFUploader({ onUpload }: PDFUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      setSelectedFile(file);
    } else {
      alert('Please select a PDF file.');
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed transition-all duration-200 ${
          isDragging
            ? 'border-cyan-400 bg-cyan-500/10'
            : 'border-white/10 bg-white/5 hover:border-white/20'
        }`}
      >
        {selectedFile ? (
          <div className="flex items-center gap-3 w-full">
            <File size={20} className="text-cyan-400" />
            <span className="text-sm text-white flex-1 truncate">{selectedFile.name}</span>
            <span className="text-xs text-gray-400">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </span>
            <button
              onClick={() => { setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
              className="text-gray-400 hover:text-red-400 transition-colors"
              aria-label="Remove file"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <>
            <Upload size={32} className="text-gray-500 mb-2" />
            <p className="text-sm text-gray-400">
              Drag & drop a PDF here, or click to browse
            </p>
            <p className="text-xs text-gray-500 mt-1">Supported: .pdf</p>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
          }}
        />
        {!selectedFile && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 px-4 py-2 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            Browse Files
          </button>
        )}
      </div>
      {selectedFile && (
        <div className="flex justify-end">
          <button
            onClick={handleUpload}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/25"
          >
            Upload & Process
          </button>
        </div>
      )}
    </div>
  );
}