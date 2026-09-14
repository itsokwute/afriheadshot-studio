'use client';

import React, { useEffect } from 'react';
import { X, CheckCircle2, Upload, Brain, Download } from 'lucide-react';
import { useTheme } from '../lib/theme-context';

interface ClickToViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  portraitUrl?: string;
  selfieUrl?: string;
  title?: string;
}

const STEPS = [
  { icon: Upload, label: 'Upload a few photos', detail: 'Upload 4–10 casual selfies or reference photos of yourself.' },
  { icon: Brain, label: 'Our AI learns how you look', detail: 'Biometric extraction preserves bone structure, skin tone & hair texture.' },
  { icon: Download, label: 'Headshots ready in 15 minutes', detail: 'Download 2048×2048 PNG studio portraits ready for LinkedIn & resumes.' },
];

export const ClickToViewModal: React.FC<ClickToViewModalProps> = ({
  isOpen,
  onClose,
  portraitUrl = '/p-m1.png',
  selfieUrl = '/p-selfie.png',
  title = 'Executive studio headshot',
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  // Escape key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCtaClick = () => {
    onClose();
    const el = document.getElementById('studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md overflow-y-auto"
      style={{ animation: 'fadeIn 0.18s ease' }}
    >
      {/* Modal container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative max-w-4xl w-full rounded-2xl border overflow-hidden shadow-2xl my-4 grid grid-cols-1 md:grid-cols-2 ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : isTerracotta
            ? 'bg-[#FAF7F2] border-[#E8DFD5] text-[#2D241E]'
            : 'bg-slate-900 border-slate-800 text-white'
        }`}
        style={{ animation: 'slideUp 0.22s cubic-bezier(0.34,1.56,0.64,1)' }}
      >
        {/* ─── Close Button ─── */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white transition-all shadow-lg backdrop-blur"
          title="Close (Esc)"
        >
          <X className="h-4 w-4" />
        </button>

        {/* ─── Left: Full Portrait + Selfie Polaroid ─── */}
        <div className="relative bg-slate-950 overflow-hidden" style={{ aspectRatio: '4/5', minHeight: '320px' }}>
          <img
            src={portraitUrl}
            alt={`AI generated: ${title}`}
            className="w-full h-full object-cover object-top"
          />

          {/* "AI GENERATED" chip */}
          <div className="absolute top-3 left-3 bg-black/70 text-white text-[9px] font-black tracking-wider uppercase px-2 py-1 rounded-md backdrop-blur">
            AI GENERATED
          </div>

          {/* Polaroid selfie badge — bottom left, slightly rotated */}
          <div className="absolute bottom-4 left-4 p-1.5 bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-900 w-[90px] sm:w-[110px] transform -rotate-3 hover:rotate-0 transition-transform duration-300 cursor-default">
            <div className="aspect-square w-full rounded-lg overflow-hidden mb-1">
              <img
                src={selfieUrl}
                alt="Casual selfie input"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[8px] font-bold text-center leading-tight text-slate-700">Casual selfie input</p>
          </div>
        </div>

        {/* ─── Right: 3 Steps + CTA ─── */}
        <div className={`p-6 sm:p-8 flex flex-col justify-between gap-6 ${
          isLight ? '' : isTerracotta ? '' : ''
        }`}>
          <div className="space-y-5">
            {/* Eyebrow */}
            <span className="inline-block text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Real headshots of people just like you
            </span>

            {/* Headline */}
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              Get stunning headshots in{' '}
              <span className="text-blue-600">3 simple steps</span>
            </h3>

            {/* Steps */}
            <div className="space-y-4 pt-1">
              {STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="h-7 w-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                      {idx + 1}
                    </div>
                    <div>
                      <h5 className="font-bold text-sm leading-snug">{step.label}</h5>
                      <p className={`text-xs mt-0.5 leading-relaxed ${
                        isLight ? 'text-slate-500' : isTerracotta ? 'text-[#6B5C50]' : 'text-slate-400'
                      }`}>
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div>
            <button
              type="button"
              onClick={handleCtaClick}
              className="w-full py-4 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm sm:text-base flex items-center justify-center shadow-xl transition-all active:scale-[0.98] cursor-pointer"
            >
              Create your headshots now →
            </button>
            <p className={`text-center text-[10px] mt-2 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
              Free preview · No credit card required
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  );
};
