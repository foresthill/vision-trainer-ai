import type { PatternType } from '@repo/shared-types';

export function getPatternName(pattern: PatternType): string {
  const names: Record<PatternType, string> = {
    'random-dots': 'ランダムドット',
    'horizontal-lines': '水平線',
    'vertical-lines': '垂直線',
    texture: 'テクスチャ',
    custom: 'カスタム',
  };
  return names[pattern];
}

export function getAvailablePatterns(): PatternType[] {
  return ['random-dots', 'horizontal-lines', 'vertical-lines', 'texture', 'custom'];
}

export function calculateOptimalSeparation(
  difficulty: number,
  baseValue: number = 40
): number {
  return baseValue + difficulty * 5;
}
