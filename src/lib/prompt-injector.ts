import { GenerationConfig } from './types';

/**
 * System Prompt Injector for AfriHeadshot Studio.
 * Enforces authentic African facial feature preservation, rich melanin tones,
 * natural skin texture, professional portrait lighting, and strict negative
 * guardrails against artificial skin lightening or feature distortion.
 */

export interface GeneratedPrompts {
  positivePrompt: string;
  negativePrompt: string;
  systemGuardrails: string[];
}

export function buildAuthenticAfricanPrompts(config: GenerationConfig): GeneratedPrompts {
  const {
    background,
    hairstyle,
    outfit,
    skinMelaninTone,
    customInstructions,
    photos,
    enforceAuthenticity
  } = config;

  const photoCount = photos.length;
  const referenceSubjectPrefix = photoCount > 1
    ? `Professional executive headshot portrait of an African professional subject, accurately reconstructed from ${photoCount} high-resolution reference photographs, maintaining exact facial structure, eye shape, nose contour, and authentic smile.`
    : `Professional executive headshot portrait of an authentic African professional subject based on facial reference image, preserving exact face geometry and identity.`;

  // 1. Core Authenticity Guardrail Tokens
  const authenticityTokens = enforceAuthenticity ? [
    `authentic ${skinMelaninTone.toLowerCase()} skin tone with warm natural undertones`,
    `rich melanin complexion`,
    `natural micro skin pores, realistic dermal texture, subtle skin highlights`,
    `authentic facial anatomy, sharp jawline, expressive warm eyes`,
    `preserves natural African facial features without European structural warping or lightening`
  ] : [
    `natural melanin skin tone`,
    `realistic skin texture`
  ];

  // 2. Hairstyle & Hair Texture Tokens
  const hairToken = `styled with ${hairstyle.promptSnippet}`;

  // 3. Outfit & Professional Attire Tokens
  const outfitToken = `attired in ${outfit.promptSnippet}`;

  // 4. Background & Lighting Environment Tokens
  const backgroundToken = `set against ${background.promptSnippet}, illuminated by ${background.lightingStyle}`;

  // 5. High-Resolution Camera & Photography Technical Specification
  const cameraTechSpecs = [
    `shot on Hasselblad H6D-100c medium format camera`,
    `85mm f/1.4 prime lens`,
    `superb crisp focus on eyes and facial detail`,
    `subtle creamy background bokeh`,
    `master studio Rembrandt lighting`,
    `8k resolution, ultra-detailed professional studio portrait`
  ].join(', ');

  // Assemble Positive Prompt
  const promptParts = [
    referenceSubjectPrefix,
    ...authenticityTokens,
    hairToken,
    outfitToken,
    backgroundToken,
    customInstructions ? `Special request: ${customInstructions}` : '',
    cameraTechSpecs
  ].filter(Boolean);

  const positivePrompt = promptParts.join(', ');

  // 6. Strict Negative Prompt Guardrails (Prevents plastic skin, artificial lightening, Caucasian bias)
  const negativePrompt = [
    'artificial skin lightening',
    'bleached skin',
    'pale skin',
    'whitewashed features',
    'caucasian facial features',
    'plastic skin',
    'airbrushed face',
    'over-smoothed skin',
    'doll skin',
    'deformed eyes',
    'asymmetrical facial structure',
    'blurry focus',
    'distorted teeth',
    'extra limbs',
    'cartoon',
    'anime',
    '3d render',
    'watermark',
    'signature',
    'low resolution',
    'bad anatomy'
  ].join(', ');

  return {
    positivePrompt,
    negativePrompt,
    systemGuardrails: authenticityTokens
  };
}
