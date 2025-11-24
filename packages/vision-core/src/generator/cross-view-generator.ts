import { StereogramGenerator, DepthMapGenerator } from './stereogram-generator';
import type { StereogramConfig } from '@repo/shared-types';

export class CrossViewGenerator {
  static generate(
    depthMap: number[][],
    config: Omit<StereogramConfig, 'viewType'>
  ): ImageData {
    return StereogramGenerator.generate(depthMap, {
      ...config,
      viewType: 'cross',
    });
  }

  static generateCircle(
    width: number,
    height: number,
    radius: number,
    separation: number = 50
  ): ImageData {
    const depthMap = DepthMapGenerator.circle(width, height, radius);
    return this.generate(depthMap, {
      width,
      height,
      depth: 255,
      separation,
      pattern: 'random-dots',
    });
  }

  static generateText(
    width: number,
    height: number,
    text: string,
    separation: number = 50
  ): ImageData {
    const depthMap = DepthMapGenerator.text(width, height, text);
    return this.generate(depthMap, {
      width,
      height,
      depth: 255,
      separation,
      pattern: 'random-dots',
    });
  }
}
