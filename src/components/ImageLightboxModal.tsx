'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { GeneratedResult } from '../lib/types';
import { generateHighResExportCanvas } from '../lib/canvas-utils';
import confetti from 'canvas-confetti';
import { X, ChevronLeft, ChevronRight, Download, Circle, Square, RefreshCw, Share2 } from 'lucide-react';

interface ImageLightboxModalProps {
  results: GeneratedResult[];
  initialIndex: number;
  onClose: () => void;
  onReroll?: (result: GeneratedResult) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  results,
  initialIndex,
  onClose,
  onReroll,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isCirclePreview, setIsCirclePreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const currentItem = results[currentIndex] || results[0];

  const handleNext = useCallback(() => {
    if (results.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % results.length);
  }, [results.length]);

  const handlePrev = useCallback(() => {
    if (results.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + results.length) % results.length);
  }, [results.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  // Keyboard navigation & Escape key handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handleNext, handlePrev]);

  if (!currentItem) return null;

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const highResDataUrl = await generateHighResExportCanvas(
        currentItem.imageUrl,
        currentItem.aspectRatio
      );

      const link = document.createElement('a');
      link.href = highResDataUrl;
      link.download = `AfriHeadshot_${currentItem.id}_${currentItem.aspectRatio.replace(':', 'x')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

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

  const title = currentItem.backgroundTitle || "Executive Office";
  const subtitleParts = [currentItem.hairstyleTitle, currentItem.outfitTitle].filter(Boolean);
  const subtitle = subtitleParts.length > 0 ? subtitleParts.join(" • ") : "";

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-fadeIn"
    >
      {/* Top Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shadow-xl"
        title="Close Lightbox (Esc)"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Prev Navigation Button */}
      {results.length > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-50 p-3 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shadow-xl"
          title="Previous Image (Left Arrow)"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Next Navigation Button */}
      {results.length > 1 && (
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-50 p-3 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shadow-xl"
          title="Next Image (Right Arrow)"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Centered High-Res Image View */}
      <div className="relative max-w-2xl w-full flex flex-col items-center justify-center space-y-4">
        <div className={`relative transition-all duration-300 overflow-hidden flex items-center justify-center shadow-2xl ${
          currentItem.aspectRatio === '1:1' ? 'aspect-square max-h-[65vh] w-auto' : 'aspect-[4/5] max-h-[65vh] w-auto'
        } ${
          isCirclePreview
            ? 'rounded-full border-4 border-amber-500 shadow-amber-500/20'
            : 'rounded-2xl border border-slate-800'
        }`}>
          <img
            src={currentItem.imageUrl}
            alt="Full-screen Headshot Preview"
            className="w-full h-full object-cover select-none"
          />
        </div>

        {/* Caption Metadata */}
        <div className="text-center text-white space-y-0.5 max-w-md">
          <h4 className="font-bold text-base sm:text-lg text-white">{title}</h4>
          {subtitle && (
            <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
          )}
          <span className="inline-block text-[10px] text-amber-400 font-mono bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full mt-1">
            Result {currentIndex + 1} of {results.length}
          </span>
        </div>

        {/* Bottom Floating Action Dock */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-slate-900/90 border border-slate-800 backdrop-blur-xl p-2.5 rounded-2xl shadow-2xl">
          {/* LinkedIn Circle Toggle */}
          <button
            type="button"
            onClick={() => setIsCirclePreview(!isCirclePreview)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              isCirclePreview
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            {isCirclePreview ? <Circle className="h-4 w-4" /> : <Square className="h-4 w-4" />}
            <span>{isCirclePreview ? 'LinkedIn Avatar' : 'Square 1:1'}</span>
          </button>

          {/* Re-roll Variation Button */}
          {onReroll && (
            <button
              type="button"
              onClick={() => onReroll(currentItem)}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 flex items-center space-x-1.5 transition-all"
            >
              <RefreshCw className="h-4 w-4 text-amber-400" />
              <span>Re-roll Style</span>
            </button>
          )}

          {/* Export PNG Button */}
          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="px-5 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            <Download className="h-4 w-4 fill-slate-950" />
            <span>{isExporting ? 'Exporting...' : 'Download 2048x2048 PNG'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
