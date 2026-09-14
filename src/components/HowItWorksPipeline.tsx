'use client';

import React from 'react';
import { useTheme } from '../lib/theme-context';
import { ArrowDown, Cpu } from 'lucide-react';

export const HowItWorksPipeline: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  // 4 Casual Selfies of a Black Professional
  const inputSelfies = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80'
  ];

  // 4 Polished Executive Output Portraits of Black Professionals
  const aiOutputs = [
    {
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      title: 'Executive office'
    },
    {
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      title: 'Senator formal'
    },
    {
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      title: 'Corporate glass'
    },
    {
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
      title: 'Studio gradient'
    }
  ];

  return (
    <section className={`py-12 border-b transition-colors ${
      isLight
        ? 'bg-white border-slate-200'
        : isTerracotta
        ? 'bg-[#FAF7F2] border-[#E8DFD5]'
        : 'bg-slate-950 border-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        
        {/* Sentence Case Heading & Subtitle */}
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'
          }`}>
            Hundreds of headshots,{' '}
            <span className="text-blue-600">15 minutes of your time</span>
          </h2>
          <p className="text-sm opacity-75">
            Ready in 15 minutes, from the comfort of your home.
          </p>
        </div>

        {/* Visual Tree Pipeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Top Tier (Step 1): "Upload a few photos" */}
          <div className={`p-6 rounded-2xl border transition-all ${
            isLight
              ? 'bg-slate-50 border-slate-200 shadow-sm'
              : isTerracotta
              ? 'bg-white border-[#E8DFD5] shadow-sm'
              : 'bg-slate-900/80 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                  STEP 01
                </span>
                <h4 className={`font-bold text-base mt-1 ${
                  isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'
                }`}>
                  Upload a few photos
                </h4>
              </div>
              <span className="text-xs opacity-75 hidden sm:inline-block">
                4-10 casual selfies or reference photos
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {inputSelfies.map((url, idx) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-slate-300/60 shadow-sm relative group">
                  <img src={url} alt="Black Professional Casual Selfie Input" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold bg-slate-950/80 text-white px-1.5 py-0.5 rounded backdrop-blur">
                    Selfie #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Downward Connecting Arrow */}
          <div className="flex items-center justify-center text-blue-600">
            <div className="h-10 w-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shadow-sm animate-bounce">
              <ArrowDown className="h-5 w-5" />
            </div>
          </div>

          {/* Middle Tier (Step 2): "Our AI learns how you look" Clean Text Pill */}
          <div className={`p-6 rounded-2xl border text-center space-y-3 ${
            isLight
              ? 'bg-blue-50/40 border-blue-200 shadow-sm'
              : isTerracotta
              ? 'bg-white border-[#E8DFD5] shadow-sm'
              : 'bg-slate-900/90 border-slate-800'
          }`}>
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-blue-600 text-white shadow-md mb-1">
              <Cpu className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-100 border border-blue-200 px-2.5 py-0.5 rounded-full">
                STEP 02
              </span>
              <h3 className={`text-xl font-extrabold mt-1 ${
                isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'
              }`}>
                Our AI learns how you look
              </h3>
            </div>
            <p className="text-xs max-w-lg mx-auto opacity-80 leading-relaxed">
              Biometric feature extractor maps facial structure, melanin undertones, and 4C afro hair texture without skin-lightening bias.
            </p>
          </div>

          {/* Downward Connecting Arrow */}
          <div className="flex items-center justify-center text-blue-600">
            <div className="h-10 w-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shadow-sm animate-bounce">
              <ArrowDown className="h-5 w-5" />
            </div>
          </div>

          {/* Bottom Tier (Step 3): "Headshots ready in 15 minutes" with 2x2 Grid badged with dark AI GENERATED pills */}
          <div className={`p-6 rounded-2xl border transition-all ${
            isLight
              ? 'bg-slate-50 border-slate-200 shadow-sm'
              : isTerracotta
              ? 'bg-white border-[#E8DFD5] shadow-sm'
              : 'bg-slate-900/80 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                  STEP 03
                </span>
                <h4 className={`font-bold text-base mt-1 ${
                  isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'
                }`}>
                  Headshots ready in 15 minutes
                </h4>
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                2048x2048 PNG studio exports
              </span>
            </div>

            {/* 2x2 Grid of 4 Polished Executive Outputs with Dark AI GENERATED Micro-Pills */}
            <div className="grid grid-cols-2 gap-4">
              {aiOutputs.map((out, idx) => (
                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-300/80 shadow-md group">
                  <img src={out.image} alt={out.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Dark AI GENERATED Micro-Pill (Exact Requirement) */}
                  <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-md backdrop-blur shadow-md uppercase">
                    AI GENERATED
                  </div>

                  <div className="absolute top-3 right-3 bg-slate-950/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-700">
                    {out.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
