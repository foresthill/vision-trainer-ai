'use client';

import { useEffect, useRef } from 'react';
import { StereogramGenerator, DepthMapGenerator } from '@repo/vision-core';
import type { ViewType, PatternType } from '@repo/shared-types';

export interface StereogramViewerProps {
  type: ViewType;
  difficulty: number;
  width?: number;
  height?: number;
  pattern?: PatternType;
  className?: string;
}

export function StereogramViewer({
  type,
  difficulty,
  width = 800,
  height = 600,
  pattern = 'random-dots',
  className,
}: StereogramViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const depthMap = DepthMapGenerator.circle(width, height, 100 + difficulty * 20);

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
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
    />
  );
}
