'use client';

import { useState, useCallback } from 'react';
import ToolPanel from './ToolPanel';
import { toolButtonClass, toolPrimaryButtonClass, toolQuietButtonClass } from './buttonStyles';

export default function JsonTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);

  const formatJson = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError('');
    } catch (e: any) {
      setError(e.message || '无效的 JSON');
      setOutput('');
    }
  }, [input, indent]);

  const compressJson = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e: any) {
      setError(e.message || '无效的 JSON');
      setOutput('');
    }
  }, [input]);

  const validateJson = useCallback(() => {
    if (!input.trim()) {
      setError('');
      setOutput('');
      return;
    }
    try {
      JSON.parse(input);
      setError('');
      setOutput('✅ JSON 格式正确');
    } catch (e: any) {
      setError(e.message || '无效的 JSON');
      setOutput('');
    }
  }, [input]);

  const escapeJson = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(JSON.stringify(parsed)));
      setError('');
    } catch (e: any) {
      setError(e.message || '无效的 JSON');
      setOutput('');
    }
  }, [input]);

  const unescapeJson = useCallback(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }
    try {
      let str = input.trim();
      // Remove surrounding quotes if present
      if (str.startsWith('"') && str.endsWith('"')) {
        str = str.slice(1, -1);
      }
      const parsed = JSON.parse(str);
      setOutput(JSON.stringify(parsed, null, indent));
      setError('');
    } catch (e: any) {
      setError(e.message || '无效的 JSON 字符串');
      setOutput('');
    }
  }, [input, indent]);

  const copyOutput = useCallback(() => {
    if (output) navigator.clipboard.writeText(output);
  }, [output]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError('');
  }, []);

  return (
    <ToolPanel
      title="JSON 格式化 / 校验"
      description="支持格式化、压缩、校验、转义与去转义"
    >
      <div className="flex flex-col gap-3">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={formatJson}
            className={toolButtonClass}
          >
            格式化
          </button>
          <button
            onClick={compressJson}
            className={toolButtonClass}
          >
            压缩
          </button>
          <button
            onClick={validateJson}
            className={toolButtonClass}
          >
            校验
          </button>
          <button
            onClick={escapeJson}
            className={toolButtonClass}
          >
            转义
          </button>
          <button
            onClick={unescapeJson}
            className={toolButtonClass}
          >
            去转义
          </button>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="rounded-md border border-slate-200/60 bg-custom-color-9 px-2 py-1.5 text-xs text-font-normal dark:border-slate-600/40 dark:bg-custom-color-dark-8 dark:text-font-light-dark"
          >
            <option value={2}>2 空格</option>
            <option value={4}>4 空格</option>
            <option value={8}>8 空格</option>
            <option value={0}>Tab</option>
          </select>
          <div className="ml-auto flex gap-2">
            <button
              onClick={copyOutput}
              disabled={!output}
              className={toolPrimaryButtonClass}
            >
              复制结果
            </button>
            <button
              onClick={clearAll}
              className={toolQuietButtonClass}
            >
              清空
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-font-light dark:text-font-normal-dark">
              输入
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="在此粘贴 JSON..."
              className="min-h-[320px] w-full resize-y rounded-lg border border-slate-200/60 bg-white/60 p-3 font-mono text-sm leading-relaxed text-font-normal outline-none transition-colors placeholder:text-font-light/50 focus:border-slate-300/80 focus:bg-white dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark dark:placeholder:text-font-normal-dark/40 dark:focus:border-slate-500/60 dark:focus:bg-slate-800/80"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-font-light dark:text-font-normal-dark">
              输出
            </label>
            <textarea
              value={error || output}
              readOnly
              placeholder="结果将显示在这里..."
              className={`min-h-[320px] w-full resize-y rounded-lg border p-3 font-mono text-sm leading-relaxed outline-none transition-colors ${
                error
                  ? 'border-red-300/60 bg-red-50/50 text-red-600 dark:border-red-500/40 dark:bg-red-900/20 dark:text-red-300'
                  : 'border-slate-200/60 bg-white/60 text-font-normal placeholder:text-font-light/50 focus:border-slate-300/80 focus:bg-white dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark dark:placeholder:text-font-normal-dark/40 dark:focus:border-slate-500/60 dark:focus:bg-slate-800/80'
              }`}
            />
          </div>
        </div>
      </div>
    </ToolPanel>
  );
}
