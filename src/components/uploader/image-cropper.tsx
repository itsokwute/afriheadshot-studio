'use client';

import React, { useState } from 'react';
import { AspectRatio } from '../../lib/types';
import { Crop, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useTheme } from '../../lib/theme-context';

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
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const [zoom, setZoom] = useState(1);

  return (
    <div className={`border rounded-2xl p-5 space-y-4 transition-colors ${
      isLight
        ? 'bg-white border-slate-200 shadow-sm'
        : isTerracotta
        ? 'bg-white border-[#E8DFD5] shadow-sm'
        : 'bg-slate-900/70 border-slate-800'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Crop className="h-5 w-5 text-amber-500" />
          <h4 className={`font-bold text-sm ${isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'}`}>
            LinkedIn framing and aspect ratio
          </h4>
        </div>

        {/* Aspect Ratio Toggles */}
        <div className={`flex items-center space-x-2 p-1 rounded-xl border ${
          isLight
            ? 'bg-slate-100 border-slate-200'
            : isTerracotta
            ? 'bg-[#F4EBE2] border-[#E8DFD5]'
            : 'bg-slate-950 border-slate-800'
        }`}>
          <button
            type="button"
            onClick={() => onRatioChange('1:1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedRatio === '1:1'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            1:1 Square
          </button>
          <button
            type="button"
            onClick={() => onRatioChange('4:5')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedRatio === '4:5'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            4:5 Portrait (LinkedIn)
          </button>
        </div>
      </div>

      {/* Interactive Crop Preview Canvas container */}
      <div className={`relative w-full max-w-sm mx-auto aspect-square sm:aspect-auto sm:h-[360px] rounded-xl border overflow-hidden flex items-center justify-center ${
        isLight ? 'bg-slate-100 border-slate-200' : isTerracotta ? 'bg-[#FAF7F2] border-[#E8DFD5]' : 'bg-slate-950 border-slate-800'
      }`}>
        {imageUrl ? (
          <div
            className={`relative overflow-hidden transition-all duration-300 border-2 border-amber-500 shadow-xl ${
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
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none border border-amber-500/30">
              <div className="border-r border-b border-amber-500/20" />
              <div className="border-r border-b border-amber-500/20" />
              <div className="border-b border-amber-500/20" />
              <div className="border-r border-b border-amber-500/20" />
              <div className="border-r border-b border-amber-500/20" />
              <div className="border-b border-amber-500/20" />
            </div>
          </div>
        ) : (
          <p className="text-xs opacity-60">Upload reference photo to preview crop</p>
        )}
      </div>

      {/* Zoom Controls */}
      {imageUrl && (
        <div className="flex items-center justify-center space-x-4 pt-1">
          <button
            type="button"
            onClick={() => setZoom(Math.max(1, zoom - 0.1))}
            className={`p-1.5 rounded-lg border ${
              isLight ? 'bg-slate-100 border-slate-200 text-slate-800' : isTerracotta ? 'bg-[#F4EBE2] border-[#E8DFD5]' : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
            title="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-xs font-mono opacity-80">{Math.round(zoom * 100)}% Scale</span>
          <button
            type="button"
            onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
            className={`p-1.5 rounded-lg border ${
              isLight ? 'bg-slate-100 border-slate-200 text-slate-800' : isTerracotta ? 'bg-[#F4EBE2] border-[#E8DFD5]' : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
            title="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(1)}
            className={`p-1.5 rounded-lg border text-xs flex items-center space-x-1 ${
              isLight ? 'bg-slate-100 border-slate-200 text-slate-800' : isTerracotta ? 'bg-[#F4EBE2] border-[#E8DFD5]' : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      )}
    </div>
  );
};
