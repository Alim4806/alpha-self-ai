'use client';

import { useState, useRef, DragEvent } from 'react';
import { Upload, Image, X, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export default function ImageUploader({ onUpload, isAnalyzing }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
    } else {
      alert('Please select an image file.');
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
            <Image size={20} className="text-cyan-400 flex-shrink-0" />
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
              Drag & drop an image here, or click to browse
            </p>
            <p className="text-xs text-gray-500 mt-1">Supported: JPG, PNG, GIF, WebP</p>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
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
            disabled={isAnalyzing}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isAnalyzing
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 shadow-lg shadow-cyan-500/25'
            }`}
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Analyzing...
              </span>
            ) : (
              'Upload & Analyze'
            )}
          </button>
        </div>
      )}
    </div>
  );
}