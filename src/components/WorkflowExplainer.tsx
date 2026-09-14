'use client';

import React from 'react';
import { useTheme } from '../lib/theme-context';
import { Upload, Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const WorkflowExplainer: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const steps = [
    {
      num: '01',
      title: 'Upload a few photos',
      desc: 'Upload 1 to 10 casual selfies or existing photos with natural lighting and varied facial expressions.',
      icon: Upload,
      badge: 'Step 1: Input Dataset'
    },
    {
      num: '02',
      title: 'Our AI learns how you look',
      desc: 'Our identity engine preserves bone structure, authentic melanin undertones, and natural afro hair texture.',
      icon: Cpu,
      badge: 'Step 2: Biometric Mapping'
    },
    {
      num: '03',
      title: 'Headshots ready in 15 minutes',
      desc: 'Download high-resolution 8K studio-grade executive portraits ready for LinkedIn, corporate bios & press.',
      icon: Sparkles,
      badge: 'Step 3: Studio Export'
    }
  ];

  return (
    <div className="space-y-4 my-6">
      <div className="text-center space-y-1">
        <h3 className={`font-extrabold text-xl ${
          isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'
        }`}>
          How AfriHeadshot Studio Works in 3 Simple Steps
        </h3>
        <p className="text-xs opacity-75">
          No physical studio appointment, expensive photographers, or tedious editing required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <div
              key={idx}
              className={`relative p-5 rounded-2xl border transition-all flex flex-col justify-between group ${
                isLight
                  ? 'bg-white border-slate-200 shadow-sm hover:border-amber-400'
                  : isTerracotta
                  ? 'bg-white border-[#E8DFD5] shadow-sm hover:border-amber-500'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 font-extrabold">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                    {step.num}
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                  {step.badge}
                </span>

                <h4 className={`font-bold text-base mt-1 ${
                  isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'
                }`}>
                  {step.title}
                </h4>

                <p className="text-xs opacity-75 mt-1.5 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/40 flex items-center justify-between text-[11px] font-semibold text-amber-500">
                <span>Fast AI Pipeline</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
