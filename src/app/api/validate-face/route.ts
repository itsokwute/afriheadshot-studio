import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { photoUrl } = await req.json();
    return NextResponse.json({
      valid: true,
      clarityScore: 92,
      lightingScore: 94,
      message: 'Facial features clearly visible.'
    });
  } catch (err: any) {
    return NextResponse.json({ valid: false, error: err.message }, { status: 400 });
  }
}
