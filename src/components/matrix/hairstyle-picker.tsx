'use client';

import React, { useState } from 'react';
import { HairstylePreset, GenderCategory } from '../../lib/types';
import { HAIRSTYLE_PRESETS } from '../../lib/presets-data';
import { Check, Scissors } from 'lucide-react';
import { useTheme } from '../../lib/theme-context';

interface HairstylePickerProps {
  selectedHairstyle: HairstylePreset;
  onSelectHairstyle: (hair: HairstylePreset) => void;
}

export const HairstylePicker: React.FC<HairstylePickerProps> = ({
  selectedHairstyle,
  onSelectHairstyle,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const [genderFilter, setGenderFilter] = useState<GenderCategory>('all');

  const filteredPresets = HAIRSTYLE_PRESETS.filter(
    (h) => genderFilter === 'all' || h.gender === 'all' || h.gender === genderFilter
  );

  return (
    <div className="space-y-5">
      {/* Gender Filter Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Scissors className="h-5 w-5 text-amber-500" />
          <h4 className={`font-bold text-sm ${isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'}`}>
            Curated African Hairstyles
          </h4>
        </div>

        <div className={`flex items-center space-x-1.5 p-1 rounded-xl border ${
          isLight ? 'bg-slate-100 border-slate-200' : isTerracotta ? 'bg-[#F4EBE2] border-[#E8DFD5]' : 'bg-slate-950 border-slate-800'
        }`}>
          <button
            type="button"
            onClick={() => setGenderFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              genderFilter === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            All Presets
          </button>
          <button
            type="button"
            onClick={() => setGenderFilter('men')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              genderFilter === 'men'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            Men
          </button>
          <button
            type="button"
            onClick={() => setGenderFilter('women')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              genderFilter === 'women'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            Women
          </button>
        </div>
      </div>

      {/* Hairstyles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[500px] overflow-y-auto pr-1">
        {filteredPresets.map((hair) => {
          const isSelected = selectedHairstyle.id === hair.id;
          return (
            <button
              key={hair.id}
              type="button"
              onClick={() => onSelectHairstyle(hair)}
              className={`relative text-left p-4 rounded-2xl border transition-all flex flex-col justify-between group ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/10 shadow-md ring-2 ring-amber-500/40'
                  : isLight
                  ? 'border-slate-200 bg-white hover:border-slate-300'
                  : isTerracotta
                  ? 'border-[#E8DFD5] bg-white hover:border-[#D6C4B4]'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    {hair.textureType}
                  </span>
                  {isSelected && (
                    <div className="h-5 w-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                <h5 className={`font-bold text-sm transition-colors ${
                  isLight ? 'text-slate-900 group-hover:text-amber-600' : isTerracotta ? 'text-[#2D241E] group-hover:text-[#C86D44]' : 'text-white group-hover:text-amber-300'
                }`}>
                  {hair.title}
                </h5>
                <p className="text-xs opacity-75 mt-1 leading-relaxed">
                  {hair.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/40 flex items-center justify-between text-[10px] opacity-75">
                <span>Suitable for: {hair.gender.toUpperCase()}</span>
                <span className="text-amber-600 font-medium">Authentic 4C Texture</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
