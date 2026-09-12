'use client';

import React, { useState } from 'react';
import { BackgroundPreset, BackgroundCategory } from '../../lib/types';
import { BACKGROUND_PRESETS } from '../../lib/presets-data';
import { Check, MapPin } from 'lucide-react';
import { useTheme } from '../../lib/theme-context';

interface BackgroundPickerProps {
  selectedBackground: BackgroundPreset;
  onSelectBackground: (bg: BackgroundPreset) => void;
}

const CATEGORIES: ('All' | BackgroundCategory)[] = [
  'All',
  'Executive Suites',
  'Corporate Skylines',
  'Tech Hub Glass',
  'Studio Gradients',
  'Terracotta & Wood',
  'African Boardrooms'
];

export const BackgroundPicker: React.FC<BackgroundPickerProps> = ({
  selectedBackground,
  onSelectBackground,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const [activeCategory, setActiveCategory] = useState<'All' | BackgroundCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPresets = BACKGROUND_PRESETS.filter((bg) => {
    const matchesCategory = activeCategory === 'All' || bg.category === activeCategory;
    const matchesSearch =
      bg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bg.cityOrSetting && bg.cityOrSetting.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-5">
      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Category Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : isLight
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  : isTerracotta
                  ? 'bg-[#F4EBE2] text-[#2D241E] hover:bg-[#EFE8DF] border border-[#E8DFD5]'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search 50 backgrounds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full md:w-56 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-amber-500 border ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                : isTerracotta
                ? 'bg-white border-[#E8DFD5] text-[#2D241E] placeholder-slate-400'
                : 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
            }`}
          />
        </div>
      </div>

      {/* Background Presets Grid (50 Options) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[520px] overflow-y-auto pr-1">
        {filteredPresets.map((bg) => {
          const isSelected = selectedBackground.id === bg.id;
          return (
            <button
              key={bg.id}
              type="button"
              onClick={() => onSelectBackground(bg)}
              className={`relative text-left p-4 rounded-2xl border transition-all flex flex-col justify-between group overflow-hidden ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/10 shadow-md ring-2 ring-amber-500/40'
                  : isLight
                  ? 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  : isTerracotta
                  ? 'border-[#E8DFD5] bg-white hover:border-[#D6C4B4] hover:shadow-sm'
                  : 'border-slate-800/80 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              {/* Visual Gradient Box */}
              <div className={`h-24 w-full rounded-xl bg-gradient-to-r ${bg.gradientCss} mb-3 p-3 relative overflow-hidden flex flex-col justify-end border border-white/10`}>
                {bg.cityOrSetting && (
                  <span className="inline-flex items-center space-x-1 bg-slate-950/80 backdrop-blur-md text-[10px] font-semibold text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/20 self-start">
                    <MapPin className="h-3 w-3 text-amber-400" />
                    <span>{bg.cityOrSetting}</span>
                  </span>
                )}
                {isSelected && (
                  <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Title & Info */}
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                  {bg.category}
                </span>
                <h5 className={`font-bold text-sm transition-colors ${
                  isLight ? 'text-slate-900 group-hover:text-amber-600' : isTerracotta ? 'text-[#2D241E] group-hover:text-[#C86D44]' : 'text-white group-hover:text-amber-300'
                }`}>
                  {bg.title}
                </h5>
                <p className="text-xs opacity-75 mt-1 line-clamp-2 leading-relaxed">
                  {bg.description}
                </p>
              </div>

              {/* Lighting Badge */}
              <div className="mt-3 pt-2 border-t border-slate-200/40 flex items-center justify-between text-[10px] opacity-75">
                <span className="truncate">{bg.lightingStyle}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
