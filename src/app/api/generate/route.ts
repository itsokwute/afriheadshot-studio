import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export const maxDuration = 60; // Prevents Vercel serverless function timeout
export const dynamic = "force-dynamic";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, backgroundPrompt, hairstylePrompt, outfitPrompt } = body;

    if (!image) {
      return NextResponse.json(
        { error: "No input face image provided." },
        { status: 400 }
      );
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN is missing on server environment." },
        { status: 500 }
      );
    }

    // High-fidelity photorealistic LinkedIn portrait prompt
    const prompt = `Award-winning corporate executive studio portrait of an African professional, ${
      hairstylePrompt || "natural groomed afro hair"
    }, wearing ${
      outfitPrompt || "bespoke executive suit"
    }, ${
      backgroundPrompt || "modern corporate office background with shallow depth of field"
    }, shot on 85mm lens, f/1.8, soft diffused commercial studio rim lighting, realistic melanin skin pores and texture, sharp focus on eyes, 8k resolution, photorealistic LinkedIn profile photo`;

    const negative_prompt =
      "cartoon, 3d render, vector, illustration, drawing, painting, blurry, deformed face, bad eyes, plastic skin, airbrushed, stock watermark, low resolution";

    // Call FLUX PuLID model on Replicate
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
          output_format: "webp",
        },
      }
    );

    // PuLID returns an array of URL objects or strings
    const imageUrl = Array.isArray(output)
      ? typeof output[0] === "object" && output[0]?.url
        ? output[0].url()
        : output[0]
      : output;

    return NextResponse.json({ success: true, imageUrl });
  } catch (error: any) {
    console.error("Replicate execution error:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate headshot" },
      { status: 500 }
    );
  }
}