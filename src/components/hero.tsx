'use client';

import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Camera, ArrowRight } from 'lucide-react';
import { useTheme } from '../lib/theme-context';

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  return (
    <section className={`relative overflow-hidden pt-10 pb-14 border-b transition-colors duration-300 ${
      isLight
        ? 'bg-gradient-to-b from-slate-100 via-white to-slate-50 border-slate-200 text-slate-900'
        : isTerracotta
        ? 'bg-gradient-to-b from-[#F4EBE2] via-[#FAF7F2] to-[#F4EBE2] border-[#E8DFD5] text-[#2D241E]'
        : 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-slate-800/60 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Tagline Badge */}
          <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wide ${
            isLight
              ? 'bg-amber-100/80 border-amber-300 text-amber-900'
              : isTerracotta
              ? 'bg-[#EFE8DF] border-[#D6C4B4] text-[#A34B24]'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          }`}>
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Next-Gen AI Headshot Studio for African Leadership</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Authentic Studio Headshots for <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600">
              African Professionals
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-base md:text-lg leading-relaxed font-normal ${
            isLight ? 'text-slate-600' : isTerracotta ? 'text-[#615145]' : 'text-slate-300'
          }`}>
            Upload up to <strong className="font-semibold text-amber-600">10 reference photos</strong>. Our System Prompt Injector strictly preserves your authentic facial structure, natural afro hair texture, and rich melanin skin tones.
          </p>

          {/* Feature Highlights Grid */}
          <div className="pt-2 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className={`p-3.5 rounded-xl border transition-colors ${
              isLight
                ? 'bg-white border-slate-200 shadow-sm'
                : isTerracotta
                ? 'bg-white border-[#E8DFD5] shadow-sm'
                : 'bg-slate-900/80 border-slate-800'
            }`}>
              <div className="flex items-center space-x-2 text-amber-500 mb-1">
                <CheckCircle2 className="h-4 w-4" />
                <span className={`font-bold text-sm ${isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'}`}>
                  50 Backgrounds
                </span>
              </div>
              <p className="text-xs opacity-75">Lagos skylines, Sandton hubs, terracotta & studio gradients</p>
            </div>

            <div className={`p-3.5 rounded-xl border transition-colors ${
              isLight
                ? 'bg-white border-slate-200 shadow-sm'
                : isTerracotta
                ? 'bg-white border-[#E8DFD5] shadow-sm'
                : 'bg-slate-900/80 border-slate-800'
            }`}>
              <div className="flex items-center space-x-2 text-amber-500 mb-1">
                <CheckCircle2 className="h-4 w-4" />
                <span className={`font-bold text-sm ${isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'}`}>
                  11 Hairstyles
                </span>
              </div>
              <p className="text-xs opacity-75">Low fades, 360 waves, locs, box braids & Senegalese twists</p>
            </div>

            <div className={`p-3.5 rounded-xl border transition-colors ${
              isLight
                ? 'bg-white border-slate-200 shadow-sm'
                : isTerracotta
                ? 'bg-white border-[#E8DFD5] shadow-sm'
                : 'bg-slate-900/80 border-slate-800'
            }`}>
              <div className="flex items-center space-x-2 text-amber-500 mb-1">
                <CheckCircle2 className="h-4 w-4" />
                <span className={`font-bold text-sm ${isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'}`}>
                  6 Formal Outfits
                </span>
              </div>
              <p className="text-xs opacity-75">Senator suits, Agbada fusion & bespoke navy blazers</p>
            </div>

            <div className={`p-3.5 rounded-xl border transition-colors ${
              isLight
                ? 'bg-white border-slate-200 shadow-sm'
                : isTerracotta
                ? 'bg-white border-[#E8DFD5] shadow-sm'
                : 'bg-slate-900/80 border-slate-800'
            }`}>
              <div className="flex items-center space-x-2 text-amber-500 mb-1">
                <CheckCircle2 className="h-4 w-4" />
                <span className={`font-bold text-sm ${isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'}`}>
                  2048x2048 Export
                </span>
              </div>
              <p className="text-xs opacity-75">LinkedIn ready with 1:1 and 4:5 aspect ratio presets</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
