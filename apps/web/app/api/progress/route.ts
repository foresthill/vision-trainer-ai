import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    const progress = await prisma.userProgress.findUnique({
      where: { userId },
    });

    if (!progress) {
      return NextResponse.json({
        parallelLevel: 1,
        crossLevel: 1,
        totalSessions: 0,
        successfulSessions: 0,
        totalDuration: 0,
        streak: 0,
      });
    }

    return NextResponse.json(progress);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}
