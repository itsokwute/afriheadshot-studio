'use client';

import React from 'react';
import { GenerationProgress } from '../../lib/types';
import { Loader2, ShieldCheck, Sparkles, Cpu, CheckCircle2 } from 'lucide-react';

interface GenerationQueueProps {
  progress: GenerationProgress;
}

export const GenerationQueue: React.FC<GenerationQueueProps> = ({ progress }) => {
  const steps = [
    { key: 'validating', label: '1. Validating 10 Reference Photos & Facial Feature Map' },
    { key: 'injecting', label: '2. Injecting Authentic African Melanin & Texture Guardrails' },
    { key: 'generating', label: '3. Synthesizing Hair, Attire & Background Lighting' },
    { key: 'rendering', label: '4. Rendering High-Resolution 2048x2048 Canvas' }
  ];

  return (
    <div className="bg-slate-950/90 border border-amber-500/30 rounded-2xl p-8 max-w-xl mx-auto space-y-6 text-center shadow-2xl shadow-amber-500/10">
      {/* Animated Spinner Icon */}
      <div className="relative inline-flex items-center justify-center">
        <div className="h-20 w-20 rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
        </div>
        <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping opacity-25 pointer-events-none" />
      </div>

      {/* Progress Message */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold text-amber-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI Studio Engine Processing</span>
        </div>
        <h4 className="text-xl font-bold text-white tracking-tight">{progress.message}</h4>
        <p className="text-xs text-slate-400 font-mono">{progress.stepDetails || 'Generating high-resolution headshot...'}</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 text-left">
        <div className="flex justify-between text-xs font-semibold text-slate-300">
          <span>Generation Pipeline</span>
          <span className="text-amber-400 font-mono">{progress.percent}%</span>
        </div>
        <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 transition-all duration-500 rounded-full"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
      </div>

      {/* Step Checklist */}
      <div className="pt-3 border-t border-slate-800 space-y-2 text-left text-xs">
        {steps.map((step, idx) => {
          const isDone = progress.percent >= (idx + 1) * 25;
          return (
            <div key={step.key} className="flex items-center space-x-2.5">
              {isDone ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-slate-700 shrink-0" />
              )}
              <span className={isDone ? 'text-slate-200 font-medium' : 'text-slate-500'}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
