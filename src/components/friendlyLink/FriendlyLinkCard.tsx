'use client';

import { useEffect, useState } from 'react';
import bird0 from 'public/bird0.svg';
import FriendlyLinkIcon from '@/components/friendlyLink/FriendlyLinkIcon';

interface FriendlyLinkCardProps {
	title?: string;
	link: string;
	desc?: string;
}

interface MicrolinkResponse {
	status?: string;
	data?: {
		title?: string;
		description?: string;
	};
}

const metadataCache = new Map<string, MicrolinkResponse['data'] | null>();
const DESCRIPTION_LOADING_TEXT = '正在获取站点描述...';
const DESCRIPTION_FALLBACK_TEXT = '（暂无站点描述）';
const METADATA_TIMEOUT_MS = 3000;

function getFallbackTitle(link: string) {
	try {
		const { hostname } = new URL(link);
		return hostname.replace(/^www\./, '');
	} catch {
		return '未命名站点';
	}
}

async function getSiteMetadata(link: string, signal: AbortSignal) {
	if (metadataCache.has(link)) {
		return metadataCache.get(link) ?? null;
	}

	const endpoint = `https://api.microlink.io/?url=${encodeURIComponent(link)}&filter=title,description`;
	const response = await fetch(endpoint, { signal });

	if (!response.ok) {
		throw new Error(`Failed to fetch metadata for ${link}`);
	}

	const payload = (await response.json()) as MicrolinkResponse;
	const data = payload.status === 'success' ? payload.data ?? null : null;
	metadataCache.set(link, data);

	return data;
}

export default function FriendlyLinkCard(props: FriendlyLinkCardProps) {
	const { title, link, desc } = props;
	const fallbackTitle = title?.trim() || getFallbackTitle(link);
	const [resolvedTitle, setResolvedTitle] = useState(fallbackTitle);
	const [resolvedDesc, setResolvedDesc] = useState(desc ?? DESCRIPTION_LOADING_TEXT);

	useEffect(() => {
		const controller = new AbortController();
		const timeoutId = window.setTimeout(() => {
			controller.abort();
			setResolvedDesc((current) => (current === DESCRIPTION_LOADING_TEXT ? DESCRIPTION_FALLBACK_TEXT : current));
		}, METADATA_TIMEOUT_MS);

		setResolvedTitle(fallbackTitle);
		setResolvedDesc(desc ?? DESCRIPTION_LOADING_TEXT);

		getSiteMetadata(link, controller.signal)
			.then((metadata) => {
				window.clearTimeout(timeoutId);

				if (!metadata) {
					setResolvedDesc((current) => (current === DESCRIPTION_LOADING_TEXT ? DESCRIPTION_FALLBACK_TEXT : current));
					return;
				}

				if (metadata.title?.trim()) {
					setResolvedTitle(metadata.title.trim());
				}

				if (metadata.description?.trim()) {
					setResolvedDesc(metadata.description.trim());
				} else {
					setResolvedDesc((current) => (current === DESCRIPTION_LOADING_TEXT ? DESCRIPTION_FALLBACK_TEXT : current));
				}
			})
			.catch((error: unknown) => {
				window.clearTimeout(timeoutId);

				if (controller.signal.aborted && error instanceof DOMException && error.name === 'AbortError') {
					return;
				}

				setResolvedDesc((current) => (current === DESCRIPTION_LOADING_TEXT ? DESCRIPTION_FALLBACK_TEXT : current));
			});

		return () => {
			window.clearTimeout(timeoutId);
			controller.abort();
		};
	}, [desc, fallbackTitle, link]);

	return (
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			className="group/card flex h-full w-full items-center gap-3 rounded-xl p-3 transition-all duration-300 hover:bg-white/60 dark:hover:bg-slate-700/60"
		>
			<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-200/60 shadow-sm transition-transform duration-300 group-hover/card:scale-105 dark:border-slate-600/40">
				<FriendlyLinkIcon className="h-full w-full object-cover" url={link} title={resolvedTitle} fallbackSrc={bird0} />
			</div>
			<div className="flex min-w-0 flex-1 flex-col gap-0.5">
				<strong className="truncate text-sm font-semibold text-slate-700 transition-colors group-hover/card:text-slate-900 dark:text-slate-200 dark:group-hover/card:text-slate-100">
					{resolvedTitle}
				</strong>
				<p className="line-clamp-1 text-xs text-slate-500 dark:text-slate-400">{resolvedDesc}</p>
			</div>
			<svg
				className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-300 group-hover/card:translate-x-0.5 group-hover/card:text-slate-400 dark:text-slate-600 dark:group-hover/card:text-slate-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
			>
				<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
			</svg>
		</a>
	);
}
