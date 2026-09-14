'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { useTheme } from '../lib/theme-context';

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  // 20+ Curated Portraits of Black Male & Female Executives
  const mosaicPortraits = [
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
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80'
  ];

  const handleScrollToStudio = () => {
    const studioElem = document.getElementById('studio');
    if (studioElem) {
      studioElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`relative overflow-hidden pt-12 pb-20 border-b transition-colors duration-300 ${
      isLight
        ? 'bg-slate-50 border-slate-200 text-slate-900'
        : isTerracotta
        ? 'bg-[#FAF7F2] border-[#E8DFD5] text-[#2D241E]'
        : 'bg-slate-950 border-slate-900 text-white'
    }`}>
      {/* Full-Bleed Background Mosaic Grid of 20+ Black Executive Portraits */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden select-none">
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-10 gap-3 transform -rotate-2 scale-110">
          {mosaicPortraits.map((url, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-slate-300/40 shadow-sm">
              <img src={url} alt="Black Professional Executive Headshot" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Dim Overlay */}
      <div className={`absolute inset-0 z-0 ${
        isLight ? 'bg-slate-50/75 backdrop-blur-[2px]' : isTerracotta ? 'bg-[#FAF7F2]/75 backdrop-blur-[2px]' : 'bg-slate-950/80 backdrop-blur-[2px]'
      }`} />

      {/* Centered Elevated White Container */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 pt-4">
        <div className={`max-w-xl mx-auto text-center p-8 sm:p-10 rounded-2xl border shadow-2xl transition-all ${
          isLight
            ? 'bg-white border-slate-100 text-slate-900 shadow-slate-200/80'
            : isTerracotta
            ? 'bg-white border-[#E8DFD5] text-[#2D241E] shadow-amber-900/10'
            : 'bg-slate-900/95 border-slate-800 text-white shadow-black/80 backdrop-blur-xl'
        }`}>
          
          {/* Rating Pill: Exact Emerald Green Badge (#00b67a) */}
          <div className="inline-flex items-center space-x-2 bg-[#00b67a] text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm mb-6">
            <div className="flex items-center space-x-0.5 text-amber-300">
              <Star className="h-3.5 w-3.5 fill-amber-300 stroke-none" />
              <Star className="h-3.5 w-3.5 fill-amber-300 stroke-none" />
              <Star className="h-3.5 w-3.5 fill-amber-300 stroke-none" />
              <Star className="h-3.5 w-3.5 fill-amber-300 stroke-none" />
              <Star className="h-3.5 w-3.5 fill-amber-300 stroke-none" />
            </div>
            <span>★★★★★ Rated 4.9/5 with 16,800+ reviews</span>
          </div>

          {/* Heading in Strict Sentence Case */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] mb-4">
            Turn your selfies into{' '}
            <span className="text-blue-600 underline decoration-blue-500/30 underline-offset-4">
              professional headshots
            </span>
          </h1>

          {/* Subtitle in Strict Sentence Case */}
          <p className={`text-base sm:text-lg font-medium leading-relaxed mb-8 ${
            isLight ? 'text-slate-600' : isTerracotta ? 'text-[#5A4D41]' : 'text-slate-300'
          }`}>
            Free high-resolution AI generation preserving authentic melanin tones, natural afro hair texture, and cultural formal attire.
          </p>

          {/* CTA Button in Strict Sentence Case */}
          <button
            type="button"
            onClick={handleScrollToStudio}
            className="w-full inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-98 cursor-pointer"
          >
            <span>Create your headshots now for free →</span>
          </button>
        </div>
      </div>
    </section>
  );
};
