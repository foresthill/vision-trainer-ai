'use client';

import { useState, useCallback } from 'react';
import { StereogramGenerator, DepthMapGenerator } from '@repo/vision-core';
import type { StereogramConfig, PatternType, ViewType } from '@repo/shared-types';

export function useStereogram() {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const generate = useCallback(
    (config: {
      width: number;
      height: number;
      type: ViewType;
      pattern: PatternType;
      separation: number;
      shape: 'circle' | 'gradient' | 'text';
      text?: string;
    }) => {
      let depthMap: number[][];

      switch (config.shape) {
        case 'circle':
          depthMap = DepthMapGenerator.circle(config.width, config.height, 150);
          break;
        case 'gradient':
          depthMap = DepthMapGenerator.gradient(config.width, config.height, 'horizontal');
          break;
        case 'text':
          depthMap = DepthMapGenerator.text(config.width, config.height, config.text || 'VT');
          break;
      }

      const result = StereogramGenerator.generate(depthMap, {
        width: config.width,
        height: config.height,
        depth: 255,
        separation: config.separation,
        pattern: config.pattern,
        viewType: config.type,
      });

      setImageData(result);
      return result;
    },
    []
  );

  return { imageData, generate };
}
