import { NextRequest, NextResponse } from 'next/server';
import { runHeadshotGeneration } from '../../../lib/replicate-client';
import { GenerationConfig } from '../../../lib/types';

export const maxDuration = 60; // 60 seconds serverless execution timeout for Vercel

export async function POST(req: NextRequest) {
  try {
    const config: GenerationConfig = await req.json();

    if (!config || !config.photos || config.photos.length === 0) {
      return NextResponse.json(
        { error: 'At least 1 photo reference is required.' },
        { status: 400 }
      );
    }

    const result = await runHeadshotGeneration(config);

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error('API /api/generate error:', err);
    return NextResponse.json(
      { error: err.message || 'Headshot generation failed.' },
      { status: 500 }
    );
  }
}
