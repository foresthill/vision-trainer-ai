'use client';

import { useEffect, useState } from 'react';

interface TrainingTimerProps {
  isActive: boolean;
  duration: number;
  onStart: () => void;
  onComplete: () => void;
  onCancel: () => void;
}

export function TrainingTimer({
  isActive,
  duration,
  onStart,
  onComplete,
  onCancel,
}: TrainingTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-bold tabular-nums">
        {formatTime(timeLeft)}
      </div>

      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      {isActive ? (
        <button
          onClick={onCancel}
          className="px-6 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          中止
        </button>
      ) : (
        <button
          onClick={onStart}
          className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          スタート
        </button>
      )}
    </div>
  );
}
