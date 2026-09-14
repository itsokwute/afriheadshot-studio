'use client';

import React, { useState, useCallback } from 'react';
import { Star } from 'lucide-react';
import { useTheme } from '../lib/theme-context';
import { ClickToViewModal } from './ClickToViewModal';

interface HeroProps {
  hoveredCategory?: string | null;
}

interface PortraitEntry {
  src: string;
  alt: string;
  selfie?: string;
  label?: string;
}

// 8 real AI-generated Black & African professional portraits (hosted in /public)
const PORTRAITS: PortraitEntry[] = [
  { src: '/p-m1.png', alt: 'Black male executive – fade haircut, charcoal suit', label: 'Executive studio headshot', selfie: '/p-selfie.png' },
  { src: '/p-f1.png', alt: 'Black female executive – locs, navy blazer', label: 'Corporate studio headshot', selfie: '/p-selfie.png' },
  { src: '/p-m2.png', alt: 'Black male professional – 360 waves, navy suit', label: 'LinkedIn headshot', selfie: '/p-selfie.png' },
  { src: '/p-f2.png', alt: 'Black African woman – box braids, white blazer', label: 'Women headshot', selfie: '/p-selfie.png' },
  { src: '/p-m3.png', alt: 'Nigerian executive – senator attire, agbada', label: 'Heritage formal headshot', selfie: '/p-selfie.png' },
  { src: '/p-f3.png', alt: 'Black African female doctor – white coat', label: 'Doctor headshot', selfie: '/p-selfie.png' },
  { src: '/p-m4.png', alt: 'Black male lawyer – dreadlocks, black suit', label: 'Lawyer headshot', selfie: '/p-selfie.png' },
  { src: '/p-m1.png', alt: 'Black CEO executive – fade haircut, boardroom', label: 'CEO headshot', selfie: '/p-selfie.png' },
];

// Repeat enough times to fill a dense 5-row wall (40+ cells)
const GRID_PORTRAITS: PortraitEntry[] = Array.from({ length: 5 }, () => PORTRAITS).flat();

