import type { TrainingSession, TrainingStats, DailyProgress } from '@repo/shared-types';

export class ProgressTracker {
  static calculateStats(sessions: TrainingSession[]): TrainingStats {
    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        successRate: 0,
        averageDuration: 0,
        currentStreak: 0,
        longestStreak: 0,
      };
    }

    const successful = sessions.filter((s) => s.success).length;
    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);

    return {
      totalSessions: sessions.length,
      successRate: (successful / sessions.length) * 100,
      averageDuration: totalDuration / sessions.length,
      currentStreak: this.calculateCurrentStreak(sessions),
      longestStreak: this.calculateLongestStreak(sessions),
    };
  }

  static calculateCurrentStreak(sessions: TrainingSession[]): number {
    if (sessions.length === 0) return 0;

    const sortedSessions = [...sessions].sort(
      (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
    );

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const session of sortedSessions) {
      const sessionDate = new Date(session.startedAt);
      sessionDate.setHours(0, 0, 0, 0);

      const diffDays = Math.floor(
        (currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === streak) {
        streak++;
        currentDate = sessionDate;
      } else if (diffDays > streak) {
        break;
      }
    }

    return streak;
  }

  static calculateLongestStreak(sessions: TrainingSession[]): number {
    if (sessions.length === 0) return 0;

    const dates = new Set(
      sessions.map((s) => {
        const d = new Date(s.startedAt);
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      })
    );

    const sortedDates = Array.from(dates).sort();
    let longest = 1;
    let current = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const prev = new Date(sortedDates[i - 1]);
      const curr = new Date(sortedDates[i]);
      const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        current++;
        longest = Math.max(longest, current);
      } else {
        current = 1;
      }
    }

    return longest;
  }

  static getDailyProgress(sessions: TrainingSession[]): DailyProgress[] {
    const dailyMap = new Map<string, DailyProgress>();

    for (const session of sessions) {
      const date = new Date(session.startedAt).toISOString().split('T')[0];

      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          date,
          sessions: 0,
          duration: 0,
          success: false,
        });
      }

      const daily = dailyMap.get(date)!;
      daily.sessions++;
      daily.duration += session.duration;
      if (session.success) daily.success = true;
    }

    return Array.from(dailyMap.values()).sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  }
}
