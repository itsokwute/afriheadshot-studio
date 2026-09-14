import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const token = process.env.REPLICATE_API_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN is not set in environment variables." },
        { status: 500 }
      );
    }

    const body = await req.json();
    console.log("Incoming generate request keys:", Object.keys(body));

    // Handle any variation of image key sent by the wizard or API client
    const rawImage =
      body.image ||
      body.main_face_image ||
      body.photo ||
      body.userImage ||
      (Array.isArray(body.images) ? (typeof body.images[0] === "string" ? body.images[0] : body.images[0]?.url) : null) ||
      (Array.isArray(body.photos)
        ? typeof body.photos[0] === "string"
          ? body.photos[0]
          : (body.photos.find((p: any) => p.id === body.anchorPhotoId)?.url || body.photos[0]?.url)
        : null);

    if (!rawImage) {
      return NextResponse.json(
        { error: `No face image detected. Received keys: [${Object.keys(body).join(", ")}]` },
        { status: 400 }
      );
    }

    const hairstyle =
      typeof body.hairstyle === "string"
        ? body.hairstyle
        : body.hairstylePrompt || body.hairstyle?.promptSnippet || body.hairstyle?.title || body.hair || "natural groomed afro hair";

    const outfit =
      typeof body.outfit === "string"
        ? body.outfit
        : body.outfitPrompt || body.outfit?.promptSnippet || body.outfit?.title || body.attire || "bespoke executive suit";

    const background =
      typeof body.background === "string"
        ? body.background
        : body.backgroundPrompt || body.background?.promptSnippet || body.background?.title || "modern corporate glass office with subtle bokeh";

    const customPrompt = body.customPrompt || body.prompt || "";

    const replicate = new Replicate({ auth: token });

    const prompt = `Award-winning corporate executive portrait of an African professional, ${hairstyle}, wearing ${outfit}, ${background}, ${customPrompt}, shot on Hasselblad 85mm lens, f/1.8, soft diffused studio rim lighting, realistic melanin skin texture, sharp detailed eyes, 8k resolution, photorealistic LinkedIn profile photo`;

    const negative_prompt =
      "cartoon, 3d render, vector, illustration, drawing, painting, bad eyes, distorted face, plastic skin, airbrushed, stock watermark";

    const output: any = await replicate.run(
      "bytedance/flux-pulid:8baa7ef2255075b46f4d91cd238c21d31181b3e6a864463f967960bb0112525b",
      {
        input: {
          main_face_image: rawImage,
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
      originalAnchorUrl: rawImage,
      aspectRatio: body.aspectRatio || "1:1",
      positivePrompt: prompt,
      negativePrompt: negative_prompt,
      createdAt: new Date().toISOString(),
      backgroundTitle: typeof body.background === "object" ? body.background?.title : "Executive Office",
      hairstyleTitle: typeof body.hairstyle === "object" ? body.hairstyle?.title : "Natural Style",
      outfitTitle: typeof body.outfit === "object" ? body.outfit?.title : "Corporate Suit",
      seed: Math.floor(Math.random() * 9000000) + 1000000,
      photoReferenceCount: Array.isArray(body.photos) ? body.photos.length : 1
    });
  } catch (error: any) {
    const errorMsg = error?.response?.data?.detail || error?.message || String(error);
    console.error("Replicate failed details:", errorMsg);
    return NextResponse.json({ error: `AI Engine Error: ${errorMsg}` }, { status: 500 });
  }
}