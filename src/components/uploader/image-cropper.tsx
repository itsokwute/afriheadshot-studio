'use client';

import React, { useState } from 'react';
import { AspectRatio } from '../../lib/types';
import { Crop, ZoomIn, ZoomOut, RotateCcw, Check, Sparkles } from 'lucide-react';

interface ImageCropperProps {
  imageUrl: string;
  selectedRatio: AspectRatio;
  onRatioChange: (ratio: AspectRatio) => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  imageUrl,
  selectedRatio,
  onRatioChange,
}) => {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Crop className="h-5 w-5 text-amber-400" />
          <h4 className="font-bold text-white text-sm">Target LinkedIn Framing & Aspect Ratio</h4>
        </div>

        {/* Aspect Ratio Toggles */}
        <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => onRatioChange('1:1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedRatio === '1:1'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1:1 Square
          </button>
          <button
            type="button"
            onClick={() => onRatioChange('4:5')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedRatio === '4:5'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4:5 Portrait (LinkedIn)
          </button>
        </div>
      </div>

      {/* Interactive Crop Preview Canvas container */}
      <div className="relative w-full max-w-sm mx-auto aspect-square sm:aspect-auto sm:h-[360px] bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <div
            className={`relative overflow-hidden transition-all duration-300 border-2 border-amber-500/80 shadow-2xl ${
              selectedRatio === '1:1' ? 'aspect-square h-[300px]' : 'aspect-[4/5] h-[320px]'
            }`}
          >
            <img
              src={imageUrl}
              alt="Crop anchor"
              className="w-full h-full object-cover transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
            />
            {/* Rule of thirds grid overlay */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none border border-amber-500/20">
              <div className="border-r border-b border-amber-500/20" />
              <div className="border-r border-b border-amber-500/20" />
              <div className="border-b border-amber-500/20" />
              <div className="border-r border-b border-amber-500/20" />
              <div className="border-r border-b border-amber-500/20" />
              <div className="border-b border-amber-500/20" />
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500">Upload reference photo to preview crop</p>
        )}
      </div>

      {/* Zoom Controls */}
      {imageUrl && (
        <div className="flex items-center justify-center space-x-4 pt-1">
          <button
            type="button"
            onClick={() => setZoom(Math.max(1, zoom - 0.1))}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            title="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-xs font-mono text-slate-400">{Math.round(zoom * 100)}% Scale</span>
          <button
            type="button"
            onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            title="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(1)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs flex items-center space-x-1"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      )}
    </div>
  );
};
