'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Camera, Layers, Zap } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-amber-900/20 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Camera className="h-5 w-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-lg tracking-tight text-white font-sans">
                Afri<span className="text-amber-400">Headshot</span> <span className="text-amber-200/80 font-normal">Studio</span>
              </h1>
              <span className="text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                v2.0 AI Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Tailored for African Executives & Professionals</p>
          </div>
        </div>

        {/* System Guardrail Status & Navigation */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-full">
            <ShieldCheck className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-300">
              Melanin Authenticity Injector Active
            </span>
          </div>

          <a
            href="#studio"
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs md:text-sm px-4 py-2 rounded-lg transition-all shadow-md shadow-amber-500/20 active:scale-95"
          >
            <Zap className="h-4 w-4 fill-slate-950" />
            <span>Create Headshots</span>
          </a>
        </div>
      </div>
    </header>
  );
};
