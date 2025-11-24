'use client';

import { useState } from 'react';
import { StereogramViewer } from '@/components/training/stereogram-viewer';
import type { ViewType, PatternType } from '@repo/shared-types';

export default function CustomTrainingPage() {
  const [type, setType] = useState<ViewType>('parallel');
  const [difficulty, setDifficulty] = useState(5);
  const [pattern, setPattern] = useState<PatternType>('random-dots');

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">カスタムトレーニング</h1>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">視法タイプ</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as ViewType)}
              className="w-full rounded border p-2"
            >
              <option value="parallel">パラレル視</option>
              <option value="cross">クロス視</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              難易度: {difficulty}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">パターン</label>
            <select
              value={pattern}
              onChange={(e) => setPattern(e.target.value as PatternType)}
              className="w-full rounded border p-2"
            >
              <option value="random-dots">ランダムドット</option>
              <option value="horizontal-lines">水平線</option>
              <option value="vertical-lines">垂直線</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <StereogramViewer
            type={type}
            difficulty={difficulty}
            pattern={pattern}
            width={800}
            height={600}
          />
        </div>
      </div>
    </div>
  );
}
