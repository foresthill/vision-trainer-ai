import type { ViewType } from './stereogram';

export interface TrainingSession {
  id: string;
  userId: string;
  type: ViewType;
  difficulty: number;
  duration: number;
  success: boolean;
  startedAt: Date;
  completedAt?: Date;
}

export interface UserProgress {
  id: string;
  userId: string;
  parallelLevel: number;
  crossLevel: number;
  totalSessions: number;
  successfulSessions: number;
  totalDuration: number;
  streak: number;
  lastTrainingAt?: Date;
}

export interface TrainingStats {
  totalSessions: number;
  successRate: number;
  averageDuration: number;
  currentStreak: number;
  longestStreak: number;
}

export interface DailyProgress {
  date: string;
  sessions: number;
  duration: number;
  success: boolean;
}
