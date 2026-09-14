'use client';

import React from 'react';
import { useTheme } from '../lib/theme-context';
import { Building, Briefcase, UserCheck, Layers, ArrowUpRight } from 'lucide-react';

interface CategorizedFooterProps {
  onSelectCategoryFilter?: (sectorOrRole: string) => void;
}

export const CategorizedFooter: React.FC<CategorizedFooterProps> = ({ onSelectCategoryFilter }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const sectors = [
    { name: 'Tech & FinTech Headshots', presetCategory: 'Tech Hub Glass' },
    { name: 'Legal & Corporate Banking', presetCategory: 'Executive Suites' },
    { name: 'Creative & Media Agency', presetCategory: 'Studio Gradients' },
    { name: 'Oil & Energy Executive', presetCategory: 'African Boardrooms' }
  ];

  const roles = [
    { name: 'Corporate Headshots', filterKey: 'Corporate' },
    { name: 'Executive Headshots', filterKey: 'Executive' },
    { name: 'Doctor & Healthcare Headshots', filterKey: 'Medical' },
    { name: 'Lawyer & Attorney Headshots', filterKey: 'Legal' },
    { name: 'Real Estate & Broker Headshots', filterKey: 'RealEstate' },
    { name: 'Women Leadership Headshots', filterKey: 'Women' }
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
    <footer className={`border-t py-12 px-4 transition-colors ${
      isLight
        ? 'bg-white border-slate-200 text-slate-900'
        : isTerracotta
        ? 'bg-[#FAF7F2] border-[#E8DFD5] text-[#2D241E]'
        : 'bg-slate-950 border-slate-900 text-white'
    }`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Categorized Intent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-xs">
          
          {/* Brand & Mission Statement */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-lg bg-amber-500 flex items-center justify-center font-black text-slate-950 text-sm">
                AH
              </div>
              <span className="font-extrabold text-sm tracking-tight">AfriHeadshot Studio</span>
            </div>
            <p className="opacity-75 leading-relaxed">
              The premier AI executive headshot generator tailored for African professionals globally. Strict preservation of authentic melanin undertones, bone structure, and 4C hair textures.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-amber-500 font-bold">
              <span>★ 4.9/5 Rating</span>
              <span>•</span>
              <span>25+ Countries</span>
              <span>•</span>
              <span>Zero Lightening Bias</span>
            </div>
          </div>

          {/* Headshots by Sector */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm flex items-center space-x-1.5 text-amber-500">
              <Building className="h-4 w-4" />
              <span>Headshots by Industry Sector</span>
            </h4>
            <ul className="space-y-2">
              {sectors.map((s, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => handleClick(s.presetCategory)}
                    className="flex items-center space-x-1.5 opacity-80 hover:opacity-100 hover:text-amber-500 transition-colors"
                  >
                    <span>{s.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-60" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Headshots by Role */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm flex items-center space-x-1.5 text-amber-500">
              <Briefcase className="h-4 w-4" />
              <span>Headshots by Executive Role</span>
            </h4>
            <ul className="space-y-2">
              {roles.map((r, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => handleClick(r.filterKey)}
                    className="flex items-center space-x-1.5 opacity-80 hover:opacity-100 hover:text-amber-500 transition-colors"
                  >
                    <span>{r.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-60" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal Copyright Line */}
        <div className="pt-8 border-t border-slate-200/40 text-center text-xs opacity-75 space-y-2">
          <p className="font-semibold">
            AfriHeadshot Studio © 2026 • Tailored for African Executive & Professional Excellence
          </p>
          <p>
            Strictly enforcing authentic melanin skin tones, natural afro hair preservation, and zero skin-lightening bias.
          </p>
        </div>
      </div>
    </footer>
  );
};
