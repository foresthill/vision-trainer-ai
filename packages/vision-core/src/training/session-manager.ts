import type { TrainingSession, ViewType } from '@repo/shared-types';

export class SessionManager {
  static startSession(
    userId: string,
    type: ViewType,
    difficulty: number
  ): TrainingSession {
    return {
      id: crypto.randomUUID(),
      userId,
      type,
      difficulty,
      duration: 0,
      success: false,
      startedAt: new Date(),
    };
  }

  static completeSession(
    session: TrainingSession,
    success: boolean
  ): TrainingSession {
    return {
      ...session,
      success,
      duration: Math.floor((Date.now() - session.startedAt.getTime()) / 1000),
      completedAt: new Date(),
    };
  }

  static calculateNextDifficulty(
    currentDifficulty: number,
    success: boolean
  ): number {
    if (success) {
      return Math.min(currentDifficulty + 1, 10);
    } else {
      return Math.max(currentDifficulty - 1, 1);
    }
  }
}
