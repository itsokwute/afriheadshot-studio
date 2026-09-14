'use client';

import React from 'react';
import { useTheme } from '../lib/theme-context';
import { Building2, ArrowUpRight, Camera } from 'lucide-react';

interface CategorizedFooterProps {
  onSelectCategoryFilter?: (sectorOrRole: string) => void;
}

export const CategorizedFooter: React.FC<CategorizedFooterProps> = ({ onSelectCategoryFilter }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  // Photo types in strict Sentence Case
  const photoTypes = [
    { name: 'LinkedIn headshots', filterKey: 'LinkedIn' },
    { name: 'Corporate headshots', filterKey: 'Corporate' },
    { name: 'Executive headshots', filterKey: 'Executive' },
    { name: 'Doctor headshots', filterKey: 'Medical' },
    { name: 'Lawyer headshots', filterKey: 'Legal' },
    { name: 'Real estate headshots', filterKey: 'RealEstate' }
  ];

  // Sectors in strict Sentence Case
  const sectors = [
    { name: 'Tech & fintech', presetCategory: 'Tech Hub Glass' },
    { name: 'Banking & finance', presetCategory: 'Executive Suites' },
    { name: 'Energy & engineering', presetCategory: 'African Boardrooms' },
    { name: 'Creative & media', presetCategory: 'Studio Gradients' }
  ];

  const handleClick = (key: string) => {
    if (onSelectCategoryFilter) {
      onSelectCategoryFilter(key);
    }
    const studioElem = document.getElementById('studio');
    if (studioElem) {
      studioElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={`border-t py-14 px-4 transition-colors ${
      isLight
        ? 'bg-slate-900 text-white border-slate-800'
        : isTerracotta
        ? 'bg-[#2D241E] text-white border-[#1E1713]'
        : 'bg-slate-950 text-white border-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          
          {/* Brand & Mission Statement */}
          <div className="space-y-3 lg:col-span-2">
            <div className="flex items-center space-x-2.5">
              <div className="h-8 w-8 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-sm shadow-md">
                AH
              </div>
              <span className="font-extrabold text-base tracking-tight">AfriHeadshot Studio</span>
            </div>
            <p className="opacity-75 leading-relaxed max-w-md">
              The premier AI executive headshot generator tailored for African leadership. Replicating modern studio photography with strict preservation of authentic melanin tones, bone structure, and afro hair textures.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-blue-400 font-bold">
              <span className="bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md">★ 4.9/5 rating</span>
              <span className="bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md">16,800+ verified reviews</span>
              <span className="bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md">Zero skin-lightening bias</span>
            </div>
          </div>

          {/* Photo types Column (Sentence Case) */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm flex items-center space-x-1.5 text-blue-400 uppercase tracking-wider">
              <Camera className="h-4 w-4" />
              <span>Photo types</span>
            </h4>
            <ul className="space-y-2.5">
              {photoTypes.map((pt, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => handleClick(pt.filterKey)}
                    className="flex items-center space-x-1.5 opacity-80 hover:opacity-100 hover:text-blue-400 transition-colors text-left"
                  >
                    <span>{pt.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-60" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sectors Column (Sentence Case) */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm flex items-center space-x-1.5 text-blue-400 uppercase tracking-wider">
              <Building2 className="h-4 w-4" />
              <span>Sectors</span>
            </h4>
            <ul className="space-y-2.5">
              {sectors.map((sec, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => handleClick(sec.presetCategory)}
                    className="flex items-center space-x-1.5 opacity-80 hover:opacity-100 hover:text-blue-400 transition-colors text-left"
                  >
                    <span>{sec.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-60" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Line */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs opacity-75 space-y-1.5">
          <p className="font-semibold">
            AfriHeadshot Studio © 2026 • Commercial studio-grade executive portraiture
          </p>
          <p>
            Strictly enforcing authentic melanin skin tones, natural afro hair preservation, and zero skin-lightening bias.
          </p>
        </div>
      </div>
    </footer>
  );
};
