'use client';

import React from 'react';
import { Sparkles, ArrowRight, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../lib/theme-context';

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  // Sample African Executive Portrait Mosaic URLs
  const mosaicPhotos = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
  ];

  const handleScrollToStudio = () => {
    const studioElem = document.getElementById('studio');
    if (studioElem) {
      studioElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`relative overflow-hidden pt-12 pb-16 border-b transition-colors duration-300 ${
      isLight
        ? 'bg-gradient-to-b from-slate-100 via-white to-slate-50 border-slate-200 text-slate-900'
        : isTerracotta
        ? 'bg-gradient-to-b from-[#F4EBE2] via-[#FAF7F2] to-[#F4EBE2] border-[#E8DFD5] text-[#2D241E]'
        : 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-slate-800/60 text-white'
    }`}>
      {/* Background Mosaic Grid Architecture */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none overflow-hidden select-none">
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 transform -rotate-3 scale-110">
          {mosaicPhotos.map((url, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-md hover:scale-105 transition-transform duration-500"
            >
              <img src={url} alt="Mosaic headshot avatar" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Social Proof Pill (Directly above headline) */}
          <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border text-xs font-bold shadow-sm transition-all ${
            isLight
              ? 'bg-amber-100/90 border-amber-300 text-amber-950'
              : isTerracotta
              ? 'bg-[#EFE8DF] border-[#D6C4B4] text-[#A34B24]'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          }`}>
            <div className="flex items-center text-amber-500 space-x-0.5">
              <Star className="h-3.5 w-3.5 fill-amber-500" />
              <Star className="h-3.5 w-3.5 fill-amber-500" />
              <Star className="h-3.5 w-3.5 fill-amber-500" />
              <Star className="h-3.5 w-3.5 fill-amber-500" />
              <Star className="h-3.5 w-3.5 fill-amber-500" />
            </div>
            <span>★★★★★ 4.9/5 Rated by African Executives & Leaders Across 25+ Countries</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Turn your selfies into <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600">
              professional headshots
            </span>
          </h1>

          {/* Prominent Zero-Risk Subhead */}
          <p className={`text-lg md:text-xl font-medium leading-relaxed ${
            isLight ? 'text-slate-700' : isTerracotta ? 'text-[#5A4D41]' : 'text-slate-300'
          }`}>
            Free high-res preview. Download your favorites only when you love them.
          </p>

          {/* Primary CTA Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleScrollToStudio}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Sparkles className="h-5 w-5 fill-slate-950" />
              <span>Create your Headshots Now For FREE →</span>
            </button>
          </div>

          {/* Trust Guarantees Row */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs opacity-80 font-semibold">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Authentic 4C Hair & Melanin Preserved</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>2048x2048 PNG Export</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
