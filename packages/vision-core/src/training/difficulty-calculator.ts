export class DifficultyCalculator {
  static calculateFromHistory(
    successes: number,
    failures: number,
    currentLevel: number
  ): number {
    const successRate = successes / (successes + failures || 1);

    if (successRate >= 0.8) {
      return Math.min(currentLevel + 1, 10);
    } else if (successRate <= 0.3) {
      return Math.max(currentLevel - 1, 1);
    }

    return currentLevel;
  }

  static getSeparationForDifficulty(difficulty: number): number {
    return 40 + difficulty * 5;
  }

  static getRadiusForDifficulty(difficulty: number): number {
    return 150 - difficulty * 10;
  }

  static getDurationForDifficulty(difficulty: number): number {
    return 30 + difficulty * 15;
  }

  static getDifficultyLabel(difficulty: number): string {
    if (difficulty <= 3) return '初級';
    if (difficulty <= 6) return '中級';
    if (difficulty <= 8) return '上級';
    return 'エキスパート';
  }
}
