export type AspectRatio = '1:1' | '4:5';

export type BackgroundCategory = 
  | 'Executive Suites'
  | 'Corporate Skylines'
  | 'Tech Hub Glass'
  | 'Studio Gradients'
  | 'Terracotta & Wood'
  | 'African Boardrooms';

export interface BackgroundPreset {
  id: string;
  title: string;
  category: BackgroundCategory;
  description: string;
  cityOrSetting?: string;
  gradientCss: string;
  lightingStyle: string;
  promptSnippet: string;
}

export type GenderCategory = 'all' | 'men' | 'women';

export interface HairstylePreset {
  id: string;
  title: string;
  gender: GenderCategory;
  description: string;
  textureType: string;
  promptSnippet: string;
  iconName?: string;
}

export interface OutfitPreset {
  id: string;
  title: string;
  category: 'Global Formal' | 'African Formal' | 'Smart Casual';
  description: string;
  promptSnippet: string;
  colorPalette: string[];
}

export interface UploadedPhoto {
  id: string;
  url: string; // Data URL or object URL
  file: File;
  isAnchor: boolean;
  clarityScore: number; // 0 to 100
  lightingScore: number; // 0 to 100
  hasHeadAndShoulders: boolean;
  detectedAngle: 'Frontal' | '3/4 Left' | '3/4 Right' | 'Slight Tilt';
  uploadedAt: Date;
}

export interface GenerationConfig {
  photos: UploadedPhoto[];
  anchorPhotoId: string;
  aspectRatio: AspectRatio;
  background: BackgroundPreset;
  hairstyle: HairstylePreset;
  outfit: OutfitPreset;
  skinMelaninTone: 'Deep Ebony' | 'Rich Warm Cocoa' | 'Golden Bronze' | 'Natural Deep Brown';
  customInstructions?: string;
  enforceAuthenticity: boolean;
}

export interface GenerationProgress {
  stage: 'idle' | 'validating' | 'extracting' | 'injecting' | 'generating' | 'rendering' | 'completed' | 'error';
  percent: number;
  message: string;
  stepDetails?: string;
}

export interface GeneratedResult {
  id: string;
  imageUrl: string;
  highResUrl: string;
  originalAnchorUrl: string;
  aspectRatio: AspectRatio;
  positivePrompt: string;
  negativePrompt: string;
  createdAt: string;
  backgroundTitle: string;
  hairstyleTitle: string;
  outfitTitle: string;
  metadata?: {
    backgroundTitle?: string;
    hairstyleTitle?: string;
    outfitTitle?: string;
  };
  seed: number;
  photoReferenceCount: number;
}
