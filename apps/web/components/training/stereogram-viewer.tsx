'use client';

import { useEffect, useRef } from 'react';
import { StereogramGenerator, DepthMapGenerator } from '@repo/vision-core';
import type { ViewType, PatternType } from '@repo/shared-types';

interface StereogramViewerProps {
  type: ViewType;
  difficulty: number;
  width?: number;
  height?: number;
  pattern?: PatternType;
}

export function StereogramViewer({
  type,
  difficulty,
  width = 800,
  height = 600,
  pattern = 'random-dots',
}: StereogramViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const depthMap = DepthMapGenerator.circle(
      width,
      height,
      100 + difficulty * 20
    );

    const imageData = StereogramGenerator.generate(depthMap, {
      width,
      height,
      depth: 255,
      separation: 40 + difficulty * 5,
      pattern,
      viewType: type,
    });

    ctx.putImageData(imageData, 0, 0);
  }, [type, difficulty, width, height, pattern]);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border rounded-lg"
      />

      <div className="text-sm text-gray-500 text-center max-w-md">
        {type === 'parallel' ? (
          <p>
            画像の中心より少し遠くを見るようにして、2つの点を3つに見えるように調整してください。
          </p>
        ) : (
          <p>
            画像の中心より少し手前（寄り目）にして、2つの点を3つに見えるように調整してください。
          </p>
        )}
      </div>
    </div>
  );
}
