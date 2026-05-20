'use client';

import React, { useEffect, useRef } from 'react';
import { getRandom } from '@/utils';

interface ITrailDot {
	x: number;
	y: number;
	life: number;
	maxLife: number;
	color: string;
	size: number;
}

const COLORS = [
	'rgba(255, 107, 107,',
	'rgba(254, 202, 87,',
	'rgba(72, 219, 251,',
	'rgba(255, 159, 243,',
	'rgba(84, 160, 255,',
	'rgba(95, 39, 205,',
	'rgba(0, 210, 211,',
	'rgba(29, 209, 161,',
];

export default function CursorTrail() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const dotsRef = useRef<ITrailDot[]>([]);
	const rafRef = useRef<number>(0);
	const lastEmitRef = useRef(0);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

		if (reduceMotion || coarsePointer) return;

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.round(window.innerWidth * dpr);
			canvas.height = Math.round(window.innerHeight * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		resize();
		window.addEventListener('resize', resize);

		const animate = () => {
			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

			const dots = dotsRef.current;
			for (let i = dots.length - 1; i >= 0; i--) {
				const d = dots[i];
				d.life -= 1 / d.maxLife;

				if (d.life <= 0) {
					dots.splice(i, 1);
					continue;
				}

				ctx.beginPath();
				ctx.arc(d.x, d.y, d.size * d.life, 0, Math.PI * 2);
				ctx.fillStyle = `${d.color} ${d.life})`;
				ctx.fill();
			}

			rafRef.current = dots.length > 0 ? requestAnimationFrame(animate) : 0;
		};

		const startAnimation = () => {
			if (!rafRef.current) {
				rafRef.current = requestAnimationFrame(animate);
			}
		};

		const handleMouseMove = (e: MouseEvent) => {
			const now = performance.now();
			if (now - lastEmitRef.current < 24) return;
			lastEmitRef.current = now;

			const count = getRandom(1, 2);
			for (let i = 0; i < count; i++) {
				const colorBase = COLORS[getRandom(0, COLORS.length - 1)];
				dotsRef.current.push({
					x: e.clientX + (Math.random() - 0.5) * 6,
					y: e.clientY + (Math.random() - 0.5) * 6,
					life: 1,
					maxLife: getRandom(18, 28),
					color: colorBase,
					size: getRandom(2, 4),
				});
			}

			if (dotsRef.current.length > 80) {
				dotsRef.current.splice(0, dotsRef.current.length - 80);
			}
			startAnimation();
		};

		window.addEventListener('mousemove', handleMouseMove, { passive: true });

		return () => {
			window.removeEventListener('resize', resize);
			window.removeEventListener('mousemove', handleMouseMove);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="pointer-events-none fixed top-0 left-0 z-9998"
			style={{ width: '100%', height: '100%' }}
		/>
	);
}
