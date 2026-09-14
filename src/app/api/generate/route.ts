import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const token = process.env.REPLICATE_API_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN is missing on server." },
        { status: 500 }
      );
    }

    const body = await req.json();

    // 1. Locate the anchor photo or first photo
    let targetImage: string | null = null;
    if (Array.isArray(body.photos) && body.photos.length > 0) {
      const anchor = body.photos.find((p: any) => p.id === body.anchorPhotoId) || body.photos[0];
      targetImage = anchor.dataUrl || anchor.url || anchor.src || anchor.base64 || anchor.image || (typeof anchor === "string" ? anchor : null);
    } else if (body.image) {
      targetImage = body.image;
    }

    if (!targetImage) {
      return NextResponse.json(
        { error: "Could not find a valid base64 or URL image in photos payload." },
        { status: 400 }
      );
    }

    // 2. Extract style descriptions from nested objects or strings
    const hairDesc = body.hairstyle?.title || body.hairstyle?.promptSnippet || body.hairstylePrompt || "natural groomed hair";
    const outfitDesc = body.outfit?.title || body.outfit?.promptSnippet || body.outfitPrompt || "bespoke executive suit";
    const bgDesc = body.background?.title || body.background?.promptSnippet || body.backgroundPrompt || "modern executive office";
    const skinTone = body.skinMelaninTone ? `${body.skinMelaninTone} skin tone` : "authentic rich melanin skin";
    const custom = body.customInstructions || "";

    // 3. Set dimensions based on aspect ratio
    const isPortrait = body.aspectRatio === "4:5";
    const width = isPortrait ? 896 : 1024;
    const height = isPortrait ? 1152 : 1024;

    const replicate = new Replicate({ auth: token });

    const prompt = `Award-winning corporate executive studio portrait of an African professional, ${skinTone}, ${hairDesc}, wearing ${outfitDesc}, ${bgDesc}, ${custom}, shot on Hasselblad H6D-100c, 85mm portrait lens, f/1.8, soft commercial rim lighting, realistic melanin skin pores, sharp detailed eyes, 8k resolution, photorealistic LinkedIn profile photo`;

    const negative_prompt =
      "cartoon, 3d render, vector, illustration, drawing, painting, bad eyes, distorted face, plastic skin, airbrushed, stock watermark, amateur, low resolution";

    const output: any = await replicate.run(
      "bytedance/flux-pulid:8baa7ef2255075b46f4d91cd238c21d31181b3e6a864463f967960bb0112525b",
      {
        input: {
          main_face_image: targetImage,
          prompt: prompt,
          negative_prompt: negative_prompt,
          num_steps: 20,
          start_step: 2,
          guidance_scale: 4.0,
          id_weight: 1.0,
          width: width,
          height: height,
          num_outputs: 1,
          output_format: "webp",
        },
      }
    );

    let imageUrl = "";
    if (Array.isArray(output)) {
      imageUrl = typeof output[0] === "string" ? output[0] : output[0]?.url?.() || String(output[0]);
    } else if (typeof output === "string") {
      imageUrl = output;
    } else if (output?.url) {
      imageUrl = output.url();
    }

    return NextResponse.json({
      success: true,
      imageUrl,
      highResUrl: imageUrl,
      id: `gen-${Date.now()}`,
      originalAnchorUrl: targetImage,
      aspectRatio: body.aspectRatio || "1:1",
      positivePrompt: prompt,
      negativePrompt: negative_prompt,
      createdAt: new Date().toISOString(),
      backgroundTitle: body.background?.title || "Executive Office",
      hairstyleTitle: body.hairstyle?.title || "Natural Style",
      outfitTitle: body.outfit?.title || "Corporate Suit",
      seed: Math.floor(Math.random() * 9000000) + 1000000,
      photoReferenceCount: Array.isArray(body.photos) ? body.photos.length : 1
    });
  } catch (error: any) {
    const errorMsg = error?.response?.data?.detail || error?.message || String(error);
    console.error("Replicate execution error:", errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}