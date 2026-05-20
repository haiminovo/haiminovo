'use client';

import { useState, useCallback } from 'react';
import ToolPanel from './ToolPanel';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (!/^[0-9A-Fa-f]{6}$/.test(clean)) return null;
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360; s /= 100; l /= 100;
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function generatePalette(baseHex: string): string[] {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return [];
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const palette: string[] = [];
  for (let i = 0; i < 10; i++) {
    const l = Math.max(5, Math.min(95, 5 + i * 10));
    palette.push(rgbToHex(...Object.values(hslToRgb(hsl.h, hsl.s, l)) as [number, number, number]));
  }
  return palette;
}

function generateGradient(color1: string, color2: string, steps: number): string[] {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  if (!c1 || !c2) return [];
  const gradient: string[] = [];
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);
    const r = Math.round(c1.r + (c2.r - c1.r) * ratio);
    const g = Math.round(c1.g + (c2.g - c1.g) * ratio);
    const b = Math.round(c1.b + (c2.b - c1.b) * ratio);
    gradient.push(rgbToHex(r, g, b));
  }
  return gradient;
}

function getContrastColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#000000';
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#1a2a3a' : '#ffffff';
}

export default function ColorTool() {
  const [hex, setHex] = useState('#3B82F6');
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const [gradientStart, setGradientStart] = useState('#3B82F6');
  const [gradientEnd, setGradientEnd] = useState('#EC4899');
  const [gradientSteps, setGradientSteps] = useState(8);
  const [copied, setCopied] = useState('');

  const updateFromHex = useCallback((newHex: string) => {
    setHex(newHex.toUpperCase());
    const newRgb = hexToRgb(newHex);
    if (newRgb) {
      setRgb(newRgb);
      setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    }
  }, []);

  const updateFromRgb = useCallback((r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
  }, []);

  const updateFromHsl = useCallback((h: number, s: number, l: number) => {
    setHsl({ h, s, l });
    const newRgb = hslToRgb(h, s, l);
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  }, []);

  const copyColor = useCallback((color: string) => {
    navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(''), 1500);
  }, []);

  const palette = generatePalette(hex);
  const gradient = generateGradient(gradientStart, gradientEnd, gradientSteps);

  return (
    <ToolPanel
      title="颜色工具"
      description="取色、调色板生成与渐变色生成"
    >
      <div className="flex flex-col gap-6">
        {/* Color Picker */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-font-normal dark:text-font-light-dark">
            取色 / 调色
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={hex}
                onChange={(e) => updateFromHex(e.target.value)}
                className="h-10 w-10 cursor-pointer rounded-lg border-0 bg-transparent p-0"
              />
              <div
                className="flex h-10 w-24 items-center justify-center rounded-lg text-xs font-bold shadow-sm"
                style={{ backgroundColor: hex, color: getContrastColor(hex) }}
              >
                {hex}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-xs text-font-light dark:text-font-normal-dark">HEX</span>
                <input
                  type="text"
                  value={hex}
                  onChange={(e) => updateFromHex(e.target.value)}
                  className="w-20 rounded-md border border-slate-200/60 bg-white/60 px-2 py-1 text-xs font-mono outline-none focus:border-slate-300/80 dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-font-light dark:text-font-normal-dark">R</span>
                <input
                  type="number"
                  min={0} max={255}
                  value={rgb.r}
                  onChange={(e) => updateFromRgb(Number(e.target.value), rgb.g, rgb.b)}
                  className="w-14 rounded-md border border-slate-200/60 bg-white/60 px-2 py-1 text-xs font-mono outline-none focus:border-slate-300/80 dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-font-light dark:text-font-normal-dark">G</span>
                <input
                  type="number"
                  min={0} max={255}
                  value={rgb.g}
                  onChange={(e) => updateFromRgb(rgb.r, Number(e.target.value), rgb.b)}
                  className="w-14 rounded-md border border-slate-200/60 bg-white/60 px-2 py-1 text-xs font-mono outline-none focus:border-slate-300/80 dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-font-light dark:text-font-normal-dark">B</span>
                <input
                  type="number"
                  min={0} max={255}
                  value={rgb.b}
                  onChange={(e) => updateFromRgb(rgb.r, rgb.g, Number(e.target.value))}
                  className="w-14 rounded-md border border-slate-200/60 bg-white/60 px-2 py-1 text-xs font-mono outline-none focus:border-slate-300/80 dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark"
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-font-light dark:text-font-normal-dark">HSL</span>
                <input
                  type="number"
                  min={0} max={360}
                  value={hsl.h}
                  onChange={(e) => updateFromHsl(Number(e.target.value), hsl.s, hsl.l)}
                  className="w-14 rounded-md border border-slate-200/60 bg-white/60 px-2 py-1 text-xs font-mono outline-none focus:border-slate-300/80 dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark"
                />
                <input
                  type="number"
                  min={0} max={100}
                  value={hsl.s}
                  onChange={(e) => updateFromHsl(hsl.h, Number(e.target.value), hsl.l)}
                  className="w-14 rounded-md border border-slate-200/60 bg-white/60 px-2 py-1 text-xs font-mono outline-none focus:border-slate-300/80 dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark"
                />
                <input
                  type="number"
                  min={0} max={100}
                  value={hsl.l}
                  onChange={(e) => updateFromHsl(hsl.h, hsl.s, Number(e.target.value))}
                  className="w-14 rounded-md border border-slate-200/60 bg-white/60 px-2 py-1 text-xs font-mono outline-none focus:border-slate-300/80 dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Palette */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-font-normal dark:text-font-light-dark">
            调色板
          </h3>
          <div className="flex w-full gap-1">
            {palette.map((color, i) => (
              <button
                key={i}
                onClick={() => copyColor(color)}
                className="group relative flex-1 rounded-md py-6 transition-transform hover:scale-105 hover:z-10"
                style={{ backgroundColor: color }}
                title={color}
              >
                <span
                  className="absolute inset-0 flex items-center justify-center text-[10px] font-bold opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: getContrastColor(color) }}
                >
                  {copied === color ? '已复制' : color}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Gradient Generator */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-font-normal dark:text-font-light-dark">
            渐变生成
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-font-light dark:text-font-normal-dark">起始</span>
              <input
                type="color"
                value={gradientStart}
                onChange={(e) => setGradientStart(e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
              />
              <input
                type="text"
                value={gradientStart.toUpperCase()}
                onChange={(e) => setGradientStart(e.target.value)}
                className="w-20 rounded-md border border-slate-200/60 bg-white/60 px-2 py-1 text-xs font-mono outline-none focus:border-slate-300/80 dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-font-light dark:text-font-normal-dark">结束</span>
              <input
                type="color"
                value={gradientEnd}
                onChange={(e) => setGradientEnd(e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
              />
              <input
                type="text"
                value={gradientEnd.toUpperCase()}
                onChange={(e) => setGradientEnd(e.target.value)}
                className="w-20 rounded-md border border-slate-200/60 bg-white/60 px-2 py-1 text-xs font-mono outline-none focus:border-slate-300/80 dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-font-light dark:text-font-normal-dark">步数</span>
              <input
                type="number"
                min={2}
                max={20}
                value={gradientSteps}
                onChange={(e) => setGradientSteps(Number(e.target.value))}
                className="w-14 rounded-md border border-slate-200/60 bg-white/60 px-2 py-1 text-xs font-mono outline-none focus:border-slate-300/80 dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark"
              />
            </div>
          </div>

          {/* Gradient preview bar */}
          <div
            className="h-10 w-full rounded-lg shadow-sm"
            style={{
              background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`,
            }}
          />

          {/* Gradient steps */}
          <div className="flex w-full gap-1">
            {gradient.map((color, i) => (
              <button
                key={i}
                onClick={() => copyColor(color)}
                className="group relative flex-1 rounded-md py-5 transition-transform hover:scale-105 hover:z-10"
                style={{ backgroundColor: color }}
                title={color}
              >
                <span
                  className="absolute inset-0 flex items-center justify-center text-[10px] font-bold opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: getContrastColor(color) }}
                >
                  {copied === color ? '已复制' : color}
                </span>
              </button>
            ))}
          </div>

          {/* CSS code */}
          <div className="rounded-lg border border-slate-200/60 bg-white/60 p-3 dark:border-slate-600/40 dark:bg-slate-800/60">
            <code className="text-xs font-mono text-font-normal dark:text-font-light-dark">
              background: linear-gradient(to right, {gradientStart}, {gradientEnd});
            </code>
          </div>
        </div>
      </div>
    </ToolPanel>
  );
}
