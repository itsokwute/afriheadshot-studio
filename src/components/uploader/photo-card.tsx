'use client';

import React from 'react';
import { UploadedPhoto } from '../../lib/types';
import { Star, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';

interface PhotoCardProps {
  photo: UploadedPhoto;
  onSetAnchor: (id: string) => void;
  onRemove: (id: string) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onSetAnchor, onRemove }) => {
  return (
    <div className={`relative group rounded-xl overflow-hidden border transition-all ${
      photo.isAnchor
        ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/40'
        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
    }`}>
      {/* Aspect Image Preview */}
      <div className="relative aspect-square w-full bg-slate-950 overflow-hidden">
        <img
          src={photo.url}
          alt="Subject reference"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Anchor Badge Overlay */}
        {photo.isAnchor && (
          <div className="absolute top-2 left-2 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-md">
            <Star className="h-3 w-3 fill-slate-950" />
            <span>Primary Anchor</span>
          </div>
        )}

        {/* Angle Badge */}
        <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md text-slate-300 text-[10px] font-medium px-2 py-0.5 rounded-md border border-slate-700">
          {photo.detectedAngle}
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => onRemove(photo.id)}
          className="absolute top-2 right-2 h-7 w-7 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500/50 transition-colors"
          title="Remove photo"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Footer Details & Quality Indicator */}
      <div className="p-2.5 space-y-1.5 bg-slate-900/90">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-medium">Clarity Score</span>
          <span className={`font-bold ${photo.clarityScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {photo.clarityScore}%
          </span>
        </div>

        {/* Action button to make anchor */}
        {!photo.isAnchor && (
          <button
            type="button"
            onClick={() => onSetAnchor(photo.id)}
            className="w-full py-1 text-[11px] font-semibold text-slate-300 hover:text-amber-400 bg-slate-800/80 hover:bg-slate-800 rounded-md transition-colors flex items-center justify-center space-x-1"
          >
            <Star className="h-3 w-3" />
            <span>Set as Primary Anchor</span>
          </button>
        )}
      </div>
    </div>
  );
};
