'use client';

import React, { useState } from 'react';
import { BackgroundPreset, HairstylePreset, OutfitPreset } from '../../lib/types';
import { BackgroundPicker } from './background-picker';
import { HairstylePicker } from './hairstyle-picker';
import { OutfitPicker } from './outfit-picker';
import { Building2, Scissors, Shirt, Sliders, ShieldCheck } from 'lucide-react';
import { useTheme } from '../../lib/theme-context';

interface SelectionMatrixProps {
  selectedBackground: BackgroundPreset;
  onSelectBackground: (bg: BackgroundPreset) => void;
  selectedHairstyle: HairstylePreset;
  onSelectHairstyle: (hair: HairstylePreset) => void;
  selectedOutfit: OutfitPreset;
  onSelectOutfit: (outfit: OutfitPreset) => void;
  skinTone: 'Deep Ebony' | 'Rich Warm Cocoa' | 'Golden Bronze' | 'Natural Deep Brown';
  onSkinToneChange: (tone: 'Deep Ebony' | 'Rich Warm Cocoa' | 'Golden Bronze' | 'Natural Deep Brown') => void;
}

type MatrixTab = 'backgrounds' | 'hairstyles' | 'outfits';

export const SelectionMatrix: React.FC<SelectionMatrixProps> = ({
  selectedBackground,
  onSelectBackground,
  selectedHairstyle,
  onSelectHairstyle,
  selectedOutfit,
  onSelectOutfit,
  skinTone,
  onSkinToneChange,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const [activeTab, setActiveTab] = useState<MatrixTab>('backgrounds');

  const skinTones: ('Deep Ebony' | 'Rich Warm Cocoa' | 'Golden Bronze' | 'Natural Deep Brown')[] = [
    'Deep Ebony',
    'Rich Warm Cocoa',
    'Golden Bronze',
    'Natural Deep Brown'
  ];

  return (
    <div className={`border rounded-2xl p-6 space-y-6 transition-colors ${
      isLight
        ? 'bg-white border-slate-200 shadow-sm'
        : isTerracotta
        ? 'bg-white border-[#E8DFD5] shadow-sm'
        : 'bg-slate-900/80 border-slate-800'
    }`}>
      {/* Header & Melanin Tone Presets */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200/40 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <Sliders className="h-5 w-5 text-amber-500" />
            <h3 className={`font-bold text-base ${isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'}`}>
              Step 3: Selection Matrix & Style Facets
            </h3>
          </div>
          <p className="text-xs opacity-75 mt-1">
            Customize background environments, African hairstyle textures, and formal attire.
          </p>
        </div>

        {/* Melanin Tone Selector */}
        <div className={`p-2 rounded-xl border space-y-1.5 ${
          isLight
            ? 'bg-slate-50 border-slate-200'
            : isTerracotta
            ? 'bg-[#FAF7F2] border-[#E8DFD5]'
            : 'bg-slate-950 border-slate-800'
        }`}>
          <div className="flex items-center space-x-1.5 text-[11px] font-semibold opacity-80">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
            <span>Melanin Undertone Preserving Target</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {skinTones.map((tone) => (
              <button
                key={tone}
                type="button"
                onClick={() => onSkinToneChange(tone)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  skinTone === tone
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : isLight
                    ? 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                    : isTerracotta
                    ? 'bg-white text-[#2D241E] hover:bg-[#EFE8DF] border border-[#E8DFD5]'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Facet Tabs Navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-200/40 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('backgrounds')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'backgrounds'
              ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
              : isLight
              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              : isTerracotta
              ? 'bg-[#F4EBE2] text-[#2D241E] hover:bg-[#EFE8DF] border border-[#E8DFD5]'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Building2 className="h-4 w-4" />
          <span>Backgrounds (50)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hairstyles')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'hairstyles'
              ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
              : isLight
              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              : isTerracotta
              ? 'bg-[#F4EBE2] text-[#2D241E] hover:bg-[#EFE8DF] border border-[#E8DFD5]'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Scissors className="h-4 w-4" />
          <span>Hairstyles (11)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('outfits')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'outfits'
              ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
              : isLight
              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              : isTerracotta
              ? 'bg-[#F4EBE2] text-[#2D241E] hover:bg-[#EFE8DF] border border-[#E8DFD5]'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Shirt className="h-4 w-4" />
          <span>Outfits (6)</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'backgrounds' && (
          <BackgroundPicker
            selectedBackground={selectedBackground}
            onSelectBackground={onSelectBackground}
          />
        )}

        {activeTab === 'hairstyles' && (
          <HairstylePicker
            selectedHairstyle={selectedHairstyle}
            onSelectHairstyle={onSelectHairstyle}
          />
        )}

        {activeTab === 'outfits' && (
          <OutfitPicker
            selectedOutfit={selectedOutfit}
            onSelectOutfit={onSelectOutfit}
          />
        )}
      </div>

      {/* Selection Matrix Summary Bar */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs ${
        isLight
          ? 'bg-slate-50 border-slate-200 text-slate-800'
          : isTerracotta
          ? 'bg-[#FAF7F2] border-[#E8DFD5] text-[#2D241E]'
          : 'bg-slate-950/80 border-slate-800 text-slate-300'
      }`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="opacity-75">Current Facet Selection:</span>
          <span className="bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-lg border border-amber-500/20 font-semibold">
            {selectedBackground.title}
          </span>
          <span className="opacity-50">•</span>
          <span className="bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-lg border border-amber-500/20 font-semibold">
            {selectedHairstyle.title}
          </span>
          <span className="opacity-50">•</span>
          <span className="bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-lg border border-amber-500/20 font-semibold">
            {selectedOutfit.title}
          </span>
        </div>
      </div>
    </div>
  );
};
