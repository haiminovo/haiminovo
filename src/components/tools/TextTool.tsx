'use client';

import { useState, useCallback } from 'react';
import ToolPanel from './ToolPanel';
import { toolButtonClass, toolPrimaryButtonClass, toolQuietButtonClass } from './buttonStyles';

const WRAPPER_PAIRS: Record<string, string> = {
  '[': ']',
  '(': ')',
  '{': '}',
  '【': '】',
  '（': '）',
  '｛': '｝',
};

function stripOuterWrapper(value: string) {
  let text = value.trim();
  let changed = true;

  while (changed && text.length >= 2) {
    changed = false;
    const start = text[0];
    const end = WRAPPER_PAIRS[start];

    if (end && text.endsWith(end)) {
      text = text.slice(1, -1).trim();
      changed = true;
    }
  }

  return text;
}

function stripToken(value: string) {
  const text = stripOuterWrapper(value.trim());
  const quote = text[0];

  if (
    text.length >= 2 &&
    (quote === '"' || quote === "'" || quote === '`') &&
    text.endsWith(quote)
  ) {
    return text.slice(1, -1).trim();
  }

  return text;
}

function isQuotedString(value: string) {
  const text = value.trim();
  const quote = text[0];

  return (
    text.length >= 2 &&
    (quote === '"' || quote === "'" || quote === '`') &&
    text.endsWith(quote)
  );
}

function parseTextItems(value: string) {
  const input = value.trim();
  if (!input) return [];

  try {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => String(item).trim())
        .filter(Boolean);
    }
    if (typeof parsed === 'string') {
      return [String(parsed).trim()].filter(Boolean);
    }
  } catch {
    // Non-JSON text falls through to the wider tokenizer below.
  }

  const source = stripOuterWrapper(input);
  const items: string[] = [];
  let current = '';
  let quote: string | null = null;
  let escaping = false;

  const pushCurrent = () => {
    const item = stripToken(current);
    if (item) items.push(item);
    current = '';
  };

  for (const char of source) {
    if (escaping) {
      current += char;
      escaping = false;
      continue;
    }

    if (char === '\\' && quote) {
      escaping = true;
      continue;
    }

    if (quote) {
      if (char === quote) quote = null;
      current += char;
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      current += char;
      continue;
    }

    if (/[\s,，;；、]+/.test(char)) {
      pushCurrent();
      continue;
    }

    current += char;
  }

  pushCurrent();

  if (
    items.length === 1 &&
    !isQuotedString(input) &&
    !/[\s,，;；、]+/.test(source)
  ) {
    return Array.from(items[0]);
  }

  return items;
}

function getTextItemsOutputSeparator(value: string) {
  if (/\r\n|\r|\n/.test(value)) return '\n';

  const source = stripOuterWrapper(value.trim());
  if (!/[\s,，;；、]+/.test(source)) return '';
  if (/[，,;；、]/.test(source)) return ', ';

  return ' ';
}

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
    const lines = parseTextItems(input);
    const separator = getTextItemsOutputSeparator(input);
    const seen = new Set<string>();
    const reported = new Set<string>();
    const dupes: string[] = [];
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && seen.has(trimmed) && !reported.has(trimmed)) {
        reported.add(trimmed);
        dupes.push(trimmed);
      }
      seen.add(trimmed);
    });
    setResult(dupes.length ? dupes.join(separator) : '未发现重复行');
  }, [input, setResult]);
  const uniqueLines = useCallback(() => {
    const lines = parseTextItems(input);
    const separator = getTextItemsOutputSeparator(input);
    const seen = new Set<string>();
    const result: string[] = [];
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !seen.has(trimmed)) {
        seen.add(trimmed);
        result.push(line);
      }
    });
    setResult(result.join(separator));
  }, [input, setResult]);
  const sortLines = useCallback(() => {
    const lines = parseTextItems(input);
    const separator = getTextItemsOutputSeparator(input);
    setResult(lines.sort((a, b) => a.localeCompare(b, 'zh-CN')).join(separator));
  }, [input, setResult]);

  const copyOutput = useCallback(() => {
    if (output) navigator.clipboard.writeText(output);
  }, [output]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
  }, []);

  return (
    <ToolPanel
      title="文本处理工具"
      description="大小写转换、格式化、编码解码、行处理等多种文本操作"
    >
      <div className="flex flex-col gap-3">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-font-light dark:text-font-normal-dark">大小写:</span>
          <button onClick={toUpperCase} className={toolButtonClass}>大写</button>
          <button onClick={toLowerCase} className={toolButtonClass}>小写</button>
          <button onClick={toCamelCase} className={toolButtonClass}>camelCase</button>
          <button onClick={toPascalCase} className={toolButtonClass}>PascalCase</button>
          <button onClick={toSnakeCase} className={toolButtonClass}>snake_case</button>
          <button onClick={toKebabCase} className={toolButtonClass}>kebab-case</button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-font-light dark:text-font-normal-dark">格式化:</span>
          <button onClick={removeExtraSpaces} className={toolButtonClass}>去多余空格</button>
          <button onClick={removeLineBreaks} className={toolButtonClass}>去换行</button>
          <button onClick={removeAllSpaces} className={toolButtonClass}>去全部空格</button>
          <button onClick={reverseText} className={toolButtonClass}>反转</button>
          <button onClick={countChars} className={toolButtonClass}>统计</button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-font-light dark:text-font-normal-dark">编码:</span>
          <button onClick={escapeHtml} className={toolButtonClass}>HTML 转义</button>
          <button onClick={unescapeHtml} className={toolButtonClass}>HTML 去转义</button>
          <button onClick={urlEncode} className={toolButtonClass}>URL 编码</button>
          <button onClick={urlDecode} className={toolButtonClass}>URL 解码</button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-font-light dark:text-font-normal-dark">处理:</span>
          <button onClick={sortLines} className={toolButtonClass}>排序</button>
          <button onClick={uniqueLines} className={toolButtonClass}>去重</button>
          <button onClick={duplicateLines} className={toolButtonClass}>找重复</button>
          <span className="text-xs text-font-light/70 dark:text-font-normal-dark/70">
            支持换行、空格、逗号、数组和外层括号，输出跟随输入方向
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button onClick={copyOutput} disabled={!output} className={toolPrimaryButtonClass}>
            复制结果
          </button>
          <button onClick={clearAll} className={toolQuietButtonClass}>
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