export const Hero: React.FC<HeroProps> = ({ hoveredCategory }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPortrait, setSelectedPortrait] = useState<PortraitEntry>(PORTRAITS[0]);

  const handlePortraitClick = useCallback((portrait: PortraitEntry) => {
    setSelectedPortrait(portrait);
    setModalOpen(true);
  }, []);

  const handleScrollToStudio = () => {
    const el = document.getElementById('studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Dynamic headline based on hovered mega menu category
  const renderHeadline = () => {
    if (hoveredCategory === 'LinkedIn') {
      return (
        <>
          Stunning{' '}
          <span className="text-blue-600 underline decoration-blue-400/40 underline-offset-4">
            LinkedIn headshots
          </span>{' '}
          that make you stand out
        </>
      );
    }
    if (hoveredCategory === 'Corporate') {
      return (
        <>
          Incredible{' '}
          <span className="text-blue-600 underline decoration-blue-400/40 underline-offset-4">
            corporate headshots
          </span>{' '}
          that speak for you
        </>
      );
    }
    if (hoveredCategory === 'CEO' || hoveredCategory === 'Executive') {
      return (
        <>
          Amazing{' '}
          <span className="text-blue-600 underline decoration-blue-400/40 underline-offset-4">
            CEO headshots
          </span>{' '}
          that make you look one instantly
        </>
      );
    }
    if (hoveredCategory === 'Medical') {
      return (
        <>
          Trusted{' '}
          <span className="text-blue-600 underline decoration-blue-400/40 underline-offset-4">
            doctor headshots
          </span>{' '}
          that inspire confidence
        </>
      );
    }
    if (hoveredCategory === 'Legal') {
      return (
        <>
          Powerful{' '}
          <span className="text-blue-600 underline decoration-blue-400/40 underline-offset-4">
            lawyer headshots
          </span>{' '}
          that command the room
        </>
      );
    }
    if (hoveredCategory === 'Heritage') {
      return (
        <>
          Regal{' '}
          <span className="text-blue-600 underline decoration-blue-400/40 underline-offset-4">
            heritage headshots
          </span>{' '}
          in senator suits & ankara accents
        </>
      );
    }
    // Default
    return (
      <>
        Turn your selfies into{' '}
        <span className="text-blue-600 underline decoration-blue-400/40 underline-offset-4">
          professional headshots
        </span>
      </>
    );
  };

  return (
    <>
      <section
        className={`relative overflow-hidden border-b transition-colors duration-300 ${
          isLight
            ? 'bg-slate-50 border-slate-200 text-slate-900'
            : isTerracotta
            ? 'bg-[#FAF7F2] border-[#E8DFD5] text-[#2D241E]'
            : 'bg-slate-950 border-slate-900 text-white'
        }`}
        style={{ minHeight: '560px' }}
      >
        {/* ─── Dense 5-row portrait mosaic (absolutely positioned, fills full section) ─── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-auto select-none">
          <div
            className="grid gap-1.5 transform -rotate-1 scale-[1.08] origin-center"
            style={{ gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' }}
          >
            {GRID_PORTRAITS.map((portrait, i) => (
              <div
                key={i}
                className="relative group cursor-pointer overflow-hidden"
                style={{ aspectRatio: '3/4' }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => handlePortraitClick(portrait)}
              >
                {/* Portrait image */}
                <img
                  src={portrait.src}
                  alt={portrait.alt}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  draggable={false}
                />

                {/* Dark gradient scrim (always subtle, stronger on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* "Click to view" hover pill — centered */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
                    hoveredIdx === i ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span className="bg-white text-slate-900 font-bold text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg border border-slate-200 whitespace-nowrap backdrop-blur-sm">
                    Click to view
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Overlay scrim so card text is legible over the mosaic ─── */}
        <div
          className={`absolute inset-0 z-10 pointer-events-none ${
            isLight
              ? 'bg-slate-50/70'
              : isTerracotta
              ? 'bg-[#FAF7F2]/70'
              : 'bg-slate-950/75'
          } backdrop-blur-[1px]`}
        />

        {/* ─── Floating Centered White Hero Card ─── */}
        <div className="relative z-20 flex items-center justify-center px-4 py-16 sm:py-20 lg:py-24 pointer-events-none">
          <div
            className={`max-w-lg w-full text-center p-8 sm:p-10 rounded-2xl border shadow-2xl transition-all duration-300 pointer-events-auto ${
              isLight
                ? 'bg-white border-slate-100 text-slate-900 shadow-slate-300/60'
                : isTerracotta
                ? 'bg-white border-[#E8DFD5] text-[#2D241E] shadow-amber-900/10'
                : 'bg-slate-900/95 border-slate-700 text-white shadow-black/80 backdrop-blur-xl'
            }`}
          >
            {/* Trustpilot Pill */}
            <div className="inline-flex items-center space-x-2 bg-[#00b67a] text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm mb-6">
              <div className="flex items-center space-x-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-300 stroke-none" />
                ))}
              </div>
              <span>Rated 4.9/5 with 16,865+ reviews on Trustpilot</span>
            </div>

            {/* Dynamic Headline */}
            <h1
              className="text-3xl sm:text-4xl md:text-[2.6rem] font-extrabold tracking-tight leading-[1.15] mb-4 transition-all duration-300"
              style={{ minHeight: '7.5rem' }}
            >
              {renderHeadline()}
            </h1>

            {/* Subtitle */}
            <p
              className={`text-sm sm:text-base font-medium leading-relaxed mb-8 ${
                isLight
                  ? 'text-slate-600'
                  : isTerracotta
                  ? 'text-[#5A4D41]'
                  : 'text-slate-300'
              }`}
            >
              Free high-res preview. Download only when you love them.
            </p>

            {/* Primary CTA Button */}
            <button
              type="button"
              onClick={handleScrollToStudio}
              className="w-full inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base sm:text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              Create your headshots now for free →
            </button>
          </div>
        </div>
      </section>

      {/* ─── Click-to-View Conversion Modal ─── */}
      <ClickToViewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        portraitUrl={selectedPortrait.src}
        selfieUrl={selectedPortrait.selfie || '/p-selfie.png'}
        title={selectedPortrait.label}
      />
    </>
  );
};
