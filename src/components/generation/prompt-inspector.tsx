'use client';

import React from 'react';
import { GeneratedResult } from '../../lib/types';
import { ShieldCheck, Copy, Check, X, Terminal, Cpu } from 'lucide-react';

interface PromptInspectorProps {
  result: GeneratedResult;
  onClose: () => void;
}

export const PromptInspector: React.FC<PromptInspectorProps> = ({ result, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.positivePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-5 p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <Terminal className="h-5 w-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">Prompt & Authenticity Inspector</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Technical Summary Pills */}
        <div className="grid grid-cols-3 gap-2 text-xs font-mono">
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Seed</span>
            <span className="text-amber-400 font-bold">{result.seed}</span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Dataset Count</span>
            <span className="text-emerald-400 font-bold">{result.photoReferenceCount} Photos</span>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Aspect Ratio</span>
            <span className="text-white font-bold">{result.aspectRatio}</span>
          </div>
        </div>

        {/* Positive Prompt Block */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">Injected Positive Prompt Tokens</span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center space-x-1 text-xs text-amber-400 hover:text-amber-300"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Prompt'}</span>
            </button>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-xs text-slate-300 font-mono leading-relaxed max-h-36 overflow-y-auto">
            {result.positivePrompt}
          </div>
        </div>

        {/* Negative Guardrails Block */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-red-400 flex items-center space-x-1">
            <ShieldCheck className="h-3.5 w-3.5 text-red-400" />
            <span>Strict Anti-Lightening & Anti-Distortion Negative Guardrails</span>
          </span>
          <div className="bg-red-950/20 border border-red-900/30 p-3.5 rounded-xl text-xs text-red-300 font-mono leading-relaxed max-h-24 overflow-y-auto">
            {result.negativePrompt}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
