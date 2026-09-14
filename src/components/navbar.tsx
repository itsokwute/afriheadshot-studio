'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Camera, ChevronDown, Globe, Sparkles, Sun, Moon, Palette, ArrowRight } from 'lucide-react';
import { useTheme } from '../lib/theme-context';

interface NavbarProps {
  onHoverCategory?: (category: string | null) => void;
  onSelectCategory?: (category: string) => void;
}

const COLUMN_1 = [
  { title: 'LinkedIn headshots', desc: 'Headshots that grab attention and build authority on LinkedIn.', key: 'LinkedIn' },
  { title: 'CEO headshots', desc: 'Executive headshots that make you look commanding instantly.', key: 'CEO' },
  { title: 'Women headshots', desc: 'Empowering women headshots that radiate confidence and professionalism.', key: 'Women' },
  { title: 'Doctor headshots', desc: 'Modern headshots tailored for medical professionals to inspire trust.', key: 'Medical' },
  { title: 'Free AI headshot generator', desc: 'Instant test generation with zero upfront cost.', key: 'Free' },
];

const COLUMN_2 = [
  { title: 'Corporate headshots', desc: 'Clean corporate headshots that speak for your team.', key: 'Corporate' },
  { title: 'Executive headshots', desc: 'Authoritative portraits for boardrooms and summit panels.', key: 'Executive' },
  { title: 'Real estate headshots', desc: 'Eye-catching headshots that build client connection.', key: 'RealEstate' },
  { title: 'Lawyer headshots', desc: 'Polished legal headshots conveying credibility and precision.', key: 'Legal' },
  { title: 'Heritage & formal headshots', desc: 'High-definition portraits in bespoke senator suits and Ankara accents.', key: 'Heritage' },
];

