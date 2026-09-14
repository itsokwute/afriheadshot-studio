'use client';

import React, { useState } from 'react';
import { GeneratedResult } from '../../lib/types';
import { ComparisonSlider } from './comparison-slider';
import { PromptInspector } from './prompt-inspector';
import { DownloadModal } from './download-modal';
import { Download, Terminal, Sliders, Square, Circle } from 'lucide-react';
import { useTheme } from '../../lib/theme-context';

interface ResultCardProps {
  result: GeneratedResult;
  globalCirclePreview?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, globalCirclePreview = false }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const [showInspector, setShowInspector] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [isCirclePreview, setIsCirclePreview] = useState(globalCirclePreview);

  // Clean metadata formatting without stray trailing punctuation
  const title = result.backgroundTitle || "Executive Office";
  const subtitleParts = [result.hairstyleTitle, result.outfitTitle].filter(Boolean);
  const subtitle = subtitleParts.length > 0 ? subtitleParts.join(" • ") : "";

  return (
    <div className={`border rounded-2xl overflow-hidden shadow-lg transition-all flex flex-col justify-between group ${
      isLight
        ? 'bg-white border-slate-200 hover:border-slate-300'
        : isTerracotta
        ? 'bg-white border-[#E8DFD5] hover:border-[#D6C4B4]'
        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
    }`}>
      {/* Visual Header Image & LinkedIn Circle Toggle */}
      <div className="relative w-full overflow-hidden rounded-t-2xl bg-slate-950 p-2">
        {/* Toggle Bar */}
        <div className="flex items-center justify-between pb-2 px-1 text-[10px] font-semibold text-slate-400">
          <span className="text-amber-400/90">
            {result.aspectRatio || '1:1'} • {result.photoReferenceCount || 1} Photos
          </span>

          <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 p-0.5 rounded-lg">
            <button
              type="button"
              onClick={() => setIsCirclePreview(false)}
              className={`px-2 py-0.5 rounded-md flex items-center space-x-1 transition-all ${
                !isCirclePreview ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:text-white'
              }`}
              title="Full Square View"
            >
              <Square className="h-3 w-3" />
              <span>Full</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCirclePreview(true)}
              className={`px-2 py-0.5 rounded-md flex items-center space-x-1 transition-all ${
                isCirclePreview ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:text-white'
              }`}
              title="LinkedIn Avatar Preview"
            >
              <Circle className="h-3 w-3" />
              <span>LinkedIn</span>
            </button>
          </div>
        </div>

        {showComparison ? (
          <div className="p-1 bg-slate-950">
            <ComparisonSlider
              originalUrl={result.originalAnchorUrl}
              generatedUrl={result.imageUrl}
              aspectRatio={result.aspectRatio}
            />
            <button
              type="button"
              onClick={() => setShowComparison(false)}
              className="mt-2 w-full py-1 text-xs text-slate-400 hover:text-white bg-slate-900 rounded-lg text-center"
            >
              Close Comparison View
            </button>
          </div>
        ) : (
          <div className={`relative w-full flex items-center justify-center p-1 ${
            result.aspectRatio === '1:1' ? 'aspect-square' : 'aspect-[4/5]'
          }`}>
            <div className={`relative w-full h-full transition-all duration-300 overflow-hidden ${
              isCirclePreview
                ? 'rounded-full aspect-square max-w-[85%] max-h-[85%] mx-auto border-4 border-amber-500/80 shadow-2xl'
                : 'rounded-xl'
            }`}>
              <img
                src={result.imageUrl}
                alt="Generated African Headshot"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Details Footer - Clean Title & Subtitle without floating periods */}
      <div className="p-4 space-y-3">
        <div>
          <h5 className={`font-bold text-sm truncate ${isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'}`}>
            {title}
          </h5>
          {subtitle && (
            <p className="text-xs opacity-75 truncate mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={() => setShowComparison(!showComparison)}
            className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 border transition-colors ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                : isTerracotta
                ? 'bg-[#F4EBE2] hover:bg-[#EFE8DF] border-[#E8DFD5] text-[#2D241E]'
                : 'bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border-slate-700'
            }`}
            title="Compare with original"
          >
            <Sliders className="h-3.5 w-3.5 text-amber-500" />
            <span>Compare</span>
          </button>

          <button
            type="button"
            onClick={() => setShowInspector(true)}
            className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 border transition-colors ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                : isTerracotta
                ? 'bg-[#F4EBE2] hover:bg-[#EFE8DF] border-[#E8DFD5] text-[#2D241E]'
                : 'bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border-slate-700'
            }`}
            title="Inspect Prompt Guardrails"
          >
            <Terminal className="h-3.5 w-3.5 text-amber-500" />
            <span>Prompt</span>
          </button>

          <button
            type="button"
            onClick={() => setShowDownload(true)}
            className="py-2 px-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-1 shadow-md transition-colors"
            title="Download high-res"
          >
            <Download className="h-3.5 w-3.5 fill-slate-950" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {showInspector && (
        <PromptInspector result={result} onClose={() => setShowInspector(false)} />
      )}
      {showDownload && (
        <DownloadModal result={result} onClose={() => setShowDownload(false)} />
      )}
    </div>
  );
};
