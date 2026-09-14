'use client';

import React from 'react';
import { X, Check, AlertTriangle, Camera, Sparkles } from 'lucide-react';
import { useTheme } from '../../lib/theme-context';

interface PhotoGuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoGuidelinesModal: React.FC<PhotoGuidelinesModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  if (!isOpen) return null;

  const dos = [
    {
      title: 'Good Natural Lighting',
      desc: 'Face illuminated evenly by daylight or window light with no harsh shadows.',
      icon: '☀️'
    },
    {
      title: 'Neutral Direct Gaze',
      desc: 'Looking towards the camera with a relaxed, natural expression.',
      icon: '👁️'
    },
    {
      title: 'High Resolution Selfies',
      desc: 'Sharp focus showing clear eye details, skin texture, and hair boundaries.',
      icon: '📸'
    },
    {
      title: 'Single Subject Focus',
      desc: 'Head & shoulders framing with only your face in the viewport.',
      icon: '👤'
    }
  ];

  const donts = [
    {
      title: 'Sunglasses & Hats',
      desc: 'Heavy accessories obscuring eyes, forehead, or natural hairline.',
      icon: '🕶️'
    },
    {
      title: 'Blurry & Low-Res Crops',
      desc: 'Pixelated screenshots, compressed images, or distant group photos.',
      icon: '🌫️'
    },
    {
      title: 'Heavy Beauty Filters',
      desc: 'Aggressive skin smoothing, distorted face shapes, or artificial airbrushing.',
      icon: '🪄'
    },
    {
      title: 'Crowded Group Photos',
      desc: 'Multiple people in frame making subject identification ambiguous.',
      icon: '👥'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className={`relative max-w-3xl w-full rounded-2xl border p-6 sm:p-8 shadow-2xl my-8 ${
        isLight
          ? 'bg-white border-slate-200 text-slate-900'
          : isTerracotta
          ? 'bg-[#FAF7F2] border-[#E8DFD5] text-[#2D241E]'
          : 'bg-slate-900 border-slate-800 text-white'
      }`}>
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/20 hover:bg-slate-800/40 text-slate-400 hover:text-white transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-wider">
            <Camera className="h-3.5 w-3.5" />
            <span>Optimal Subject Recognition Guide</span>
          </div>
          <h3 className="text-2xl font-bold">Good vs Bad Reference Photos</h3>
          <p className="text-xs opacity-75">
            Follow these simple guidelines so our biometric feature extractor preserves your exact identity, bone structure, and melanin tones.
          </p>
        </div>

        {/* Comparative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DOs Section */}
          <div className={`p-5 rounded-2xl border ${
            isLight
              ? 'bg-emerald-50/60 border-emerald-200'
              : isTerracotta
              ? 'bg-[#EBF5ED] border-[#B3DDC0]'
              : 'bg-emerald-950/20 border-emerald-500/30'
          }`}>
            <div className="flex items-center space-x-2 text-emerald-600 mb-4 pb-2 border-b border-emerald-500/20">
              <div className="h-6 w-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <h4 className="font-bold text-base">DO: Recommended Photos</h4>
            </div>

            <div className="space-y-3">
              {dos.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs">
                  <span className="text-base select-none">{item.icon}</span>
                  <div>
                    <h5 className="font-bold text-emerald-700 dark:text-emerald-400">{item.title}</h5>
                    <p className="opacity-80 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DON'Ts Section */}
          <div className={`p-5 rounded-2xl border ${
            isLight
              ? 'bg-rose-50/60 border-rose-200'
              : isTerracotta
              ? 'bg-[#FDF0ED] border-[#F4C4BC]'
              : 'bg-rose-950/20 border-rose-500/30'
          }`}>
            <div className="flex items-center space-x-2 text-rose-600 mb-4 pb-2 border-b border-rose-500/20">
              <div className="h-6 w-6 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xs">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-base">DON'T: Photos to Avoid</h4>
            </div>

            <div className="space-y-3">
              {donts.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs">
                  <span className="text-base select-none">{item.icon}</span>
                  <div>
                    <h5 className="font-bold text-rose-700 dark:text-rose-400">{item.title}</h5>
                    <p className="opacity-80 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-6 pt-4 border-t border-slate-200/40 flex items-center justify-between text-xs">
          <span className="text-amber-500 font-semibold flex items-center space-x-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Optimal: Upload 4 to 10 photos from varied angles</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md transition-all"
          >
            Got It, Ready to Upload
          </button>
        </div>
      </div>
    </div>
  );
};
