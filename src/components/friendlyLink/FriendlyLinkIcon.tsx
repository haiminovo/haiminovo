'use client';

import Image, { StaticImageData } from 'next/image';
import { useEffect, useMemo, useState } from 'react';

interface FriendlyLinkIconProps {
	url: string;
	title: string;
	fallbackSrc: StaticImageData;
	className?: string;
}

function getFaviconCandidates(url: string): string[] {
	try {
		const { origin, hostname } = new URL(url);
		// Upgrade HTTP to HTTPS to avoid mixed-content blocking
		const secureOrigin = origin.replace(/^http:/, 'https:');
		return [
			`${secureOrigin}/favicon.ico`,
			`${secureOrigin}/favicon.svg`,
			`${secureOrigin}/favicon.png`,
			`https://www.google.com/s2/favicons?domain=${hostname}&sz=64`,
		];
	} catch {
		return [];
	}
}

export default function FriendlyLinkIcon(props: FriendlyLinkIconProps) {
	const { url, title, fallbackSrc, className } = props;
	const candidates = useMemo(() => getFaviconCandidates(url), [url]);
	const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

	useEffect(() => {
		setLoadedSrc(null);

		if (candidates.length === 0) return;

		let cancelled = false;
		const images: HTMLImageElement[] = [];

		const tryLoad = (index: number) => {
			if (cancelled || index >= candidates.length) return;

			const image = new window.Image();
			images.push(image);

			image.onload = () => {
				if (!cancelled) setLoadedSrc(candidates[index]);
			};
			image.onerror = () => {
				tryLoad(index + 1);
			};

			image.src = candidates[index];
		};

		tryLoad(0);

		return () => {
			cancelled = true;
			images.forEach((img) => {
				img.onload = null;
				img.onerror = null;
			});
		};
	}, [candidates]);

	if (loadedSrc) {
		return (
			<img
				className={className}
				src={loadedSrc}
				alt={`${title} 站点图标`}
				referrerPolicy="no-referrer"
				loading="lazy"
			/>
		);
	}

	return (
		<Image
			className={className}
			src={fallbackSrc}
			alt={`${title} 站点图标`}
			fill
			sizes="48px"
		/>
	);
}
