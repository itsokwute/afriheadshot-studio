'use client';

import React from 'react';
import { Camera, ShieldCheck, Zap, Sun, Moon, Palette } from 'lucide-react';
import { useTheme, AppTheme } from '../lib/theme-context';

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 px-4 lg:px-8 py-3.5 ${
      isLight
        ? 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
        : isTerracotta
        ? 'bg-[#FAF7F2]/90 border-[#E8DFD5] text-[#2D241E] shadow-sm'
        : 'bg-slate-950/80 border-amber-900/20 text-white'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20">
            <div className={`h-full w-full rounded-[10px] flex items-center justify-center ${
              isLight ? 'bg-slate-900 text-amber-400' : isTerracotta ? 'bg-[#2D241E] text-amber-300' : 'bg-slate-950 text-amber-400'
            }`}>
              <Camera className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-lg tracking-tight font-sans">
                Afri<span className="text-amber-500">Headshot</span> <span className="font-normal opacity-80">Studio</span>
              </h1>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                isLight
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : isTerracotta
                  ? 'bg-[#F4EBE2] text-[#A34B24] border border-[#E8DFD5]'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                v2.0 AI Engine
              </span>
            </div>
            <p className="text-xs opacity-75 font-medium">Tailored for African Executives & Professionals</p>
          </div>
        </div>

        {/* Right side: Theme Switcher & CTA */}
        <div className="flex items-center space-x-3">
          {/* Theme Selector Toggle */}
          <div className={`flex items-center space-x-1 p-1 rounded-xl border ${
            isLight
              ? 'bg-slate-100 border-slate-200'
              : isTerracotta
              ? 'bg-[#EFE8DF] border-[#E8DFD5]'
              : 'bg-slate-900 border-slate-800'
          }`}>
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                theme === 'light'
                  ? 'bg-white text-slate-900 shadow-md font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Light Corporate Theme"
            >
              <Sun className="h-3.5 w-3.5 text-amber-500" />
              <span className="hidden sm:inline">Light</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme('terracotta')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                theme === 'terracotta'
                  ? 'bg-[#C86D44] text-white shadow-md font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Warm Terracotta Theme"
            >
              <Palette className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Terracotta</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                theme === 'dark'
                  ? 'bg-slate-800 text-amber-400 shadow-md font-bold'
                  : 'text-slate-500 hover:text-slate-200'
              }`}
              title="Obsidian Dark Theme"
            >
              <Moon className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden sm:inline">Dark</span>
            </button>
          </div>

          {/* Authenticity Badge */}
          <div className={`hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${
            isLight
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : isTerracotta
              ? 'bg-emerald-900/10 text-emerald-800 border-emerald-300'
              : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
          }`}>
            <ShieldCheck className="h-4 w-4 text-emerald-500 animate-pulse" />
            <span>Melanin Authenticity Active</span>
          </div>

          <a
            href="#studio"
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs md:text-sm px-4 py-2 rounded-lg transition-all shadow-md shadow-amber-500/20 active:scale-95"
          >
            <Zap className="h-4 w-4 fill-slate-950" />
            <span className="hidden sm:inline">Create Headshots</span>
          </a>
        </div>
      </div>
    </header>
  );
};
