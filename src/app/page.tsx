'use client';

import React, { useState } from 'react';
import { ThemeProvider, useTheme } from '../lib/theme-context';
import { Navbar } from '../components/navbar';
import { Hero } from '../components/hero';
import { BatchUploader } from '../components/uploader/batch-uploader';
import { ImageCropper } from '../components/uploader/image-cropper';
import { SelectionMatrix } from '../components/matrix/selection-matrix';
import { GenerationQueue } from '../components/generation/generation-queue';
import { ResultCard } from '../components/generation/result-card';
import { ImageLightboxModal } from '../components/ImageLightboxModal';
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
import { UserCheck, Zap, CheckCircle2, History, ArrowRight, Square, Circle } from 'lucide-react';

function StudioApp() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isTerracotta = theme === 'terracotta';

  // State management for 10-photo dataset & anchor selection
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [anchorPhotoId, setAnchorPhotoId] = useState<string>('');

  // Active step wizard tracker (1: Upload, 2: Crop, 3: Style Matrix, 4: Results)
  const [activeStep, setActiveStep] = useState<number>(1);

  // Lightbox modal index state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Global LinkedIn avatar circle preview toggle state in gallery view
  const [globalCirclePreview, setGlobalCirclePreview] = useState<boolean>(false);

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
      message: 'Validating Reference Photos & Facial Feature Map...',
      stepDetails: `Processing ${photos.length} uploaded subject photos for facial feature extraction`
    });

    try {
      await new Promise((r) => setTimeout(r, 600));
      setProgress({
        stage: 'injecting',
        percent: 45,
        message: 'Injecting Melanin & African Texture Guardrails...',
        stepDetails: `Applying ${skinTone} undertones & authentic 4C hair texture rules`
      });

      await new Promise((r) => setTimeout(r, 800));
      setProgress({
        stage: 'generating',
        percent: 75,
        message: 'Synthesizing Studio Lighting & Attire (Generating 2 Variations)...',
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
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Generation service returned an error');
      }

      const resData = await res.json();

      let newHeadshots: GeneratedResult[] = [];
      if (Array.isArray(resData.results) && resData.results.length > 0) {
        newHeadshots = resData.results;
      } else if (Array.isArray(resData.images) && resData.images.length > 0) {
        newHeadshots = resData.images.map((imgUrl: string, idx: number) => ({
          id: `gen-${Date.now()}-${idx}`,
          imageUrl: imgUrl,
          highResUrl: imgUrl,
          originalAnchorUrl: anchorPhoto ? anchorPhoto.url : '',
          aspectRatio,
          positivePrompt: '',
          negativePrompt: '',
          createdAt: new Date().toISOString(),
          backgroundTitle: resData.metadata?.backgroundTitle || selectedBackground.title,
          hairstyleTitle: resData.metadata?.hairstyleTitle || selectedHairstyle.title,
          outfitTitle: resData.metadata?.outfitTitle || selectedOutfit.title,
          metadata: resData.metadata,
          seed: Math.floor(Math.random() * 9000000) + 1000000,
          photoReferenceCount: photos.length
        }));
      } else {
        newHeadshots = [resData];
      }

      setProgress({
        stage: 'completed',
        percent: 100,
        message: 'Batch Headshot Render Complete!'
      });

      setResults((prev) => [...newHeadshots, ...prev]);
      setActiveStep(4);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Generation error. Please check your network or try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 pb-20 md:pb-0 ${
      isLight
        ? 'bg-slate-50 text-slate-900 selection:bg-amber-400'
        : isTerracotta
        ? 'bg-[#FAF7F2] text-[#2D241E] selection:bg-[#C86D44] selection:text-white'
        : 'bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950'
    }`}>
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Showcase Section - Auto-collapses on Step 4 (Results Gallery) */}
      {activeStep !== 4 && <Hero />}

      {/* Studio Workspace Application Section */}
      <main id="studio" className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-10 space-y-10">
        
        {/* First-Timers Guided Stepper Bar with Enhanced Light/Terracotta Contrast */}
        <div className={`p-4 rounded-2xl border transition-colors ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm'
            : isTerracotta
            ? 'bg-white border-[#E8DFD5] shadow-sm'
            : 'bg-slate-900/80 border-slate-800'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className={`p-3 rounded-xl flex items-center justify-center space-x-2 transition-all ${
                activeStep === 1
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : photos.length > 0
                  ? isLight
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : isTerracotta
                    ? 'bg-[#EBF5ED] text-[#1E562F] border border-[#B3DDC0]'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : isLight
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  : isTerracotta
                  ? 'bg-[#F4EBE2] text-[#2D241E] hover:bg-[#EFE8DF] border border-[#E8DFD5]'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
              }`}
            >
              <span className="h-5 w-5 rounded-full bg-slate-950/20 flex items-center justify-center text-[10px]">1</span>
              <span>1. Upload Photos</span>
              {photos.length > 0 && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
            </button>

            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className={`p-3 rounded-xl flex items-center justify-center space-x-2 transition-all ${
                activeStep === 2
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : isLight
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  : isTerracotta
                  ? 'bg-[#F4EBE2] text-[#2D241E] hover:bg-[#EFE8DF] border border-[#E8DFD5]'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
              }`}
            >
              <span className="h-5 w-5 rounded-full bg-slate-950/20 flex items-center justify-center text-[10px]">2</span>
              <span>2. Crop & Frame</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveStep(3)}
              className={`p-3 rounded-xl flex items-center justify-center space-x-2 transition-all ${
                activeStep === 3
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : isLight
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  : isTerracotta
                  ? 'bg-[#F4EBE2] text-[#2D241E] hover:bg-[#EFE8DF] border border-[#E8DFD5]'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
              }`}
            >
              <span className="h-5 w-5 rounded-full bg-slate-950/20 flex items-center justify-center text-[10px]">3</span>
              <span>3. Choose Styles</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveStep(4)}
              className={`p-3 rounded-xl flex items-center justify-center space-x-2 transition-all ${
                activeStep === 4
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : results.length > 0
                  ? isLight
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : isTerracotta
                    ? 'bg-[#EBF5ED] text-[#1E562F] border border-[#B3DDC0]'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : isLight
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  : isTerracotta
                  ? 'bg-[#F4EBE2] text-[#2D241E] hover:bg-[#EFE8DF] border border-[#E8DFD5]'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700'
              }`}
            >
              <span className="h-5 w-5 rounded-full bg-slate-950/20 flex items-center justify-center text-[10px]">4</span>
              <span>4. Results Gallery</span>
              {results.length > 0 && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
            </button>
          </div>
        </div>

        {/* Step 1 & Step 2 Panel: Photos Upload & Aspect Ratio Cropper */}
        {(activeStep === 1 || activeStep === 2) && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <BatchUploader
                  photos={photos}
                  onPhotosChange={(newPhotos) => {
                    setPhotos(newPhotos);
                    if (newPhotos.length > 0 && activeStep === 1) {
                      setActiveStep(2);
                    }
                  }}
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

                <div className="mt-4 text-right">
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    disabled={photos.length === 0}
                    className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all disabled:opacity-50"
                  >
                    <span>Next: Select Background & Styles</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 Panel: Selection Matrix Engine */}
        {activeStep === 3 && (
          <div className="space-y-6">
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

            {/* Optional Custom Instructions */}
            <div className={`border rounded-2xl p-5 space-y-2 ${
              isLight ? 'bg-white border-slate-200' : isTerracotta ? 'bg-white border-[#E8DFD5]' : 'bg-slate-900/60 border-slate-800'
            }`}>
              <label className="text-xs font-bold opacity-90 block">
                Optional Custom Prompt Instructions
              </label>
              <input
                type="text"
                placeholder="e.g. Add subtle executive silver rim glasses, Rembrandt soft window lighting..."
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                className={`w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-amber-500 border ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : isTerracotta ? 'bg-[#FAF7F2] border-[#E8DFD5]' : 'bg-slate-950 border-slate-800 text-white'
                }`}
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
                    ? 'Processing AI Batch Pipeline...'
                    : `Generate 2 Studio Headshots (${photos.length} Photos Dataset)`}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Generation Queue Live Status */}
        {isGenerating && (
          <div className="pt-4">
            <GenerationQueue progress={progress} />
          </div>
        )}

        {/* Step 4 / Gallery Panel: Results Gallery */}
        {(activeStep === 4 || results.length > 0) && (
          <section className="pt-6 space-y-6 border-t border-slate-200/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <History className="h-5 w-5 text-amber-500" />
                <h3 className="font-bold text-xl">Generated Headshots Studio Gallery</h3>
                <span className="bg-amber-500/20 text-amber-600 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  {results.length} Headshots
                </span>
              </div>

              {/* Global Gallery Preview Mode Toggle */}
              <div className="flex items-center space-x-3">
                <div className={`flex items-center space-x-1 p-1 rounded-xl border text-xs font-semibold ${
                  isLight ? 'bg-slate-100 border-slate-200' : isTerracotta ? 'bg-[#F4EBE2] border-[#E8DFD5]' : 'bg-slate-900 border-slate-800'
                }`}>
                  <button
                    type="button"
                    onClick={() => setGlobalCirclePreview(false)}
                    className={`px-3 py-1 rounded-lg flex items-center space-x-1 transition-all ${
                      !globalCirclePreview ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Square className="h-3.5 w-3.5" />
                    <span>Square (1:1)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGlobalCirclePreview(true)}
                    className={`px-3 py-1 rounded-lg flex items-center space-x-1 transition-all ${
                      globalCirclePreview ? 'bg-amber-500 text-slate-950 font-bold shadow-md' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Circle className="h-3.5 w-3.5" />
                    <span>LinkedIn Avatar Preview</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="text-xs font-semibold text-amber-500 hover:underline flex items-center space-x-1"
                >
                  <span>+ Create Another Variant</span>
                </button>
              </div>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((res, idx) => (
                  <ResultCard
                    key={res.id}
                    result={res}
                    globalCirclePreview={globalCirclePreview}
                    onOpenLightbox={() => setLightboxIndex(idx)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 opacity-60 text-sm">
                No headshots generated yet. Click "3. Choose Styles" above and press Generate!
              </div>
            )}
          </section>
        )}

      </main>

      {/* Fixed Safe-Area Padded Bottom Bar for Mobile Screen CTA */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 p-4 border-t z-40 flex items-center justify-between shadow-2xl backdrop-blur ${
        isLight
          ? 'bg-white/95 border-slate-200 text-slate-900'
          : isTerracotta
          ? 'bg-[#FAF7F2]/95 border-[#E8DFD5] text-[#2D241E]'
          : 'bg-slate-950/95 border-slate-800 text-white'
      }`}>
        <div className="text-xs">
          <p className="font-bold">{photos.length} Photos Loaded</p>
          <p className="text-[10px] text-amber-500 font-medium truncate max-w-[140px]">
            {selectedBackground.title}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (activeStep < 3) {
              setActiveStep(3);
            } else {
              handleGenerate();
            }
          }}
          disabled={isGenerating || (activeStep === 3 && photos.length === 0)}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs px-5 py-3 rounded-xl shadow-lg flex items-center space-x-2 disabled:opacity-50"
        >
          <Zap className="h-4 w-4 fill-slate-950" />
          <span>
            {isGenerating
              ? 'Generating...'
              : activeStep < 3
              ? 'Continue to Styles'
              : 'Generate Headshots'}
          </span>
        </button>
      </div>

      {/* Fullscreen Image Lightbox Overlay Modal */}
      {lightboxIndex !== null && results.length > 0 && (
        <ImageLightboxModal
          results={results}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onReroll={() => {
            setLightboxIndex(null);
            handleGenerate();
          }}
        />
      )}

      {/* Footer */}
      <footer className={`border-t py-8 px-4 text-center text-xs opacity-75 transition-colors ${
        isLight ? 'bg-white border-slate-200' : isTerracotta ? 'bg-[#FAF7F2] border-[#E8DFD5]' : 'bg-slate-950 border-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="font-semibold">
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

export default function Home() {
  return (
    <ThemeProvider>
      <StudioApp />
    </ThemeProvider>
  );
}
