import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, pattern, separation, width, height } = body;

    // In a real implementation, this would generate the image server-side
    // For now, we return the config for client-side generation
    return NextResponse.json({
      success: true,
      config: {
        type,
        pattern,
        separation,
        width,
        height,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
