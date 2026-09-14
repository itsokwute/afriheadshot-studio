import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export const maxDuration = 60; // Extends Vercel Hobby serverless execution limit
export const dynamic = "force-dynamic";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Extract input image (supports direct image property or photos dataset)
    const image = body.image || (body.photos && body.photos.length > 0 
      ? (body.photos.find((p: any) => p.id === body.anchorPhotoId)?.url || body.photos[0].url) 
      : null);

    if (!image) {
      return NextResponse.json({ error: "No input face image provided." }, { status: 400 });
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json({ error: "REPLICATE_API_TOKEN is missing on server." }, { status: 500 });
    }

    const backgroundPrompt = body.backgroundPrompt || body.background?.promptSnippet || body.background?.title || "modern corporate office background with shallow depth of field";
    const hairstylePrompt = body.hairstylePrompt || body.hairstyle?.promptSnippet || body.hairstyle?.title || "natural groomed hair";
    const outfitPrompt = body.outfitPrompt || body.outfit?.promptSnippet || body.outfit?.title || "bespoke executive suit";

    const prompt = `Award-winning corporate executive studio portrait of an African professional, ${hairstylePrompt}, wearing ${outfitPrompt}, ${backgroundPrompt}, shot on 85mm lens, f/1.8, soft studio rim lighting, realistic melanin skin pores and texture, photorealistic, 8k, professional LinkedIn profile photo`;

    const negative_prompt = "cartoon, 3d render, vector, illustration, drawing, painting, blurry, deformed face, bad eyes, plastic skin, airbrushed, stock watermark";

    const output: any = await replicate.run(
      "bytedance/flux-pulid:8baa7ef2255075b46f4d91cd238c21d31181b3e6a864463f967960bb0112525b",
      {
        input: {
          main_face_image: image,
          prompt: prompt,
          negative_prompt: negative_prompt,
          num_steps: 20,
          start_step: 2,
          guidance_scale: 4.0,
          id_weight: 1.0,
          width: 896,
          height: 1152,
          num_outputs: 1,
          output_format: "webp"
        },
      }
    );

    const imageUrl = Array.isArray(output) ? output[0] : output;

    if (!imageUrl) {
      return NextResponse.json({ error: "Replicate model returned an empty prediction." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      imageUrl,
      highResUrl: imageUrl,
      id: `gen-${Date.now()}`,
      originalAnchorUrl: image,
      aspectRatio: body.aspectRatio || '1:1',
      positivePrompt: prompt,
      negativePrompt: negative_prompt,
      createdAt: new Date().toISOString(),
      backgroundTitle: body.background?.title || 'Executive Office',
      hairstyleTitle: body.hairstyle?.title || 'Groomed Hair',
      outfitTitle: body.outfit?.title || 'Executive Suit',
      seed: Math.floor(Math.random() * 9000000) + 1000000,
      photoReferenceCount: body.photos ? body.photos.length : 1
    });
  } catch (error: any) {
    console.error("Replicate execution error:", error?.response?.data || error?.message || error);
    return NextResponse.json(
      { error: error?.response?.data || error?.message || "Failed to generate headshot" },
      { status: 500 }
    );
  }
}
