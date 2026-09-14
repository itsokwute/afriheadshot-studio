import { GenerationConfig } from './types';

export interface GeneratedPrompts {
  positivePrompt: string;
  negativePrompt: string;
  systemGuardrails: string[];
}

/**
 * Photorealistic Prompt Engine for AfriHeadshot Studio.
 * Enforces Hasselblad H6D-100c DSLR commercial photography tokens and mandatory negative prompts.
 */
export function compilePrompt(config: GenerationConfig): GeneratedPrompts {
  const {
    background,
    hairstyle,
    outfit,
    skinMelaninTone,
    customInstructions,
    enforceAuthenticity
  } = config;

  // Determine gender context from hairstyle preset if available
  const genderTerm = hairstyle.gender === 'women'
    ? 'woman'
    : hairstyle.gender === 'men'
    ? 'man'
    : 'executive';

  // 1. Mandatory Positive Prompt Structure
  const positivePrompt = `Award-winning corporate executive portrait photograph of an African professional ${genderTerm}, styled with ${hairstyle.promptSnippet}, wearing ${outfit.promptSnippet}, set against ${background.promptSnippet} with subtle depth of field f/1.8, illuminated by ${background.lightingStyle}. Authentic ${skinMelaninTone.toLowerCase()} skin tone, Shot on Hasselblad H6D-100c, 85mm portrait lens, commercial studio lighting, soft diffused rim light, authentic rich melanin skin texture, natural pores, sharp focus on eyes, photorealistic, 8k resolution, true colors, professional LinkedIn headshot.${customInstructions ? ` ${customInstructions}` : ''}`;

  // 2. Mandatory Negative Prompt
  const negativePrompt = "cartoon, vector, 2d, illustration, drawing, 3d render, anime, cgi, digital painting, smooth plastic skin, airbrushed, oversaturated, deformed eyes, extra limbs, blurry, low resolution, watermark, text, clipart, disfigured.";

  const systemGuardrails = [
    `authentic ${skinMelaninTone.toLowerCase()} skin tone`,
    `Hasselblad H6D-100c 85mm portrait photography`,
    `commercial studio lighting & natural dermal texture`
  ];

  return {
    positivePrompt,
    negativePrompt,
    systemGuardrails
  };
}

export function buildAuthenticAfricanPrompts(config: GenerationConfig): GeneratedPrompts {
  return compilePrompt(config);
}
