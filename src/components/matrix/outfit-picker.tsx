'use client';

import React from 'react';
import { OutfitPreset } from '../../lib/types';
import { OUTFIT_PRESETS } from '../../lib/presets-data';
import { Shirt, Check, Sparkles, Palette } from 'lucide-react';

interface OutfitPickerProps {
  selectedOutfit: OutfitPreset;
  onSelectOutfit: (outfit: OutfitPreset) => void;
}

export const OutfitPicker: React.FC<OutfitPickerProps> = ({
  selectedOutfit,
  onSelectOutfit,
}) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center space-x-2">
        <Shirt className="h-5 w-5 text-amber-400" />
        <h4 className="font-bold text-white text-sm">Corporate Global & African Formal Outfits</h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {OUTFIT_PRESETS.map((outfit) => {
          const isSelected = selectedOutfit.id === outfit.id;
          return (
            <button
              key={outfit.id}
              type="button"
              onClick={() => onSelectOutfit(outfit)}
              className={`relative text-left p-4 rounded-2xl border transition-all flex flex-col justify-between group ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/40'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                {/* Header & Category Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                    {outfit.category}
                  </span>
                  {isSelected && (
                    <div className="h-5 w-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                <h5 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">
                  {outfit.title}
                </h5>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {outfit.description}
                </p>
              </div>

              {/* Color Swatch Palette */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium">Color Palette</span>
                <div className="flex items-center space-x-1.5">
                  {outfit.colorPalette.map((hex, idx) => (
                    <div
                      key={idx}
                      className="h-4 w-4 rounded-full border border-white/20 shadow-inner"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
