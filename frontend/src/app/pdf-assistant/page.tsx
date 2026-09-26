'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import PDFUploader from './components/PDFUploader';
import PDFList from './components/PDFList';
import PDFChat from './components/PDFChat';
import { FileText } from 'lucide-react';

// Dummy data for uploaded PDFs with correct type
const INITIAL_PDFS: Array<{
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  status: 'processed' | 'processing' | 'error';
}> = [
  { id: '1', name: 'Technical_Report_2025.pdf', size: '2.4 MB', uploadedAt: '2026-07-25 10:30', status: 'processed' },
  { id: '2', name: 'Invoice_June2026.pdf', size: '845 KB', uploadedAt: '2026-07-24 14:15', status: 'processing' },
  { id: '3', name: 'Research_Paper_AI.pdf', size: '3.1 MB', uploadedAt: '2026-07-23 09:00', status: 'processed' },
];

// Define the PDF type to match the component
export type PDF = {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  status: 'processed' | 'processing' | 'error';
};

export default function PDFAssistantPage() {
  const [pdfs, setPdfs] = useState<PDF[]>(INITIAL_PDFS);
  const [selectedPdfId, setSelectedPdfId] = useState<string | null>(null);

  // Add a new PDF (simulated)
  const addPDF = (file: File) => {
    const newPDF: PDF = {
      id: Date.now().toString(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      uploadedAt: new Date().toLocaleString(),
      status: 'processing',
    };
    setPdfs([newPDF, ...pdfs]);
    // Simulate processing completion after 2 seconds
    setTimeout(() => {
      setPdfs((prev) =>
        prev.map((p) =>
          p.id === newPDF.id ? { ...p, status: 'processed' as const } : p
        )
      );
    }, 2000);
  };

  // Delete a PDF
  const deletePDF = (id: string) => {
    setPdfs(pdfs.filter((p) => p.id !== id));
    if (selectedPdfId === id) setSelectedPdfId(null);
  };

  // Select a PDF for chat
  const selectPDF = (id: string) => {
    setSelectedPdfId(id);
  };

  const selectedPdf = pdfs.find((p) => p.id === selectedPdfId);

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            PDF Assistant
          </h1>
          <p className="text-sm text-gray-400">
            Upload, manage, and query your PDF documents with AI
          </p>
        </div>

        {/* Uploader */}
        <PDFUploader onUpload={addPDF} />

        {/* Two-column layout: PDF List & Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: PDF List */}
          <div className="lg:col-span-1">
            <PDFList
              pdfs={pdfs}
              selectedId={selectedPdfId}
              onSelect={selectPDF}
              onDelete={deletePDF}
            />
          </div>

          {/* Right: Chat Area */}
          <div className="lg:col-span-2">
            {selectedPdf ? (
              <PDFChat pdfName={selectedPdf.name} />
            ) : (
              <div className="flex flex-col items-center justify-center h-80 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center">
                <FileText size={40} className="text-gray-600 mb-3" />
                <h3 className="text-white font-medium">No PDF selected</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Choose a PDF from the list to start asking questions
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 text-center">
          <p className="text-[10px] text-gray-600 tracking-wider uppercase">
            ALION v2.5 • PDF analysis powered by AI
          </p>
        </div>
      </div>
    </AppLayout>
  );
}