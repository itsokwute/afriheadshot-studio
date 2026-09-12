'use client';

import React, { useState } from 'react';
import { GeneratedResult } from '../../lib/types';
import { generateHighResExportCanvas } from '../../lib/canvas-utils';
import confetti from 'canvas-confetti';
import { Download, CheckCircle2, ShieldCheck, Share2, FileImage, X, Sparkles } from 'lucide-react';

interface DownloadModalProps {
  result: GeneratedResult;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ result, onClose }) => {
  const [format, setFormat] = useState<'PNG' | 'JPG'>('PNG');
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const highResDataUrl = await generateHighResExportCanvas(
        result.imageUrl,
        result.aspectRatio
      );

      const link = document.createElement('a');
      link.href = highResDataUrl;
      link.download = `AfriHeadshot_${result.id}_${result.aspectRatio.replace(':', 'x')}.${format.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl space-y-6 p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <Download className="h-5 w-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">Export Ultra High-Res Studio Headshot</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Preview Thumbnail */}
        <div className="relative aspect-square max-w-xs mx-auto rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-xl bg-slate-950">
          <img
            src={result.imageUrl}
            alt="Export preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-amber-300 border border-amber-500/20">
            2048 x {result.aspectRatio === '1:1' ? '2048' : '2560'} px
          </div>
        </div>

        {/* Format Selection */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">Select Export Image Format</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormat('PNG')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                format === 'PNG'
                  ? 'border-amber-500 bg-amber-500/10 text-amber-300 shadow-md'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              <FileImage className="h-4 w-4" />
              <span>PNG (Lossless High-Res)</span>
            </button>

            <button
              type="button"
              onClick={() => setFormat('JPG')}
              className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                format === 'JPG'
                  ? 'border-amber-500 bg-amber-500/10 text-amber-300 shadow-md'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              <FileImage className="h-4 w-4" />
              <span>JPG (Optimized Web)</span>
            </button>
          </div>
        </div>

        {/* Automated LinkedIn Metadata Badge */}
        <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-1 text-xs">
          <div className="flex items-center space-x-2 text-sky-400 font-semibold">
            <Share2 className="h-4 w-4" />
            <span>LinkedIn Automated Sizing & EXIF Metadata Embedded</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-normal">
            Pre-configured with optimal 300 DPI resolution, sRGB color profile, and exact 1:1 square crop for seamless LinkedIn profile upload.
          </p>
        </div>

        {/* Download Action */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={isExporting}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Download className="h-4 w-4 fill-slate-950" />
          <span>{isExporting ? 'Generating High-Res Export...' : `Download 2048x2048 ${format}`}</span>
        </button>
      </div>
    </div>
  );
};
