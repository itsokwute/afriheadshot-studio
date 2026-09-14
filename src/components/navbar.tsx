'use client';

import React, { useState } from 'react';
import { Camera, ChevronDown, Globe, Sparkles, Sun, Moon, Palette, ShieldCheck, User, ArrowRight } from 'lucide-react';
import { useTheme } from '../lib/theme-context';

interface NavbarProps {
  onHoverCategory?: (category: string | null) => void;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onHoverCategory, onSelectCategory }) => {
  const { theme, setTheme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const column1Items = [
    {
      title: 'LinkedIn headshots',
      desc: 'Headshots that grab attention and build authority on LinkedIn.',
      key: 'LinkedIn'
    },
    {
      title: 'CEO headshots',
      desc: 'Executive headshots that make you look commanding instantly.',
      key: 'CEO'
    },
    {
      title: 'Women headshots',
      desc: 'Empowering women headshots that radiate confidence and professionalism.',
      key: 'Women'
    },
    {
      title: 'Doctor headshots',
      desc: 'Modern headshots tailored for medical professionals to inspire trust.',
      key: 'Medical'
    },
    {
      title: 'Free AI headshot generator',
      desc: 'Instant test generation with zero upfront cost.',
      key: 'Free'
    }
  ];

  const column2Items = [
    {
      title: 'Corporate headshots',
      desc: 'Clean corporate headshots that speak for your team.',
      key: 'Corporate'
    },
    {
      title: 'Executive headshots',
      desc: 'Authoritative portraits for boardrooms and summit panels.',
      key: 'Executive'
    },
    {
      title: 'Real estate headshots',
      desc: 'Eye-catching headshots that build client connection.',
      key: 'RealEstate'
    },
    {
      title: 'Lawyer headshots',
      desc: 'Polished legal headshots conveying credibility and precision.',
      key: 'Legal'
    },
    {
      title: 'Heritage & formal headshots',
      desc: 'High-definition portraits in bespoke Senator suits and Ankara accents.',
      key: 'Heritage'
    }
  ];

  const handleCategoryClick = (key: string) => {
    setIsMegaMenuOpen(false);
    if (onSelectCategory) {
      onSelectCategory(key);
    }
    const studioElem = document.getElementById('studio');
    if (studioElem) {
      studioElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 px-4 lg:px-8 py-3.5 ${
      isLight
        ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
        : isTerracotta
        ? 'bg-[#FAF7F2]/95 border-[#E8DFD5] text-[#2D241E] shadow-sm'
        : 'bg-slate-950/90 border-slate-900 text-white'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center space-x-3">
          <a href="#" className="flex items-center space-x-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-md group-hover:scale-105 transition-transform">
              <Camera className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight leading-none">
                AfriHeadshot <span className="text-blue-600 font-normal">Studio</span>
              </span>
              <span className="text-[10px] opacity-60 font-medium">African Executive AI Portraiture</span>
            </div>
          </a>
        </div>

        {/* Center: Navigation Links with Mega Menu Hover/Click */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold relative">
          
          {/* Headshots Dropdown Trigger */}
          <div
            className="relative py-2"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => {
              setIsMegaMenuOpen(false);
              if (onHoverCategory) onHoverCategory(null);
            }}
          >
            <button
              type="button"
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="flex items-center space-x-1.5 hover:text-blue-600 transition-colors py-1 cursor-pointer"
            >
              <span>Headshots</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-blue-600' : ''}`} />
            </button>

            {/* Interactive Mega Menu Dropdown */}
            {isMegaMenuOpen && (
              <div className={`absolute top-full -left-20 w-[680px] p-6 rounded-2xl border shadow-2xl transition-all duration-200 animate-fadeIn z-50 ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300/80'
                  : isTerracotta
                  ? 'bg-white border-[#E8DFD5] text-[#2D241E] shadow-amber-900/10'
                  : 'bg-slate-900 border-slate-800 text-white shadow-black/90'
              }`}>
                <div className="grid grid-cols-2 gap-6">
                  {/* Column 1 */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider px-2">
                      Popular categories
                    </h5>
                    <div className="space-y-1">
                      {column1Items.map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onMouseEnter={() => onHoverCategory && onHoverCategory(item.key)}
                          onMouseLeave={() => onHoverCategory && onHoverCategory(null)}
                          onClick={() => handleCategoryClick(item.key)}
                          className={`w-full text-left p-2.5 rounded-xl transition-all flex flex-col space-y-0.5 group ${
                            isLight
                              ? 'hover:bg-slate-100'
                              : isTerracotta
                              ? 'hover:bg-[#F4EBE2]'
                              : 'hover:bg-slate-800'
                          }`}
                        >
                          <span className="font-bold text-xs group-hover:text-blue-600 transition-colors flex items-center justify-between">
                            <span>{item.title}</span>
                            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                          </span>
                          <span className="text-[11px] opacity-70 leading-normal line-clamp-2">
                            {item.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider px-2">
                      Corporate & executive
                    </h5>
                    <div className="space-y-1">
                      {column2Items.map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onMouseEnter={() => onHoverCategory && onHoverCategory(item.key)}
                          onMouseLeave={() => onHoverCategory && onHoverCategory(null)}
                          onClick={() => handleCategoryClick(item.key)}
                          className={`w-full text-left p-2.5 rounded-xl transition-all flex flex-col space-y-0.5 group ${
                            isLight
                              ? 'hover:bg-slate-100'
                              : isTerracotta
                              ? 'hover:bg-[#F4EBE2]'
                              : 'hover:bg-slate-800'
                          }`}
                        >
                          <span className="font-bold text-xs group-hover:text-blue-600 transition-colors flex items-center justify-between">
                            <span>{item.title}</span>
                            <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                          </span>
                          <span className="text-[11px] opacity-70 leading-normal line-clamp-2">
                            {item.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a href="#studio" className="hover:text-blue-600 transition-colors">
            For companies
          </a>

          <a href="#studio" className="hover:text-blue-600 transition-colors">
            Gift
          </a>
        </nav>

        {/* Right: Language Globe Icon, Log In & Black/Navy Pill Button */}
        <div className="flex items-center space-x-4">
          
          {/* Theme Selector Toggle */}
          <div className={`hidden sm:flex items-center space-x-1 p-1 rounded-xl border ${
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
              title="Light corporate theme"
            >
              <Sun className="h-3.5 w-3.5 text-amber-500" />
            </button>
            <button
              type="button"
              onClick={() => setTheme('terracotta')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                theme === 'terracotta'
                  ? 'bg-[#C86D44] text-white shadow-md font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Terracotta theme"
            >
              <Palette className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                theme === 'dark'
                  ? 'bg-slate-800 text-amber-400 shadow-md font-bold'
                  : 'text-slate-500 hover:text-slate-200'
              }`}
              title="Dark theme"
            >
              <Moon className="h-3.5 w-3.5 text-amber-400" />
            </button>
          </div>

          {/* Globe Language Icon */}
          <button
            type="button"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
            title="Select language"
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

          {/* Black/Navy Pill Button: "Create your headshots" */}
          <a
            href="#studio"
            className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs md:text-sm px-5 py-2.5 rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Create your headshots
          </a>
        </div>

      </div>
    </header>
  );
};
