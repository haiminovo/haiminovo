'use client';

import { useState, useCallback } from 'react';
import ToolPanel from './ToolPanel';

export default function TextTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const setResult = useCallback((text: string) => {
    setOutput(text);
  }, []);

  const toUpperCase = useCallback(() => setResult(input.toUpperCase()), [input, setResult]);
  const toLowerCase = useCallback(() => setResult(input.toLowerCase()), [input, setResult]);
  const toCamelCase = useCallback(() => {
    const result = input
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^(.)/, (c) => c.toLowerCase());
    setResult(result);
  }, [input, setResult]);
  const toPascalCase = useCallback(() => {
    const result = input
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^(.)/, (c) => c.toUpperCase());
    setResult(result);
  }, [input, setResult]);
  const toSnakeCase = useCallback(() => {
    const result = input
      .replace(/([A-Z])/g, '_$1')
      .replace(/[-\s]+/g, '_')
      .replace(/^_/, '')
      .toLowerCase();
    setResult(result);
  }, [input, setResult]);
  const toKebabCase = useCallback(() => {
    const result = input
      .replace(/([A-Z])/g, '-$1')
      .replace(/[_\s]+/g, '-')
      .replace(/^-/, '')
      .toLowerCase();
    setResult(result);
  }, [input, setResult]);
  const removeExtraSpaces = useCallback(() => {
    setResult(input.replace(/\s+/g, ' ').trim());
  }, [input, setResult]);
  const removeLineBreaks = useCallback(() => {
    setResult(input.replace(/[\r\n]+/g, ' '));
  }, [input, setResult]);
  const removeAllSpaces = useCallback(() => {
    setResult(input.replace(/\s+/g, ''));
  }, [input, setResult]);
  const reverseText = useCallback(() => {
    setResult(input.split('').reverse().join(''));
  }, [input, setResult]);
  const countChars = useCallback(() => {
    const chars = input.length;
    const lines = input.split(/\r\n|\r|\n/).length;
    const words = input.trim() ? input.trim().split(/\s+/).length : 0;
    const bytes = new Blob([input]).size;
    setResult(`字符数: ${chars}\n行数: ${lines}\n单词数: ${words}\n字节数: ${bytes}`);
  }, [input, setResult]);
  const escapeHtml = useCallback(() => {
    const result = input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
    setResult(result);
  }, [input, setResult]);
  const unescapeHtml = useCallback(() => {
    const result = input
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&amp;/g, '&');
    setResult(result);
  }, [input, setResult]);
  const urlEncode = useCallback(() => {
    try { setResult(encodeURIComponent(input)); } catch { setResult('编码失败'); }
  }, [input, setResult]);
  const urlDecode = useCallback(() => {
    try { setResult(decodeURIComponent(input)); } catch { setResult('解码失败'); }
  }, [input, setResult]);
  const duplicateLines = useCallback(() => {
    const lines = input.split(/\r\n|\r|\n/);
    const seen = new Set<string>();
    const dupes: string[] = [];
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && seen.has(trimmed)) dupes.push(trimmed);
      seen.add(trimmed);
    });
    setResult(dupes.length ? dupes.join('\n') : '未发现重复行');
  }, [input, setResult]);
  const uniqueLines = useCallback(() => {
    const lines = input.split(/\r\n|\r|\n/);
    const seen = new Set<string>();
    const result: string[] = [];
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !seen.has(trimmed)) {
        seen.add(trimmed);
        result.push(line);
      }
    });
    setResult(result.join('\n'));
  }, [input, setResult]);
  const sortLines = useCallback(() => {
    const lines = input.split(/\r\n|\r|\n/);
    setResult(lines.sort((a, b) => a.localeCompare(b, 'zh-CN')).join('\n'));
  }, [input, setResult]);

  const copyOutput = useCallback(() => {
    if (output) navigator.clipboard.writeText(output);
  }, [output]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
  }, []);

  const btnClass =
    'rounded-md bg-custom-color-9 px-3 py-1.5 text-xs font-medium text-font-normal transition-colors hover:bg-custom-color-8 dark:bg-custom-color-dark-8 dark:text-font-light-dark dark:hover:bg-custom-color-dark-7';

  return (
    <ToolPanel
      title="文本处理工具"
      description="大小写转换、格式化、编码解码、行处理等多种文本操作"
    >
      <div className="flex flex-col gap-3">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-font-light dark:text-font-normal-dark">大小写:</span>
          <button onClick={toUpperCase} className={btnClass}>大写</button>
          <button onClick={toLowerCase} className={btnClass}>小写</button>
          <button onClick={toCamelCase} className={btnClass}>camelCase</button>
          <button onClick={toPascalCase} className={btnClass}>PascalCase</button>
          <button onClick={toSnakeCase} className={btnClass}>snake_case</button>
          <button onClick={toKebabCase} className={btnClass}>kebab-case</button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-font-light dark:text-font-normal-dark">格式化:</span>
          <button onClick={removeExtraSpaces} className={btnClass}>去多余空格</button>
          <button onClick={removeLineBreaks} className={btnClass}>去换行</button>
          <button onClick={removeAllSpaces} className={btnClass}>去全部空格</button>
          <button onClick={reverseText} className={btnClass}>反转</button>
          <button onClick={countChars} className={btnClass}>统计</button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-font-light dark:text-font-normal-dark">编码:</span>
          <button onClick={escapeHtml} className={btnClass}>HTML 转义</button>
          <button onClick={unescapeHtml} className={btnClass}>HTML 去转义</button>
          <button onClick={urlEncode} className={btnClass}>URL 编码</button>
          <button onClick={urlDecode} className={btnClass}>URL 解码</button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-font-light dark:text-font-normal-dark">行处理:</span>
          <button onClick={sortLines} className={btnClass}>排序</button>
          <button onClick={uniqueLines} className={btnClass}>去重</button>
          <button onClick={duplicateLines} className={btnClass}>找重复</button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button onClick={copyOutput} disabled={!output} className={`${btnClass} disabled:opacity-40`}>
            复制结果
          </button>
          <button onClick={clearAll} className={btnClass}>
            清空
          </button>
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
              placeholder="在此输入文本..."
              className="min-h-[320px] w-full resize-y rounded-lg border border-slate-200/60 bg-white/60 p-3 font-mono text-sm leading-relaxed text-font-normal outline-none transition-colors placeholder:text-font-light/50 focus:border-slate-300/80 focus:bg-white dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark dark:placeholder:text-font-normal-dark/40 dark:focus:border-slate-500/60 dark:focus:bg-slate-800/80"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-font-light dark:text-font-normal-dark">
              输出
            </label>
            <textarea
              value={output}
              readOnly
              placeholder="结果将显示在这里..."
              className="min-h-[320px] w-full resize-y rounded-lg border border-slate-200/60 bg-white/60 p-3 font-mono text-sm leading-relaxed text-font-normal outline-none transition-colors placeholder:text-font-light/50 focus:border-slate-300/80 focus:bg-white dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark dark:placeholder:text-font-normal-dark/40 dark:focus:border-slate-500/60 dark:focus:bg-slate-800/80"
            />
          </div>
        </div>
      </div>
    </ToolPanel>
  );
}
