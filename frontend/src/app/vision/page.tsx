'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import ImageUploader from './components/ImageUploader';
import ImageGrid from './components/ImageGrid';
import ImageViewer from './components/ImageViewer';
import { Image } from 'lucide-react';

// Dummy initial images
const INITIAL_IMAGES: ImageData[] = [
  {
    id: '1',
    name: 'sunset_beach.jpg',
    url: 'https://picsum.photos/seed/1/400/300',
    description: 'A beautiful sunset over a tropical beach with palm trees and calm waves.',
    tags: ['sunset', 'beach', 'nature', 'relaxing'],
    uploadedAt: '2026-07-25 14:30',
  },
  {
    id: '2',
    name: 'city_skyline.jpg',
    url: 'https://picsum.photos/seed/2/400/300',
    description: 'Urban skyline at night with illuminated skyscrapers and reflections on the water.',
    tags: ['city', 'night', 'architecture', 'urban'],
    uploadedAt: '2026-07-24 09:15',
  },
  {
    id: '3',
    name: 'mountain_peak.jpg',
    url: 'https://picsum.photos/seed/3/400/300',
    description: 'Snow-capped mountain peak against a clear blue sky with clouds.',
    tags: ['mountains', 'snow', 'adventure', 'outdoors'],
    uploadedAt: '2026-07-23 16:45',
  },
];

export type ImageData = {
  id: string;
  name: string;
  url: string;
  description: string;
  tags: string[];
  uploadedAt: string;
};

export default function VisionPage() {
  const [images, setImages] = useState<ImageData[]>(INITIAL_IMAGES);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Add a new image (simulate upload + analysis)
  const addImage = (file: File) => {
    // Read file to get data URL for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const newImage: ImageData = {
        id: Date.now().toString(),
        name: file.name,
        url: dataUrl,
        description: 'Analyzing image...',
        tags: [],
        uploadedAt: new Date().toLocaleString(),
      };
      setImages([newImage, ...images]);

      // Simulate AI analysis after 2 seconds
      setIsAnalyzing(true);
      setTimeout(() => {
        setImages((prev) =>
          prev.map((img) =>
            img.id === newImage.id
              ? {
                  ...img,
                  description: 'A stunning image with vivid colors and interesting composition. Contains elements of nature and architecture.',
                  tags: ['uploaded', 'analyzed', 'AI-generated'],
                }
              : img
          )
        );
        setIsAnalyzing(false);
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  // Delete an image
  const deleteImage = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const selectedImage = images.find((img) => img.id === selectedId);

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Vision Assistant
          </h1>
          <p className="text-sm text-gray-400">
            Upload images and let ALION analyze, describe, and answer questions
          </p>
        </div>

        {/* Uploader */}
        <ImageUploader onUpload={addImage} isAnalyzing={isAnalyzing} />

        {/* Grid + Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Grid */}
          <div className="lg:col-span-1">
            <ImageGrid
              images={images}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onDelete={deleteImage}
            />
          </div>

          {/* Right: Viewer */}
          <div className="lg:col-span-2">
            {selectedImage ? (
              <ImageViewer image={selectedImage} />
            ) : (
              <div className="flex flex-col items-center justify-center h-80 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center">
                <Image size={40} className="text-gray-600 mb-3" />
                <h3 className="text-white font-medium">No image selected</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Choose an image from the grid to view details and analysis
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 text-center">
          <p className="text-[10px] text-gray-600 tracking-wider uppercase">
            ALION v2.5 • Image analysis is simulated
          </p>
        </div>
      </div>
    </AppLayout>
  );
}