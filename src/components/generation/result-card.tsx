'use client';

import React, { useState } from 'react';
import { GeneratedResult } from '../../lib/types';
import { ComparisonSlider } from './comparison-slider';
import { PromptInspector } from './prompt-inspector';
import { DownloadModal } from './download-modal';
import { Download, Terminal, Sliders } from 'lucide-react';
import { useTheme } from '../../lib/theme-context';

interface ResultCardProps {
  result: GeneratedResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const [showInspector, setShowInspector] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className={`border rounded-2xl overflow-hidden shadow-md transition-all flex flex-col justify-between group ${
      isLight
        ? 'bg-white border-slate-200 hover:border-slate-300'
        : isTerracotta
        ? 'bg-white border-[#E8DFD5] hover:border-[#D6C4B4]'
        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
    }`}>
      {/* Visual Header Image or Interactive Comparison */}
      <div className={`relative w-full p-2 ${
        isLight ? 'bg-slate-100' : isTerracotta ? 'bg-[#FAF7F2]' : 'bg-slate-950'
      }`}>
        {showComparison ? (
          <div className="p-2">
            <ComparisonSlider
              originalUrl={result.originalAnchorUrl}
              generatedUrl={result.imageUrl}
              aspectRatio={result.aspectRatio}
            />
            <button
              type="button"
              onClick={() => setShowComparison(false)}
              className="mt-2 w-full py-1 text-xs text-slate-500 hover:text-slate-800 bg-slate-200/80 rounded-lg text-center"
            >
              Close Comparison View
            </button>
          </div>
        ) : (
          <div className={`relative w-full rounded-xl overflow-hidden ${
            result.aspectRatio === '1:1' ? 'aspect-square' : 'aspect-[4/5]'
          }`}>
            <img
              src={result.imageUrl}
              alt="Generated African Headshot"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-amber-300 border border-amber-500/20 shadow-md">
              {result.aspectRatio} • {result.photoReferenceCount} Photos Dataset
            </div>
          </div>
        )}
      </div>

      {/* Details Footer */}
      <div className="p-4 space-y-3">
        <div>
          <h5 className={`font-bold text-sm truncate ${isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'}`}>
            {result.backgroundTitle}
          </h5>
          <p className="text-xs opacity-75 truncate mt-0.5">
            {result.hairstyleTitle} • {result.outfitTitle}
          </p>
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
