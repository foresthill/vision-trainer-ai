'use client';

import { useState, useCallback } from 'react';
import { SessionManager } from '@repo/vision-core';
import type { TrainingSession, ViewType } from '@repo/shared-types';

export function useTrainingSession() {
  const [session, setSession] = useState<TrainingSession | null>(null);
  const [isActive, setIsActive] = useState(false);

  const start = useCallback(
    (userId: string, type: ViewType, difficulty: number) => {
      const newSession = SessionManager.startSession(userId, type, difficulty);
      setSession(newSession);
      setIsActive(true);
      return newSession;
    },
    []
  );

  const complete = useCallback(
    (success: boolean) => {
      if (!session) return null;

      const completedSession = SessionManager.completeSession(session, success);
      setSession(completedSession);
      setIsActive(false);
      return completedSession;
    },
    [session]
  );

  const reset = useCallback(() => {
    setSession(null);
    setIsActive(false);
  }, []);

  return {
    session,
    isActive,
    start,
    complete,
    reset,
  };
}
