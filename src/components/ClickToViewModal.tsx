'use client';

import React, { useEffect } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTheme } from '../lib/theme-context';

interface ClickToViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  portraitUrl?: string;
  selfieUrl?: string;
  title?: string;
}

export const ClickToViewModal: React.FC<ClickToViewModalProps> = ({
  isOpen,
  onClose,
  portraitUrl = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  selfieUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  title = 'Executive Studio Headshot'
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  // Handle Escape Key Close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCtaClick = () => {
    onClose();
    const studioElem = document.getElementById('studio');
    if (studioElem) {
      studioElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      {/* Centered Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative max-w-4xl w-full rounded-2xl border overflow-hidden shadow-2xl transition-all my-8 grid grid-cols-1 md:grid-cols-2 ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : isTerracotta
            ? 'bg-[#FAF7F2] border-[#E8DFD5] text-[#2D241E]'
            : 'bg-slate-900 border-slate-800 text-white'
        }`}
      >
        {/* Close Icon Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white transition-all backdrop-blur shadow-lg"
          title="Close (Esc)"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side: Full-Size Portrait with Casual Selfie Polaroid Badge */}
        <div className="relative aspect-[4/5] w-full bg-slate-950 overflow-hidden flex items-center justify-center">
          <img
            src={portraitUrl}
            alt="AI Generated Studio Portrait"
            className="w-full h-full object-cover"
          />

          {/* AI GENERATED Badge */}
          <div className="absolute top-4 left-4 bg-black/70 text-white text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-md backdrop-blur uppercase shadow-md">
            AI GENERATED
          </div>

          {/* Polaroid / Casual Selfie Input Badge in Bottom Corner */}
          <div className="absolute bottom-4 left-4 p-1.5 bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-900 max-w-[130px] transform -rotate-3 hover:rotate-0 transition-transform">
            <div className="aspect-square w-full rounded-lg overflow-hidden mb-1">
              <img src={selfieUrl} alt="Casual selfie input" className="w-full h-full object-cover" />
            </div>
            <p className="text-[9px] font-bold text-center leading-tight">Casual selfie input</p>
          </div>
        </div>

        {/* Right Side: 3 Simple Steps Conversion Content */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Quick conversion guide
            </span>

            {/* Exact Header Specified */}
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              Get stunning headshots in{' '}
              <span className="text-blue-600">3 simple steps</span>
            </h3>

            {/* 3 Simple Steps List */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3 text-xs">
                <div className="h-6 w-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h5 className="font-bold text-sm">Upload a few photos</h5>
                  <p className="opacity-75 mt-0.5 leading-relaxed">
                    Upload 4-10 casual selfies or existing reference photos.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <div className="h-6 w-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h5 className="font-bold text-sm">Our AI learns how you look</h5>
                  <p className="opacity-75 mt-0.5 leading-relaxed">
                    Biometric feature extractor preserves bone structure, skin tone & afro hair texture.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <div className="h-6 w-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h5 className="font-bold text-sm">Headshots ready in 15 minutes</h5>
                  <p className="opacity-75 mt-0.5 leading-relaxed">
                    Download 2048x2048 PNG studio portraits ready for LinkedIn & resumes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width CTA Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCtaClick}
              className="w-full py-4 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm sm:text-base flex items-center justify-center space-x-2 shadow-xl transition-all active:scale-98 cursor-pointer"
            >
              <span>Create your headshots now →</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
