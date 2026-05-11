'use client';

import Image, { StaticImageData } from 'next/image';
import { useEffect, useMemo, useState } from 'react';

interface FriendlyLinkIconProps {
	url: string;
	title: string;
	fallbackSrc: StaticImageData;
	className?: string;
}

function getFaviconUrl(url: string) {
	try {
		const { origin, hostname } = new URL(url);
		return [
			`${origin}/favicon.ico`,
			`${origin}/apple-touch-icon.png`,
		];
	} catch {
		return [];
	}
}

export default function FriendlyLinkIcon(props: FriendlyLinkIconProps) {
	const { url, title, fallbackSrc, className } = props;
	const faviconUrls = useMemo(() => getFaviconUrl(url), [url]);
	const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

	useEffect(() => {
		setLoadedSrc(null);

		if (faviconUrls.length === 0) {
			return;
		}

		let cancelled = false;
		const preloadedImages: HTMLImageElement[] = [];

		const tryLoad = (index: number) => {
			if (cancelled || index >= faviconUrls.length) {
				return;
			}

			const image = new window.Image();
			preloadedImages.push(image);

			image.onload = () => {
				if (!cancelled) {
					setLoadedSrc(faviconUrls[index]);
				}
			};

			image.onerror = () => {
				tryLoad(index + 1);
			};

			image.src = faviconUrls[index];
		};

		tryLoad(0);

		return () => {
			cancelled = true;
			preloadedImages.forEach((image) => {
				image.onload = null;
				image.onerror = null;
			});
		};
	}, [faviconUrls, url]);

	return (
		<>
			{!loadedSrc ? <Image className={className} src={fallbackSrc} alt={`${title} 站点图标`} fill sizes="112px" /> : null}
			{loadedSrc ? <img className={`${className || ''} absolute inset-0`} src={loadedSrc} alt={`${title} 站点图标`} /> : null}
		</>
	);
}
