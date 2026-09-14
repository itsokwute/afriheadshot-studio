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

// ─── Curated high-fidelity Unsplash portrait URLs ──────────────────────────
// Each entry is a genuine Black/African professional portrait.
// Dimensions: 600×800 (portrait ratio) for the grid cells.
const PORTRAIT_POOL: PortraitEntry[] = [
  {
    src: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=600&q=80',
    alt: 'Black male executive – charcoal suit, confident gaze',
    label: 'Executive studio headshot',
    selfie: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=200&q=70',
  },
  {
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    alt: 'Black African woman – corporate blazer, natural hair',
    label: 'Corporate headshot',
    selfie: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=70',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    alt: 'Black male professional – tailored navy suit',
    label: 'LinkedIn headshot',
    selfie: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=70',
  },
  {
    src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
    alt: 'Black African woman – confident executive portrait',
    label: 'Women headshot',
    selfie: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=70',
  },
  {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    alt: 'Black male CEO – executive blazer, authoritative posture',
    label: 'CEO headshot',
    selfie: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=70',
  },
  {
    src: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    alt: 'Black male professional – white dress shirt, clean studio',
    label: 'Studio headshot',
    selfie: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=70',
  },
  {
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    alt: 'Black male executive – confident boardroom portrait',
    label: 'Boardroom headshot',
    selfie: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=70',
  },
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    alt: 'Black African woman – elegant professional portrait',
    label: 'Executive portrait',
    selfie: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=70',
  },
  {
    src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    alt: 'Black male professional – crisp studio lighting, suit',
    label: 'Corporate headshot',
    selfie: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=70',
  },
  {
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    alt: 'Black African woman – bold executive portrait',
    label: 'Executive headshot',
    selfie: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=70',
  },
];

// Tile 40 cells (5 rows × 8 cols) by cycling through the pool
const GRID_PORTRAITS: PortraitEntry[] = Array.from(
  { length: 40 },
  (_, i) => PORTRAIT_POOL[i % PORTRAIT_POOL.length]
);

// Selfie for the modal polaroid badge (casual/candid shot)
const SELFIE_CASUAL =
  'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=300&q=75';

export const Hero: React.FC<HeroProps> = ({ hoveredCategory }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPortrait, setSelectedPortrait] = useState<PortraitEntry>(PORTRAIT_POOL[0]);

  const handlePortraitClick = useCallback((portrait: PortraitEntry) => {
    setSelectedPortrait(portrait);
    setModalOpen(true);
  }, []);

  const handleScrollToStudio = () => {
    const el = document.getElementById('studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // ─── Dynamic headline keyed on hovered mega menu category ───────────────
  const renderHeadline = () => {
    switch (hoveredCategory) {
      case 'LinkedIn':
        return (
          <>
            Stunning{' '}
            <span className="text-blue-600 underline decoration-blue-400/40 underline-offset-4">
              LinkedIn headshots
            </span>{' '}
            that make you stand out
          </>
        );
      case 'Corporate':
        return (
          <>
            Incredible{' '}
            <span className="text-blue-600 underline decoration-blue-400/40 underline-offset-4">
              corporate headshots
            </span>{' '}
            that speak for you
          </>
        );
      case 'CEO':
      case 'Executive':
        return (
          <>
            Amazing{' '}
            <span className="text-blue-600 underline decoration-blue-400/40 underline-offset-4">
              CEO headshots
            </span>{' '}
            that make you look one instantly
          </>
        );
      case 'Medical':
        return (
          <>
            Trusted{' '}
            <span className="text-blue-600 underline decoration-blue-400/40 underline-offset-4">
              doctor headshots
            </span>{' '}
            that inspire confidence
          </>
        );
      case 'Legal':
        return (
          <>
            Powerful{' '}
            <span className="text-blue-600 underline decoration-blue-400/40 underline-offset-4">
              lawyer headshots
            </span>{' '}
            that command the room
          </>
        );
      case 'Heritage':
        return (
          <>
            Regal{' '}
            <span className="text-blue-600 underline decoration-blue-400/40 underline-offset-4">
              heritage headshots
            </span>{' '}
            in senator suits &amp; ankara accents
          </>
        );
      default:
        return (
          <>
            Turn your selfies into{' '}
            <span className="text-blue-600 underline decoration-blue-400/40 underline-offset-4">
              professional headshots
            </span>
          </>
        );
    }
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
        style={{ minHeight: '580px' }}
      >
        {/* ─── Dense 5-row × 8-col portrait mosaic ─────────────────────────── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-auto select-none">
          <div
            className="grid gap-1 transform -rotate-1 scale-[1.06] origin-center"
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

                {/* Gradient scrim — deeper on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300" />

                {/* "Click to view" pill — visible on hover */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
                    hoveredIdx === i ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span className="bg-white text-slate-900 font-bold text-[9px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg border border-slate-200 whitespace-nowrap backdrop-blur-sm">
                    Click to view
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Scrim over mosaic so card text is legible ──────────────────── */}
        <div
          className={`absolute inset-0 z-10 pointer-events-none ${
            isLight
              ? 'bg-slate-50/72'
              : isTerracotta
              ? 'bg-[#FAF7F2]/72'
              : 'bg-slate-950/76'
          } backdrop-blur-[1px]`}
        />

        {/* ─── Floating Centered Hero Card ────────────────────────────────── */}
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

            {/* Dynamic Headline — min-height prevents layout jump on swap */}
            <h1
              className="text-3xl sm:text-4xl md:text-[2.55rem] font-extrabold tracking-tight leading-[1.15] mb-4 transition-all duration-300"
              style={{ minHeight: '7rem' }}
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

            {/* Primary CTA */}
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

      {/* ─── Click-to-View Modal ─────────────────────────────────────────── */}
      <ClickToViewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        portraitUrl={selectedPortrait.src.replace('w=600', 'w=900')}
        selfieUrl={SELFIE_CASUAL}
        title={selectedPortrait.label}
      />
    </>
  );
};
