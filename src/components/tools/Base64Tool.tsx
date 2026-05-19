'use client';

import { useState, useCallback, useRef } from 'react';
import ToolPanel from './ToolPanel';

export default function Base64Tool() {
  const [textInput, setTextInput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const [textError, setTextError] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageInfo, setImageInfo] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const encodeText = useCallback(() => {
    if (!textInput) {
      setTextOutput('');
      setTextError('');
      return;
    }
    try {
      setTextOutput(btoa(unescape(encodeURIComponent(textInput))));
      setTextError('');
    } catch (e: any) {
      setTextError('编码失败: ' + e.message);
      setTextOutput('');
    }
  }, [textInput]);

  const decodeText = useCallback(() => {
    if (!textInput) {
      setTextOutput('');
      setTextError('');
      return;
    }
    try {
      setTextOutput(decodeURIComponent(escape(atob(textInput))));
      setTextError('');
    } catch (e: any) {
      setTextError('解码失败: 无效的 Base64 字符串');
      setTextOutput('');
    }
  }, [textInput]);

  const copyTextOutput = useCallback(() => {
    if (textOutput) navigator.clipboard.writeText(textOutput);
  }, [textOutput]);

  const clearText = useCallback(() => {
    setTextInput('');
    setTextOutput('');
    setTextError('');
  }, []);

  const handleImageSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImageBase64(result);
        setImagePreview(result);
        setImageInfo(
          `文件名: ${file.name} | 大小: ${(file.size / 1024).toFixed(2)} KB | 类型: ${file.type || 'unknown'}`
        );
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const copyImageBase64 = useCallback(() => {
    if (imageBase64) navigator.clipboard.writeText(imageBase64);
  }, [imageBase64]);

  const clearImage = useCallback(() => {
    setImageBase64('');
    setImagePreview('');
    setImageInfo('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  return (
    <ToolPanel
      title="Base64 编解码 / 图片转 Base64"
      description="支持文本 Base64 编解码，以及图片文件转 Base64 Data URL"
    >
      {/* Text Base64 Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-font-normal dark:text-font-light-dark">
          文本编解码
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={encodeText}
            className="rounded-md bg-custom-color-9 px-3 py-1.5 text-xs font-medium text-font-normal transition-colors hover:bg-custom-color-8 dark:bg-custom-color-dark-8 dark:text-font-light-dark dark:hover:bg-custom-color-dark-7"
          >
            编码
          </button>
          <button
            onClick={decodeText}
            className="rounded-md bg-custom-color-9 px-3 py-1.5 text-xs font-medium text-font-normal transition-colors hover:bg-custom-color-8 dark:bg-custom-color-dark-8 dark:text-font-light-dark dark:hover:bg-custom-color-dark-7"
          >
            解码
          </button>
          <button
            onClick={copyTextOutput}
            disabled={!textOutput}
            className="rounded-md bg-custom-color-9 px-3 py-1.5 text-xs font-medium text-font-normal transition-colors hover:bg-custom-color-8 disabled:opacity-40 dark:bg-custom-color-dark-8 dark:text-font-light-dark dark:hover:bg-custom-color-dark-7"
          >
            复制结果
          </button>
          <button
            onClick={clearText}
            className="ml-auto rounded-md bg-custom-color-9 px-3 py-1.5 text-xs font-medium text-font-normal transition-colors hover:bg-custom-color-8 dark:bg-custom-color-dark-8 dark:text-font-light-dark dark:hover:bg-custom-color-dark-7"
          >
            清空
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-font-light dark:text-font-normal-dark">
              输入
            </label>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="在此输入文本..."
              className="min-h-[160px] w-full resize-y rounded-lg border border-slate-200/60 bg-white/60 p-3 font-mono text-sm leading-relaxed text-font-normal outline-none transition-colors placeholder:text-font-light/50 focus:border-slate-300/80 focus:bg-white dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark dark:placeholder:text-font-normal-dark/40 dark:focus:border-slate-500/60 dark:focus:bg-slate-800/80"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-font-light dark:text-font-normal-dark">
              输出
            </label>
            <textarea
              value={textError || textOutput}
              readOnly
              placeholder="结果将显示在这里..."
              className={`min-h-[160px] w-full resize-y rounded-lg border p-3 font-mono text-sm leading-relaxed outline-none transition-colors ${
                textError
                  ? 'border-red-300/60 bg-red-50/50 text-red-600 dark:border-red-500/40 dark:bg-red-900/20 dark:text-red-300'
                  : 'border-slate-200/60 bg-white/60 text-font-normal placeholder:text-font-light/50 focus:border-slate-300/80 focus:bg-white dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark dark:placeholder:text-font-normal-dark/40 dark:focus:border-slate-500/60 dark:focus:bg-slate-800/80'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="my-2 border-t border-slate-200/40 dark:border-slate-600/20" />

      {/* Image to Base64 Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-font-normal dark:text-font-light-dark">
          图片转 Base64
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="rounded-md bg-custom-color-9 px-3 py-1.5 text-xs font-medium text-font-normal transition-colors hover:bg-custom-color-8 dark:bg-custom-color-dark-8 dark:text-font-light-dark dark:hover:bg-custom-color-dark-7"
          >
            选择图片
          </button>
          <button
            onClick={copyImageBase64}
            disabled={!imageBase64}
            className="rounded-md bg-custom-color-9 px-3 py-1.5 text-xs font-medium text-font-normal transition-colors hover:bg-custom-color-8 disabled:opacity-40 dark:bg-custom-color-dark-8 dark:text-font-light-dark dark:hover:bg-custom-color-dark-7"
          >
            复制 Base64
          </button>
          <button
            onClick={clearImage}
            className="ml-auto rounded-md bg-custom-color-9 px-3 py-1.5 text-xs font-medium text-font-normal transition-colors hover:bg-custom-color-8 dark:bg-custom-color-dark-8 dark:text-font-light-dark dark:hover:bg-custom-color-dark-7"
          >
            清空
          </button>
        </div>

        {imageInfo && (
          <p className="text-xs text-font-light dark:text-font-normal-dark">
            {imageInfo}
          </p>
        )}

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-font-light dark:text-font-normal-dark">
              预览
            </label>
            <div className="flex min-h-[160px] items-center justify-center rounded-lg border border-dashed border-slate-300/60 bg-white/40 p-4 dark:border-slate-500/40 dark:bg-slate-800/40">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="max-h-[200px] max-w-full rounded-md object-contain"
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
              Base64 结果
            </label>
            <textarea
              value={imageBase64}
              readOnly
              placeholder="图片的 Base64 Data URL 将显示在这里..."
              className="min-h-[160px] w-full resize-y rounded-lg border border-slate-200/60 bg-white/60 p-3 font-mono text-xs leading-relaxed text-font-normal outline-none transition-colors placeholder:text-font-light/50 focus:border-slate-300/80 focus:bg-white dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark dark:placeholder:text-font-normal-dark/40 dark:focus:border-slate-500/60 dark:focus:bg-slate-800/80"
            />
          </div>
        </div>
      </div>
    </ToolPanel>
  );
}
