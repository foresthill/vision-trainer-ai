'use client';

import { useState, useRef, useEffect } from 'react';
import { StereogramGenerator, DepthMapGenerator } from '@repo/vision-core';
import type { ViewType, PatternType } from '@repo/shared-types';

export default function GeneratePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [type, setType] = useState<ViewType>('parallel');
  const [pattern, setPattern] = useState<PatternType>('random-dots');
  const [separation, setSeparation] = useState(50);
  const [shape, setShape] = useState<'circle' | 'gradient' | 'text'>('circle');
  const [text, setText] = useState('VT');

  const width = 800;
  const height = 600;

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    let depthMap: number[][];
    switch (shape) {
      case 'circle':
        depthMap = DepthMapGenerator.circle(width, height, 150);
        break;
      case 'gradient':
        depthMap = DepthMapGenerator.gradient(width, height, 'horizontal');
        break;
      case 'text':
        depthMap = DepthMapGenerator.text(width, height, text);
        break;
    }

    const imageData = StereogramGenerator.generate(depthMap, {
      width,
      height,
      depth: 255,
      separation,
      pattern,
      viewType: type,
    });

    ctx.putImageData(imageData, 0, 0);
  }, [type, pattern, separation, shape, text]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `stereogram-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">画像生成ツール</h1>

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

          <div>
            <label className="block text-sm font-medium mb-2">
              視差: {separation}px
            </label>
            <input
              type="range"
              min="20"
              max="100"
              value={separation}
              onChange={(e) => setSeparation(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">形状</label>
            <select
              value={shape}
              onChange={(e) => setShape(e.target.value as 'circle' | 'gradient' | 'text')}
              className="w-full rounded border p-2"
            >
              <option value="circle">円</option>
              <option value="gradient">グラデーション</option>
              <option value="text">テキスト</option>
            </select>
          </div>

          {shape === 'text' && (
            <div>
              <label className="block text-sm font-medium mb-2">テキスト</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full rounded border p-2"
                maxLength={10}
              />
            </div>
          )}

          <button
            onClick={handleDownload}
            className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            画像をダウンロード
          </button>
        </div>

        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
