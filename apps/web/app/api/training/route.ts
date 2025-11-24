import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, difficulty, duration, success } = body;

    const session = await prisma.trainingSession.create({
      data: {
        userId,
        type: type.toUpperCase(),
        difficulty,
        duration,
        success,
        startedAt: new Date(Date.now() - duration * 1000),
        completedAt: new Date(),
      },
    });

    // Update user progress
    await prisma.userProgress.upsert({
      where: { userId },
      update: {
        totalSessions: { increment: 1 },
        successfulSessions: success ? { increment: 1 } : undefined,
        totalDuration: { increment: duration },
        lastTrainingAt: new Date(),
        [type === 'parallel' ? 'parallelLevel' : 'crossLevel']: success
          ? { increment: 1 }
          : undefined,
      },
      create: {
        userId,
        totalSessions: 1,
        successfulSessions: success ? 1 : 0,
        totalDuration: duration,
        lastTrainingAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, session });
  } catch (error) {
    console.error('Training API error:', error);
    return NextResponse.json(
      { error: 'Failed to save training session' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    const sessions = await prisma.trainingSession.findMany({
      where: { userId },
      orderBy: { startedAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({ sessions });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}
