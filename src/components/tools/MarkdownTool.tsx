'use client';

import { useState, useCallback, useDeferredValue, useMemo } from 'react';
import ToolPanel from './ToolPanel';

function simpleMarkdownToHtml(md: string): string {
  let html = md
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, (_, code) => {
      const escaped = code.replace(/^\n/, '');
      return `<pre class="rounded-lg bg-slate-100 p-3 overflow-auto text-sm dark:bg-slate-800"><code>${escaped}</code></pre>`;
    })
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="rounded bg-slate-100 px-1 py-0.5 text-sm dark:bg-slate-800">$1</code>')
    // Headers
    .replace(/^###### (.*$)/gim, '<h6 class="text-sm font-semibold mt-4 mb-2">$1</h6>')
    .replace(/^##### (.*$)/gim, '<h5 class="text-base font-semibold mt-4 mb-2">$1</h5>')
    .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-semibold mt-4 mb-2">$1</h4>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-5 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3 border-b pb-1 border-slate-200/60 dark:border-slate-600/40">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-black mt-6 mb-4">$1</h1>')
    // Bold & Italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/___(.*?)___/g, '<strong><em>$1</em></strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    // Strikethrough
    .replace(/~~(.*?)~~/g, '<del>$1</del>')
    // Blockquote
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-slate-300 pl-4 italic text-font-light dark:border-slate-600 dark:text-font-normal-dark">$1</blockquote>')
    // Horizontal rule
    .replace(/^-{3,}$/gim, '<hr class="my-4 border-slate-200/60 dark:border-slate-600/40" />')
    .replace(/^\*{3,}$/gim, '<hr class="my-4 border-slate-200/60 dark:border-slate-600/40" />')
    // Unordered list
    .replace(/^\s*[-*+] (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
    // Ordered list
    .replace(/^\s*\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline dark:text-blue-400">$1</a>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-2" />')
    // Tables (simple)
    .replace(/\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g, (_, header, rows) => {
      const headers = header.split('|').map((h: string) => h.trim()).filter(Boolean);
      const rowLines = rows.trim().split('\n');
      const ths = headers.map((h: string) => `<th class="border border-slate-200/60 px-2 py-1 text-left dark:border-slate-600/40">${h}</th>`).join('');
      const trs = rowLines.map((line: string) => {
        const cells = line.split('|').map((c: string) => c.trim()).filter(Boolean);
        const tds = cells.map((c: string) => `<td class="border border-slate-200/60 px-2 py-1 dark:border-slate-600/40">${c}</td>`).join('');
        return `<tr>${tds}</tr>`;
      }).join('');
      return `<table class="w-full border-collapse text-sm my-2"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`;
    })
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="my-2 leading-relaxed">')
    .replace(/^(.+)$/gim, '<p class="my-2 leading-relaxed">$1</p>');

  // Fix nested paragraphs in lists/blockquotes
  html = html
    .replace(/<p class="my-2 leading-relaxed">(<li[^>]*>.*?<\/li>)<\/p>/g, '$1')
    .replace(/<p class="my-2 leading-relaxed">(<blockquote[^>]*>.*?<\/blockquote>)<\/p>/g, '$1')
    .replace(/<p class="my-2 leading-relaxed">(<pre[^>]*>.*?<\/pre>)<\/p>/g, '$1')
    .replace(/<p class="my-2 leading-relaxed">(<table[^>]*>.*?<\/table>)<\/p>/g, '$1')
    .replace(/<p class="my-2 leading-relaxed">(<hr[^>]*\/?>)<\/p>/g, '$1')
    .replace(/<p class="my-2 leading-relaxed">(<h[1-6][^>]*>.*?<\/h[1-6]>)<\/p>/g, '$1');

  return `<div class="markdown-preview">${html}</div>`;
}

export default function MarkdownTool() {
  const [input, setInput] = useState(`# Markdown 预览

这是一个 **Markdown** 在线预览工具。

## 特性

- 实时预览
- 支持常见语法
- 实时预览

## 代码示例

\`\`\`javascript
const hello = 'world';
console.log(hello);
\`\`\`

> 这是一个引用块

| 名称 | 描述 |
|------|------|
| A | 选项 A |
| B | 选项 B |
`);
  const deferredInput = useDeferredValue(input);
  const previewHtml = useMemo(() => simpleMarkdownToHtml(deferredInput), [deferredInput]);

  const copyHtml = useCallback(() => {
    const html = simpleMarkdownToHtml(input);
    navigator.clipboard.writeText(html);
  }, [input]);

  const clearAll = useCallback(() => {
    setInput('');
  }, []);

  return (
    <ToolPanel
      title="Markdown 在线预览"
      description="实时渲染 Markdown 为 HTML，支持常见语法"
    >
      <div className="flex flex-col gap-3">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={copyHtml}
            disabled={!input}
            className="rounded-md bg-custom-color-9 px-3 py-1.5 text-xs font-medium text-font-normal transition-colors hover:bg-custom-color-8 disabled:opacity-40 dark:bg-custom-color-dark-8 dark:text-font-light-dark dark:hover:bg-custom-color-dark-7"
          >
            复制 HTML
          </button>
          <button
            onClick={clearAll}
            className="ml-auto rounded-md bg-custom-color-9 px-3 py-1.5 text-xs font-medium text-font-normal transition-colors hover:bg-custom-color-8 dark:bg-custom-color-dark-8 dark:text-font-light-dark dark:hover:bg-custom-color-dark-7"
          >
            清空
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-font-light dark:text-font-normal-dark">
              Markdown 输入
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="在此输入 Markdown..."
              className="min-h-[420px] w-full resize-y rounded-lg border border-slate-200/60 bg-white/60 p-3 font-mono text-sm leading-relaxed text-font-normal outline-none transition-colors placeholder:text-font-light/50 focus:border-slate-300/80 focus:bg-white dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark dark:placeholder:text-font-normal-dark/40 dark:focus:border-slate-500/60 dark:focus:bg-slate-800/80"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-font-light dark:text-font-normal-dark">
              预览
            </label>
            <div
              className="min-h-[420px] w-full overflow-auto rounded-lg border border-slate-200/60 bg-white/80 p-4 text-sm leading-relaxed text-font-normal dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-light-dark"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        </div>
      </div>
    </ToolPanel>
  );
}