export const Navbar: React.FC<NavbarProps> = ({ onHoverCategory, onSelectCategory }) => {
  const { theme, setTheme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced close so moving the mouse between trigger → dropdown doesn't flicker
  const openMenu = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsMegaMenuOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
      onHoverCategory?.(null);
    }, 120);
  }, [onHoverCategory]);

  const handleCategoryClick = (key: string) => {
    setIsMegaMenuOpen(false);
    setMobileMenuOpen(false);
    onSelectCategory?.(key);
    const el = document.getElementById('studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStudio = () => {
    const el = document.getElementById('studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const menuItemClass = `w-full text-left p-2.5 rounded-xl transition-all flex flex-col space-y-0.5 group ${
    isLight ? 'hover:bg-slate-100' : isTerracotta ? 'hover:bg-[#F4EBE2]' : 'hover:bg-slate-800'
  }`;

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 px-4 lg:px-8 py-3.5 ${
        isLight
          ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
          : isTerracotta
          ? 'bg-[#FAF7F2]/95 border-[#E8DFD5] text-[#2D241E] shadow-sm'
          : 'bg-slate-950/95 border-slate-900 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* ─── Left: Brand Logo ─── */}
        <a href="#" className="flex items-center space-x-2.5 group shrink-0">
          <div className="h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Camera className="h-5 w-5 text-blue-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight leading-none">
              AfriHeadshot <span className="text-blue-600 font-normal">Studio</span>
            </span>
            <span className="text-[10px] opacity-55 font-medium hidden sm:block">African executive AI portraiture</span>
          </div>
        </a>

        {/* ─── Center: Desktop Navigation ─── */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-semibold relative">

          {/* Headshots Mega Menu trigger */}
          <div
            className="relative py-2"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onClick={() => setIsMegaMenuOpen((v) => !v)}
              className="flex items-center space-x-1.5 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <span>Headshots</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-blue-600' : ''}`}
              />
            </button>

            {/* Mega Menu Dropdown */}
            {isMegaMenuOpen && (
              <div
                onMouseEnter={openMenu}
                onMouseLeave={scheduleClose}
                className={`absolute top-full -left-24 w-[700px] p-6 rounded-2xl border shadow-2xl z-50 animate-fadeIn ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300/70'
                    : isTerracotta
                    ? 'bg-white border-[#E8DFD5] text-[#2D241E]'
                    : 'bg-slate-900 border-slate-800 text-white shadow-black/90'
                }`}
              >
                <div className="grid grid-cols-2 gap-6">
                  {/* Column 1 */}
                  <div className="space-y-1.5">
                    <h5 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest px-2 mb-2">
                      Popular categories
                    </h5>
                    {COLUMN_1.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onMouseEnter={() => onHoverCategory?.(item.key)}
                        onMouseLeave={() => onHoverCategory?.(null)}
                        onClick={() => handleCategoryClick(item.key)}
                        className={menuItemClass}
                      >
                        <span className="font-bold text-xs group-hover:text-blue-600 transition-colors flex items-center justify-between">
                          <span>{item.title}</span>
                          <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 shrink-0" />
                        </span>
                        <span className="text-[11px] opacity-65 leading-normal line-clamp-2">{item.desc}</span>
                      </button>
                    ))}
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-1.5">
                    <h5 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest px-2 mb-2">
                      Corporate & executive
                    </h5>
                    {COLUMN_2.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onMouseEnter={() => onHoverCategory?.(item.key)}
                        onMouseLeave={() => onHoverCategory?.(null)}
                        onClick={() => handleCategoryClick(item.key)}
                        className={menuItemClass}
                      >
                        <span className="font-bold text-xs group-hover:text-blue-600 transition-colors flex items-center justify-between">
                          <span>{item.title}</span>
                          <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 shrink-0" />
                        </span>
                        <span className="text-[11px] opacity-65 leading-normal line-clamp-2">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <a href="#studio" className="hover:text-blue-600 transition-colors">For companies</a>
          <a href="#studio" className="hover:text-blue-600 transition-colors">Gift</a>
        </nav>

        {/* ─── Right: Actions ─── */}
        <div className="flex items-center space-x-3">

          {/* Theme switcher (desktop only) */}
          <div
            className={`hidden sm:flex items-center space-x-0.5 p-1 rounded-xl border ${
              isLight ? 'bg-slate-100 border-slate-200' : isTerracotta ? 'bg-[#EFE8DF] border-[#E8DFD5]' : 'bg-slate-900 border-slate-800'
            }`}
          >
            {[
              { value: 'light' as const, icon: <Sun className="h-3.5 w-3.5 text-amber-500" />, label: 'Light theme' },
              { value: 'terracotta' as const, icon: <Palette className="h-3.5 w-3.5" />, label: 'Terracotta theme' },
              { value: 'dark' as const, icon: <Moon className="h-3.5 w-3.5 text-amber-400" />, label: 'Dark theme' },
            ].map(({ value, icon, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTheme(value)}
                title={label}
                className={`p-1.5 rounded-lg transition-all ${
                  theme === value
                    ? value === 'light'
                      ? 'bg-white text-slate-900 shadow-md'
                      : value === 'terracotta'
                      ? 'bg-[#C86D44] text-white shadow-md'
                      : 'bg-slate-800 text-amber-400 shadow-md'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Globe */}
          <button
            type="button"
            title="Select language"
            className="p-2 rounded-xl hover:text-blue-600 transition-colors hidden sm:flex"
          >
            <Globe className="h-4 w-4" />
          </button>

          {/* Log in */}
          <a
            href="#studio"
            className="text-xs font-bold hover:text-blue-600 transition-colors hidden sm:inline-block"
          >
            Log in
          </a>

          {/* CTA pill */}
          <button
            type="button"
            onClick={scrollToStudio}
            className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs md:text-sm px-4 py-2.5 rounded-full shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Create your headshots
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-xl hover:text-blue-600 transition-colors"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Open mobile menu"
          >
            <span className="flex flex-col space-y-1">
              <span className="block w-5 h-0.5 bg-current rounded-full" />
              <span className="block w-5 h-0.5 bg-current rounded-full" />
              <span className="block w-4 h-0.5 bg-current rounded-full" />
            </span>
          </button>
        </div>
      </div>

      {/* ─── Mobile Dropdown Menu ─── */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden mt-2 rounded-2xl border p-4 space-y-1 animate-fadeIn ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : isTerracotta
              ? 'bg-white border-[#E8DFD5] text-[#2D241E]'
              : 'bg-slate-900 border-slate-800 text-white'
          }`}
        >
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest px-2 mb-2">Headshot categories</p>
          {[...COLUMN_1, ...COLUMN_2].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => handleCategoryClick(item.key)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isLight ? 'hover:bg-slate-100' : isTerracotta ? 'hover:bg-[#F4EBE2]' : 'hover:bg-slate-800'
              }`}
            >
              {item.title}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-200/30">
            <a href="#studio" className="block px-3 py-2 text-sm font-semibold hover:text-blue-600">For companies</a>
            <a href="#studio" className="block px-3 py-2 text-sm font-semibold hover:text-blue-600">Gift</a>
          </div>
        </div>
      )}
    </header>
  );
};
