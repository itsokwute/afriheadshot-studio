import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export const maxDuration = 60; // 60 seconds serverless execution timeout for Vercel

export async function POST(req: NextRequest) {
  try {
    const token = process.env.REPLICATE_API_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN environment variable is not configured on server." },
        { status: 500 }
      );
    }

    const replicate = new Replicate({
      auth: token,
    });

    const body = await req.json();

    // Extract input image (supports direct image property or photos dataset)
    const image = body.image || (body.photos && body.photos.length > 0 
      ? (body.photos.find((p: any) => p.id === body.anchorPhotoId)?.url || body.photos[0].url) 
      : null);

    if (!image) {
      return NextResponse.json({ error: "Input face image is required." }, { status: 400 });
    }

    const backgroundPrompt = body.backgroundPrompt || body.background?.promptSnippet || body.background?.title || "modern corporate glass office with soft bokeh";
    const hairstylePrompt = body.hairstylePrompt || body.hairstyle?.promptSnippet || body.hairstyle?.title || "natural neat hair";
    const outfitPrompt = body.outfitPrompt || body.outfit?.promptSnippet || body.outfit?.title || "tailored navy business suit";

    // Strict photorealistic prompt structure
    const prompt = `Cinematic professional executive studio portrait of an African professional, ${hairstylePrompt}, wearing ${outfitPrompt}, ${backgroundPrompt}, shot on Hasselblad H6D-100c, 85mm portrait lens, commercial studio rim lighting, authentic rich melanin skin texture, natural skin pores, highly detailed sharp eyes, photorealistic, 8k, professional LinkedIn profile photo`;

    const negative_prompt = "cartoon, 3d render, vector, illustration, drawing, painting, stock watermark, text, blurry, distorted face, bad anatomy, over-smoothed skin, plastic skin, bad eyes, disfigured, fake collar, cutout collar";

    // Call FLUX PuLID on Replicate directly
    const output = await replicate.run(
      "bytedance/flux-pulid:8baa7ef2255075b46f4d91cd238c21d31181b3e6a864463f967960bb0112525b",
      {
        input: {
          main_face_image: image,
          prompt: prompt,
          negative_prompt: negative_prompt,
          num_steps: 30,
          start_step: 4,
          guidance_scale: 4.0,
          id_weight: 1.0,
          num_outputs: 1,
        },
      }
    );

    const resultUrl = Array.isArray(output) ? output[0] : output;

    if (!resultUrl) {
      return NextResponse.json(
        { error: "Replicate model returned an empty prediction." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl: resultUrl,
      highResUrl: resultUrl,
      id: `gen-${Date.now()}`,
      originalAnchorUrl: image,
      aspectRatio: body.aspectRatio || '1:1',
      positivePrompt: prompt,
      negativePrompt: negative_prompt,
      createdAt: new Date().toISOString(),
      backgroundTitle: body.background?.title || 'Executive Suite',
      hairstyleTitle: body.hairstyle?.title || 'Natural Style',
      outfitTitle: body.outfit?.title || 'Corporate Suit',
      seed: Math.floor(Math.random() * 9000000) + 1000000,
      photoReferenceCount: body.photos ? body.photos.length : 1
    });
  } catch (error: any) {
    console.error("Replicate generation failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate headshot" },
      { status: 500 }
    );
  }
}
