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
	const mouseRef = useRef({ x: -100, y: -100 });
	const rafRef = useRef<number>(0);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		resize();
		window.addEventListener('resize', resize);

		const handleMouseMove = (e: MouseEvent) => {
			mouseRef.current = { x: e.clientX, y: e.clientY };
			// 每次移动生成 2-4 个粒子
			const count = getRandom(2, 4);
			for (let i = 0; i < count; i++) {
				const colorBase = COLORS[getRandom(0, COLORS.length - 1)];
				dotsRef.current.push({
					x: e.clientX + (Math.random() - 0.5) * 6,
					y: e.clientY + (Math.random() - 0.5) * 6,
					life: 1,
					maxLife: getRandom(20, 40),
					color: colorBase,
					size: getRandom(2, 5),
				});
			}
		};

		window.addEventListener('mousemove', handleMouseMove);

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

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

			rafRef.current = requestAnimationFrame(animate);
		};

		rafRef.current = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener('resize', resize);
			window.removeEventListener('mousemove', handleMouseMove);
			cancelAnimationFrame(rafRef.current);
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
