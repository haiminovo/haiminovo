'use client';

import { useState, useCallback, useRef } from 'react';
import ToolPanel from './ToolPanel';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas toBlob failed'));
      },
      type,
      quality
    );
  });
}

export default function ImageTool() {
  const [originalSrc, setOriginalSrc] = useState('');
  const [convertedSrc, setConvertedSrc] = useState('');
  const [originalInfo, setOriginalInfo] = useState('');
  const [convertedInfo, setConvertedInfo] = useState('');
  const [quality, setQuality] = useState(80);
  const [targetFormat, setTargetFormat] = useState('image/jpeg');
  const [maxWidth, setMaxWidth] = useState(1920);
  const [maxHeight, setMaxHeight] = useState(1920);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setOriginalSrc(result);
      setConvertedSrc('');
      setConvertedInfo('');
      setOriginalInfo(
        `文件名: ${file.name} | 大小: ${(file.size / 1024).toFixed(2)} KB | 类型: ${file.type}`
      );
    };
    reader.readAsDataURL(file);
  }, []);

  const processImage = useCallback(async () => {
    if (!originalSrc) return;
    setProcessing(true);
    try {
      const img = await loadImage(originalSrc);
      let { width, height } = img;

      // Resize if needed
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      // Fill white background for JPEG
      if (targetFormat === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
      }
      ctx.drawImage(img, 0, 0, width, height);

      const blob = await canvasToBlob(canvas, targetFormat, quality / 100);
      const newUrl = URL.createObjectURL(blob);
      setConvertedSrc(newUrl);
      setConvertedInfo(
        `尺寸: ${width} x ${height} | 大小: ${(blob.size / 1024).toFixed(2)} KB | 格式: ${targetFormat.replace('image/', '').toUpperCase()}`
      );
    } catch (e: any) {
      setConvertedInfo('处理失败: ' + e.message);
    } finally {
      setProcessing(false);
    }
  }, [originalSrc, targetFormat, quality, maxWidth, maxHeight]);

  const downloadImage = useCallback(() => {
    if (!convertedSrc) return;
    const a = document.createElement('a');
    a.href = convertedSrc;
    const ext = targetFormat.replace('image/', '').replace('jpeg', 'jpg');
    a.download = `converted.${ext}`;
    a.click();
  }, [convertedSrc, targetFormat]);

  const clearAll = useCallback(() => {
    setOriginalSrc('');
    setConvertedSrc('');
    setOriginalInfo('');
    setConvertedInfo('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  return (
    <ToolPanel
      title="图片压缩 / 格式转换"
      description="在浏览器本地压缩图片、调整尺寸并转换格式"
    >
      <div className="flex flex-col gap-4">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="rounded-md bg-custom-color-9 px-3 py-1.5 text-xs font-medium text-font-normal transition-colors hover:bg-custom-color-8 dark:bg-custom-color-dark-8 dark:text-font-light-dark dark:hover:bg-custom-color-dark-7"
          >
            选择图片
          </button>

          <select
            value={targetFormat}
            onChange={(e) => setTargetFormat(e.target.value)}
            className="rounded-md border border-slate-200/60 bg-custom-color-9 px-2 py-1.5 text-xs text-font-normal dark:border-slate-600/40 dark:bg-custom-color-dark-8 dark:text-font-light-dark"
          >
            <option value="image/jpeg">JPEG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WebP</option>
          </select>

          <div className="flex items-center gap-2">
            <span className="text-xs text-font-light dark:text-font-normal-dark">质量</span>
            <input
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-24"
            />
            <span className="w-8 text-xs text-font-light dark:text-font-normal-dark">{quality}%</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-font-light dark:text-font-normal-dark">最大宽</span>
            <input
              type="number"
              min={100}
              max={8192}
              value={maxWidth}
              onChange={(e) => setMaxWidth(Number(e.target.value))}
              className="w-16 rounded-md border border-slate-200/60 bg-white/60 px-2 py-1 text-xs font-mono outline-none dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-font-light dark:text-font-normal-dark">最大高</span>
            <input
              type="number"
              min={100}
              max={8192}
              value={maxHeight}
              onChange={(e) => setMaxHeight(Number(e.target.value))}
              className="w-16 rounded-md border border-slate-200/60 bg-white/60 px-2 py-1 text-xs font-mono outline-none dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark"
            />
          </div>

          <button
            onClick={processImage}
            disabled={!originalSrc || processing}
            className="rounded-md bg-custom-color-9 px-3 py-1.5 text-xs font-medium text-font-normal transition-colors hover:bg-custom-color-8 disabled:opacity-40 dark:bg-custom-color-dark-8 dark:text-font-light-dark dark:hover:bg-custom-color-dark-7"
          >
            {processing ? '处理中...' : '开始处理'}
          </button>

          <button
            onClick={downloadImage}
            disabled={!convertedSrc}
            className="rounded-md bg-custom-color-9 px-3 py-1.5 text-xs font-medium text-font-normal transition-colors hover:bg-custom-color-8 disabled:opacity-40 dark:bg-custom-color-dark-8 dark:text-font-light-dark dark:hover:bg-custom-color-dark-7"
          >
            下载
          </button>

          <button
            onClick={clearAll}
            className="ml-auto rounded-md bg-custom-color-9 px-3 py-1.5 text-xs font-medium text-font-normal transition-colors hover:bg-custom-color-8 dark:bg-custom-color-dark-8 dark:text-font-light-dark dark:hover:bg-custom-color-dark-7"
          >
            清空
          </button>
        </div>

        {/* Info */}
        {originalInfo && (
          <p className="text-xs text-font-light dark:text-font-normal-dark">
            原图: {originalInfo}
          </p>
        )}
        {convertedInfo && (
          <p className="text-xs text-font-light dark:text-font-normal-dark">
            处理后: {convertedInfo}
          </p>
        )}

        {/* Preview */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-font-light dark:text-font-normal-dark">
              原图
            </label>
            <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-slate-300/60 bg-white/40 p-4 dark:border-slate-500/40 dark:bg-slate-800/40">
              {originalSrc ? (
                <img
                  src={originalSrc}
                  alt="original"
                  className="max-h-[300px] max-w-full rounded-md object-contain"
                />
              ) : (
                <span className="text-xs text-font-light/60 dark:text-font-normal-dark/50">
                  选择图片后在此预览
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-font-light dark:text-font-normal-dark">
              处理后
            </label>
            <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-slate-300/60 bg-white/40 p-4 dark:border-slate-500/40 dark:bg-slate-800/40">
              {convertedSrc ? (
                <img
                  src={convertedSrc}
                  alt="converted"
                  className="max-h-[300px] max-w-full rounded-md object-contain"
                />
              ) : (
                <span className="text-xs text-font-light/60 dark:text-font-normal-dark/50">
                  处理后的图片将显示在这里
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolPanel>
  );
}
