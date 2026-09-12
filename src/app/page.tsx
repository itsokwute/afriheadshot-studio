'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/navbar';
import { Hero } from '../components/hero';
import { BatchUploader } from '../components/uploader/batch-uploader';
import { ImageCropper } from '../components/uploader/image-cropper';
import { SelectionMatrix } from '../components/matrix/selection-matrix';
import { GenerationQueue } from '../components/generation/generation-queue';
import { ResultCard } from '../components/generation/result-card';
import {
  UploadedPhoto,
  AspectRatio,
  BackgroundPreset,
  HairstylePreset,
  OutfitPreset,
  GenerationProgress,
  GeneratedResult,
  GenerationConfig
} from '../lib/types';
import { BACKGROUND_PRESETS, HAIRSTYLE_PRESETS, OUTFIT_PRESETS } from '../lib/presets-data';
import { Sparkles, Zap, ShieldCheck, Camera, Layers, CheckCircle2, History } from 'lucide-react';

export default function Home() {
  // State management for 10-photo dataset & anchor selection
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [anchorPhotoId, setAnchorPhotoId] = useState<string>('');

  // State management for Crop Aspect Ratio
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');

  // State management for 3 Selection Matrix facets + Melanin tone
  const [selectedBackground, setSelectedBackground] = useState<BackgroundPreset>(BACKGROUND_PRESETS[0]);
  const [selectedHairstyle, setSelectedHairstyle] = useState<HairstylePreset>(HAIRSTYLE_PRESETS[0]);
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitPreset>(OUTFIT_PRESETS[0]);
  const [skinTone, setSkinTone] = useState<'Deep Ebony' | 'Rich Warm Cocoa' | 'Golden Bronze' | 'Natural Deep Brown'>('Rich Warm Cocoa');
  const [customInstructions, setCustomInstructions] = useState('');

  // Generation queue state
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<GenerationProgress>({
    stage: 'idle',
    percent: 0,
    message: ''
  });

  // Results gallery state
  const [results, setResults] = useState<GeneratedResult[]>([]);

  const anchorPhoto = photos.find((p) => p.id === anchorPhotoId) || photos[0];

  // Trigger Headshot AI Generation Workflow
  const handleGenerate = async () => {
    if (photos.length === 0) {
      alert('Please upload at least 1 head & shoulders reference photo.');
      return;
    }

    setIsGenerating(true);
    setProgress({
      stage: 'validating',
      percent: 15,
      message: 'Validating Reference Photos & Facial Landmarks...',
      stepDetails: `Processing ${photos.length} uploaded subject photos for facial feature extraction`
    });

    try {
      // Step 2 Progress: Authenticity System Prompt Injector
      await new Promise((r) => setTimeout(r, 600));
      setProgress({
        stage: 'injecting',
        percent: 45,
        message: 'Injecting Melanin & African Texture Guardrails...',
        stepDetails: `Applying ${skinTone} undertones & authentic 4C hair texture rules`
      });

      // Step 3 Progress: Lighting & Synthesizer
      await new Promise((r) => setTimeout(r, 800));
      setProgress({
        stage: 'generating',
        percent: 75,
        message: 'Synthesizing Studio Lighting & Attire...',
        stepDetails: `Setting background: ${selectedBackground.title}`
      });

      const config: GenerationConfig = {
        photos,
        anchorPhotoId: anchorPhoto ? anchorPhoto.id : photos[0].id,
        aspectRatio,
        background: selectedBackground,
        hairstyle: selectedHairstyle,
        outfit: selectedOutfit,
        skinMelaninTone: skinTone,
        customInstructions,
        enforceAuthenticity: true
      };

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });

      if (!res.ok) {
        throw new Error('Generation service returned an error');
      }

      const generatedData: GeneratedResult = await res.json();

      setProgress({
        stage: 'completed',
        percent: 100,
        message: 'Headshot Render Complete!'
      });

      setResults((prev) => [generatedData, ...prev]);
    } catch (err: any) {
      console.error(err);
      alert('Generation error. Please check your network or try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Showcase Section */}
      <Hero />

      {/* Studio Workspace Application Section */}
      <main id="studio" className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-10 space-y-12">
        
        {/* Workspace Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <Camera className="h-6 w-6 text-amber-400" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Headshot Creation Studio
              </h2>
            </div>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              Follow the 2 simple steps below to generate studio-grade executive headshots.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-slate-300">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Identity Protection Active</span>
            </span>
          </div>
        </div>

        {/* Step 1: 10-Photo Batch Uploader & Aspect Ratio Cropper */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <BatchUploader
              photos={photos}
              onPhotosChange={setPhotos}
              anchorPhotoId={anchorPhotoId}
              onAnchorChange={setAnchorPhotoId}
            />
          </div>

          <div>
            <ImageCropper
              imageUrl={anchorPhoto ? anchorPhoto.url : ''}
              selectedRatio={aspectRatio}
              onRatioChange={setAspectRatio}
            />
          </div>
        </div>

        {/* Step 2: Preset Selection Matrix Engine */}
        <SelectionMatrix
          selectedBackground={selectedBackground}
          onSelectBackground={setSelectedBackground}
          selectedHairstyle={selectedHairstyle}
          onSelectHairstyle={setSelectedHairstyle}
          selectedOutfit={selectedOutfit}
          onSelectOutfit={setSelectedOutfit}
          skinTone={skinTone}
          onSkinToneChange={setSkinTone}
        />

        {/* Optional Custom Prompt Override */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
          <label className="text-xs font-bold text-slate-300 block">
            Optional Custom Prompt Instructions
          </label>
          <input
            type="text"
            placeholder="e.g. Add subtle executive silver rim glasses, Rembrandt soft window lighting..."
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Primary Generation CTA Button */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || photos.length === 0}
            className="relative inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-base md:text-lg px-10 py-4 rounded-2xl shadow-xl shadow-amber-500/25 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Zap className="h-6 w-6 fill-slate-950" />
            <span>
              {isGenerating
                ? 'Processing AI Pipeline...'
                : `Generate Studio Headshot (${photos.length} Photos Dataset)`}
            </span>
          </button>
          {photos.length === 0 && (
            <p className="text-xs text-amber-400/80 mt-2 font-medium">
              * Upload at least 1 photo above to activate generation button.
            </p>
          )}
        </div>

        {/* Generation Queue Live Status */}
        {isGenerating && (
          <div className="pt-6">
            <GenerationQueue progress={progress} />
          </div>
        )}

        {/* Results Gallery Section */}
        {results.length > 0 && (
          <section className="pt-8 space-y-6 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <History className="h-5 w-5 text-amber-400" />
                <h3 className="font-bold text-white text-xl">Generated Headshots Studio Gallery</h3>
                <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  {results.length} Headshots
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((res) => (
                <ResultCard key={res.id} result={res} />
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="font-semibold text-slate-400">
            AfriHeadshot Studio © 2026 • Tailored for African Executive & Professional Excellence
          </p>
          <p>
            Strictly enforcing authentic melanin skin tones, natural afro hair preservation, and zero skin-lightening bias.
          </p>
        </div>
      </footer>
    </div>
  );
}
