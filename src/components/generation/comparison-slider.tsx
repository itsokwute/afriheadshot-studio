'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { AspectRatio } from '../../lib/types';
import { Sliders, Sparkles } from 'lucide-react';

interface ComparisonSliderProps {
  originalUrl: string;
  generatedUrl: string;
  aspectRatio: AspectRatio;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  originalUrl,
  generatedUrl,
  aspectRatio,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(position);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className="space-y-3 select-none">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
        <span className="flex items-center space-x-1.5 text-amber-400">
          <Sliders className="h-4 w-4" />
          <span>Interactive Before & After Comparison</span>
        </span>
        <span className="text-slate-400">Drag center handle to compare</span>
      </div>

      {/* Slider Container */}
      <div
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        className={`relative w-full max-w-md mx-auto overflow-hidden rounded-2xl border-2 border-amber-500/40 shadow-2xl cursor-ew-resize bg-slate-950 ${
          aspectRatio === '1:1' ? 'aspect-square h-[380px]' : 'aspect-[4/5] h-[420px]'
        }`}
      >
        {/* Layer 1: Generated Image (Background Layer) */}
        <img
          src={generatedUrl}
          alt="Generated Headshot"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Layer 2: Original Image (Clipped Layer) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-2xl"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={originalUrl}
            alt="Original Photo"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              width: containerRef.current ? containerRef.current.clientWidth : '100%',
              maxWidth: 'none'
            }}
          />
          {/* Label Badge */}
          <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-slate-300 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border border-slate-700">
            Original Input
          </span>
        </div>

        {/* Generated Label Badge */}
        <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
          AfriHeadshot AI
        </span>

        {/* Draggable Divider Handle Line */}
        <div
          className="absolute inset-y-0 w-0.5 bg-white shadow-2xl pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-slate-950 border-2 border-white text-amber-400 flex items-center justify-center shadow-2xl">
            <Sliders className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
