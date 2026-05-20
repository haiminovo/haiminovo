'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { getRandom } from '@/utils';

interface IParticle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	life: number;
	maxLife: number;
	color: string;
	size: number;
	gravity: number;
	rotation: number;
	rotationSpeed: number;
	shape: 'circle' | 'square' | 'triangle';
}

// 参考了 https://www.kirilv.com/canvas-confetti/ 的配色思路，
// 但实现上是自己用原生 Canvas 手写的粒子系统，没有引入第三方库。
const COLORS = [
	'#ff6b6b',
	'#feca57',
	'#48dbfb',
	'#ff9ff3',
	'#54a0ff',
	'#5f27cd',
	'#00d2d3',
	'#1dd1a1',
	'#ff9f43',
	'#ee5a24',
	'#0abde3',
	'#10ac84',
	'#ff4757',
	'#2ed573',
	'#ffa502',
];

function createParticle(x: number, y: number): IParticle {
	const angle = Math.random() * Math.PI * 2;
	const speed = Math.random() * 3 + 1;
	return {
		x,
		y,
		vx: Math.cos(angle) * speed,
		vy: Math.sin(angle) * speed - 2,
		life: 1,
		maxLife: getRandom(30, 55),
		color: COLORS[getRandom(0, COLORS.length - 1)],
		size: getRandom(2, 4),
		gravity: 0.12,
		rotation: Math.random() * 360,
		rotationSpeed: (Math.random() - 0.5) * 6,
		shape: (['circle', 'square', 'triangle'] as const)[getRandom(0, 2)],
	};
}

function drawParticle(ctx: CanvasRenderingContext2D, p: IParticle) {
	ctx.save();
	ctx.translate(p.x, p.y);
	ctx.rotate((p.rotation * Math.PI) / 180);
	ctx.globalAlpha = p.life;
	ctx.fillStyle = p.color;

	if (p.shape === 'circle') {
		ctx.beginPath();
		ctx.arc(0, 0, p.size, 0, Math.PI * 2);
		ctx.fill();
	} else if (p.shape === 'square') {
		ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
	} else if (p.shape === 'triangle') {
		ctx.beginPath();
		ctx.moveTo(0, -p.size);
		ctx.lineTo(-p.size, p.size);
		ctx.lineTo(p.size, p.size);
		ctx.closePath();
		ctx.fill();
	}

	ctx.restore();
}

export default function ClickConfetti() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const particlesRef = useRef<IParticle[]>([]);
	const rafRef = useRef<number>(0);

	const animate = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

		const particles = particlesRef.current;
		for (let i = particles.length - 1; i >= 0; i--) {
			const p = particles[i];
			p.x += p.vx;
			p.y += p.vy;
			p.vy += p.gravity;
			p.vx *= 0.98;
			p.rotation += p.rotationSpeed;
			p.life -= 1 / p.maxLife;

			if (p.life <= 0) {
				particles.splice(i, 1);
				continue;
			}

			drawParticle(ctx, p);
		}

		rafRef.current = particles.length > 0 ? requestAnimationFrame(animate) : 0;
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduceMotion) return;

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const ctx = canvas.getContext('2d');
			canvas.width = Math.round(window.innerWidth * dpr);
			canvas.height = Math.round(window.innerHeight * dpr);
			ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		resize();
		window.addEventListener('resize', resize);

		return () => {
			window.removeEventListener('resize', resize);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, []);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			if (reduceMotion) return;

			// 文本选择时不触发礼花
			const selection = window.getSelection();
			if (selection && selection.toString().length > 0) return;

			// 输入类元素聚焦时不触发
			const target = e.target as HTMLElement;
			const tagName = target.tagName.toLowerCase();
			if (
				tagName === 'input' ||
				tagName === 'textarea' ||
				tagName === 'select' ||
				target.isContentEditable
			) {
				return;
			}

			const count = getRandom(10, 16);
			for (let i = 0; i < count; i++) {
				particlesRef.current.push(createParticle(e.clientX, e.clientY));
			}

			if (!rafRef.current) {
				rafRef.current = requestAnimationFrame(animate);
			}
		};

		window.addEventListener('click', handleClick, { passive: true });
		return () => window.removeEventListener('click', handleClick);
	}, [animate]);

	return (
		<canvas
			ref={canvasRef}
			className="pointer-events-none fixed top-0 left-0 z-[9999]"
			style={{ width: '100%', height: '100%' }}
		/>
	);
}
