import type { StereogramConfig, PatternType } from '@repo/shared-types';

export class StereogramGenerator {
  static generate(
    depthMap: number[][],
    config: StereogramConfig
  ): ImageData {
    const { width, height, separation, pattern, viewType } = config;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    const imageData = ctx.createImageData(width, height);

    const basePattern = this.generatePattern(pattern, width, height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const depth = depthMap[y]?.[x] || 0;

        const shift =
          viewType === 'parallel'
            ? Math.floor((depth / 255) * separation)
            : -Math.floor((depth / 255) * separation);

        let sourceX = x - shift;

        if (sourceX < 0 || sourceX >= width) {
          sourceX = x;
        }

        const sourceIdx = (y * width + sourceX) * 4;
        const targetIdx = (y * width + x) * 4;

        imageData.data[targetIdx] = basePattern[sourceIdx];
        imageData.data[targetIdx + 1] = basePattern[sourceIdx + 1];
        imageData.data[targetIdx + 2] = basePattern[sourceIdx + 2];
        imageData.data[targetIdx + 3] = 255;
      }
    }

    return imageData;
  }

  private static generatePattern(
    pattern: PatternType,
    width: number,
    height: number
  ): Uint8ClampedArray {
    const data = new Uint8ClampedArray(width * height * 4);

    switch (pattern) {
      case 'random-dots':
        return this.generateRandomDots(data, width, height);
      case 'horizontal-lines':
        return this.generateHorizontalLines(data, width, height);
      case 'vertical-lines':
        return this.generateVerticalLines(data, width, height);
      default:
        return this.generateRandomDots(data, width, height);
    }
  }

  private static generateRandomDots(
    data: Uint8ClampedArray,
    _width: number,
    _height: number
  ): Uint8ClampedArray {
    for (let i = 0; i < data.length; i += 4) {
      const gray = Math.random() > 0.5 ? 255 : 0;
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
      data[i + 3] = 255;
    }
    return data;
  }

  private static generateHorizontalLines(
    data: Uint8ClampedArray,
    width: number,
    height: number
  ): Uint8ClampedArray {
    for (let y = 0; y < height; y++) {
      const gray = y % 2 === 0 ? 255 : 0;
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        data[idx] = gray;
        data[idx + 1] = gray;
        data[idx + 2] = gray;
        data[idx + 3] = 255;
      }
    }
    return data;
  }

  private static generateVerticalLines(
    data: Uint8ClampedArray,
    width: number,
    height: number
  ): Uint8ClampedArray {
    for (let x = 0; x < width; x++) {
      const gray = x % 2 === 0 ? 255 : 0;
      for (let y = 0; y < height; y++) {
        const idx = (y * width + x) * 4;
        data[idx] = gray;
        data[idx + 1] = gray;
        data[idx + 2] = gray;
        data[idx + 3] = 255;
      }
    }
    return data;
  }
}

export class DepthMapGenerator {
  static circle(width: number, height: number, radius: number): number[][] {
    const depthMap: number[][] = [];
    const centerX = width / 2;
    const centerY = height / 2;

    for (let y = 0; y < height; y++) {
      depthMap[y] = [];
      for (let x = 0; x < width; x++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= radius) {
          depthMap[y][x] = 255;
        } else {
          depthMap[y][x] = 0;
        }
      }
    }

    return depthMap;
  }

  static gradient(
    width: number,
    height: number,
    direction: 'horizontal' | 'vertical'
  ): number[][] {
    const depthMap: number[][] = [];

    for (let y = 0; y < height; y++) {
      depthMap[y] = [];
      for (let x = 0; x < width; x++) {
        if (direction === 'horizontal') {
          depthMap[y][x] = Math.floor((x / width) * 255);
        } else {
          depthMap[y][x] = Math.floor((y / height) * 255);
        }
      }
    }

    return depthMap;
  }

  static text(width: number, height: number, text: string): number[][] {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'white';
    ctx.font = `${height / 2}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    const imageData = ctx.getImageData(0, 0, width, height);
    const depthMap: number[][] = [];

    for (let y = 0; y < height; y++) {
      depthMap[y] = [];
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        depthMap[y][x] = imageData.data[idx];
      }
    }

    return depthMap;
  }
}
