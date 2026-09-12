'use client';

import React from 'react';
import { Sparkles, Shield, Award, Users, CheckCircle2, Sliders, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/60">
      {/* Ambient background glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-amber-700/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-300 tracking-wide uppercase">
              Next-Gen AI Headshot Studio for African Leadership
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Authentic Studio Headshots for <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">
              African Professionals
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base md:text-lg leading-relaxed font-normal">
            Upload up to <strong className="text-amber-400 font-semibold">10 reference photos</strong> of head & shoulders. Our proprietary System Prompt Injector strictly preserves your authentic facial structure, natural afro hair texture, and rich melanin skin tones without artificial skin lightening or European bias.
          </p>

          {/* Feature Highlights Grid */}
          <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
              <div className="flex items-center space-x-2 text-amber-400 mb-1">
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-bold text-sm text-white">50 Backgrounds</span>
              </div>
              <p className="text-xs text-slate-400">Lagos skylines, Sandton hubs, terracotta & studio gradients</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
              <div className="flex items-center space-x-2 text-amber-400 mb-1">
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-bold text-sm text-white">11 African Hairstyles</span>
              </div>
              <p className="text-xs text-slate-400">Low fades, 360 waves, locs, box braids & Senegalese twists</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
              <div className="flex items-center space-x-2 text-amber-400 mb-1">
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-bold text-sm text-white">6 Formal Outfits</span>
              </div>
              <p className="text-xs text-slate-400">Senator suits, Agbada corporate fusion & bespoke navy blazers</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
              <div className="flex items-center space-x-2 text-amber-400 mb-1">
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-bold text-sm text-white">2048x2048 Export</span>
              </div>
              <p className="text-xs text-slate-400">LinkedIn ready with 1:1 and 4:5 aspect ratio presets</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
