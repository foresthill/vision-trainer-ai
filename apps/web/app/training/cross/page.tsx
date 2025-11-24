'use client';

import { useState } from 'react';
import { StereogramViewer } from '@/components/training/stereogram-viewer';
import { TrainingTimer } from '@/components/training/training-timer';
import { DifficultySelector } from '@/components/training/difficulty-selector';
import { Instructions } from '@/components/training/instructions';

export default function CrossTrainingPage() {
  const [difficulty, setDifficulty] = useState(1);
  const [isTraining, setIsTraining] = useState(false);

  const handleComplete = (success: boolean) => {
    setIsTraining(false);
    if (success) {
      setDifficulty((d) => Math.min(d + 1, 10));
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">クロス視トレーニング</h1>

      <Instructions type="cross" />

      <div className="mt-6 flex flex-col items-center gap-6">
        <DifficultySelector
          difficulty={difficulty}
          onChange={setDifficulty}
          disabled={isTraining}
        />

        <StereogramViewer
          type="cross"
          difficulty={difficulty}
          width={800}
          height={600}
        />

        <TrainingTimer
          isActive={isTraining}
          duration={30 + difficulty * 15}
          onStart={() => setIsTraining(true)}
          onComplete={() => handleComplete(true)}
          onCancel={() => handleComplete(false)}
        />
      </div>
    </div>
  );
}
