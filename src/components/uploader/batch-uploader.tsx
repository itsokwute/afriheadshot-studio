'use client';

import React, { useRef, useState } from 'react';
import { UploadedPhoto } from '../../lib/types';
import { analyzePhotoQuality } from '../../lib/canvas-utils';
import { PhotoCard } from './photo-card';
import { Upload, CheckCircle2, Sparkles, UserCheck, Info } from 'lucide-react';
import { useTheme } from '../../lib/theme-context';

interface BatchUploaderProps {
  photos: UploadedPhoto[];
  onPhotosChange: (photos: UploadedPhoto[]) => void;
  anchorPhotoId: string;
  onAnchorChange: (id: string) => void;
}

// Convert a local File object to a standalone base64 Data URL
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

// Fetch an image URL and convert to a standalone base64 Data URL
async function imageUrlToDataUrl(url: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width || 600;
      canvas.height = img.height || 600;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        try {
          resolve(canvas.toDataURL('image/jpeg', 0.95));
          return;
        } catch (e) {
          // fallback if tainted
        }
      }
      resolve(url);
    };
    img.onerror = () => resolve(url);
    img.src = url;
  });
}

export const BatchUploader: React.FC<BatchUploaderProps> = ({
  photos,
  onPhotosChange,
  anchorPhotoId,
  onAnchorChange,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);

    const remainingSlots = 10 - photos.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    const newUploadedPhotos: UploadedPhoto[] = [];

    for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i];
      if (!file.type.startsWith('image/')) continue;

      try {
        const base64Url = await fileToDataUrl(file);
        const quality = await analyzePhotoQuality(base64Url);
        const photoId = `photo-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

        newUploadedPhotos.push({
          id: photoId,
          url: base64Url,
          file,
          isAnchor: photos.length === 0 && i === 0,
          clarityScore: quality.clarityScore,
          lightingScore: quality.lightingScore,
          hasHeadAndShoulders: quality.hasHeadAndShoulders,
          detectedAngle: quality.detectedAngle,
          uploadedAt: new Date()
        });
      } catch (err) {
        console.error('Error reading file as data URL:', err);
      }
    }

    const updated = [...photos, ...newUploadedPhotos];
    onPhotosChange(updated);

    if (!anchorPhotoId && updated.length > 0) {
      onAnchorChange(updated[0].id);
    }

    setIsProcessing(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (id: string) => {
    const updated = photos.filter((p) => p.id !== id);
    onPhotosChange(updated);
    if (anchorPhotoId === id && updated.length > 0) {
      onAnchorChange(updated[0].id);
    }
  };

  const handleSetAnchor = (id: string) => {
    const updated = photos.map((p) => ({
      ...p,
      isAnchor: p.id === id
    }));
    onPhotosChange(updated);
    onAnchorChange(id);
  };

  const handleLoadSampleDataset = async () => {
    setIsProcessing(true);
    const sampleUrls = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
    ];

    const newPhotos: UploadedPhoto[] = [];
    const angles: ('Frontal' | '3/4 Left' | '3/4 Right' | 'Slight Tilt')[] = [
      'Frontal', '3/4 Left', '3/4 Right', 'Slight Tilt'
    ];

    for (let i = 0; i < sampleUrls.length; i++) {
      const rawUrl = sampleUrls[i];
      const dataUrl = await imageUrlToDataUrl(rawUrl);
      const photoId = `sample-${Date.now()}-${i}`;
      newPhotos.push({
        id: photoId,
        url: dataUrl,
        file: new File([], `sample-${i}.jpg`),
        isAnchor: photos.length === 0 && i === 0,
        clarityScore: 92 + i * 2,
        lightingScore: 94,
        hasHeadAndShoulders: true,
        detectedAngle: angles[i % angles.length],
        uploadedAt: new Date()
      });
    }

    const updated = [...photos, ...newPhotos].slice(0, 10);
    onPhotosChange(updated);
    if (!anchorPhotoId && updated.length > 0) {
      onAnchorChange(updated[0].id);
    }
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border ${
        isLight
          ? 'bg-white border-slate-200 shadow-sm'
          : isTerracotta
          ? 'bg-white border-[#E8DFD5] shadow-sm'
          : 'bg-slate-900/80 border-amber-900/30'
      }`}>
        <div>
          <div className="flex items-center space-x-2">
            <UserCheck className="h-5 w-5 text-amber-500" />
            <h3 className={`font-bold text-base ${isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'}`}>
              Step 1: Upload Reference Photos
            </h3>
            <span className="bg-amber-500/20 text-amber-600 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">
              {photos.length} / 10 Photos
            </span>
          </div>
          <p className="text-xs opacity-75 mt-1">
            Supply up to 10 photos of head & shoulders where facial features are clearly visible for maximum identity accuracy.
          </p>
        </div>

        {/* Quick sample dataset button for first timers */}
        {photos.length < 10 && (
          <button
            type="button"
            onClick={handleLoadSampleDataset}
            disabled={isProcessing}
            className={`inline-flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all self-start sm:self-auto shrink-0 ${
              isLight
                ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                : isTerracotta
                ? 'bg-[#F4EBE2] hover:bg-[#EFE8DF] text-[#A34B24] border-[#E8DFD5]'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
            } disabled:opacity-50`}
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>{isProcessing ? 'Processing...' : 'Try Demo Sample Photos'}</span>
          </button>
        )}
      </div>

      {/* Upload Drag and Drop Area */}
      {photos.length < 10 && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsHovering(true);
          }}
          onDragLeave={() => setIsHovering(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
            isHovering
              ? 'border-amber-500 bg-amber-500/10'
              : isLight
              ? 'border-slate-300 bg-slate-50/80 hover:border-amber-500 hover:bg-amber-50/30'
              : isTerracotta
              ? 'border-[#D6C4B4] bg-white hover:border-amber-600 hover:bg-[#FAF7F2]'
              : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/40'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />

          <div className="flex flex-col items-center space-y-3">
            <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Upload className="h-7 w-7" />
            </div>
            <div>
              <p className={`text-sm font-semibold ${isLight ? 'text-slate-900' : isTerracotta ? 'text-[#2D241E]' : 'text-white'}`}>
                {isProcessing ? 'Encoding High-Res Photos...' : 'Drag & Drop 1 to 10 Head & Shoulder Photos'}
              </p>
              <p className="text-xs opacity-75 mt-1">
                Supports PNG, JPG, or WEBP (Facial features clearly visible)
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs opacity-75 pt-2">
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>Good lighting</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>Natural expression</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>Varied angles welcome</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* First Timer Helper Banner */}
      {photos.length === 0 && (
        <div className={`p-3.5 rounded-xl border flex items-center space-x-3 text-xs ${
          isLight
            ? 'bg-amber-50 border-amber-200 text-amber-900'
            : isTerracotta
            ? 'bg-[#F4EBE2] border-[#E8DFD5] text-[#A34B24]'
            : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
        }`}>
          <Info className="h-4 w-4 shrink-0 text-amber-500" />
          <span><strong>First time here?</strong> Click "Try Demo Sample Photos" above to instantly load test photos and try the headshot builder in seconds!</span>
        </div>
      )}

      {/* Uploaded Photos Grid */}
      {photos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold opacity-80 px-1">
            <span>Uploaded Subject Photos ({photos.length})</span>
            <span className="text-amber-500 font-normal">Click any photo to make it the Primary Crop Anchor</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {photos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onSetAnchor={handleSetAnchor}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
