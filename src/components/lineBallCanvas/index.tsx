'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getRandom, getRandomColor } from '@/utils';

interface IPoint {
	r: number;
	x: number;
	y: number;
	color: string;
	xSpeed: number;
	ySpeed: number;
	lastDrawTime: number;
}

const getDistance = (point: IPoint, targetPoint: IPoint) => {
	return (Math.abs(point.x - targetPoint.x) ** 2 + Math.abs(point.y - targetPoint.y) ** 2) ** 0.5;
};

export default function LineBallCanvas() {
	const canvas = useRef<HTMLCanvasElement>(null);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		const updateViewport = () => {
			setHeight(document.documentElement.clientHeight);
			setWidth(document.documentElement.clientWidth);
		};

		updateViewport();
		window.addEventListener('resize', updateViewport);

		return () => {
			window.removeEventListener('resize', updateViewport);
		};
	}, []);

	useEffect(() => {
		const canvasElement = canvas.current;
		if (!canvasElement || !width || !height) return;
		const canvasWidth = width;
		const canvasHeight = height;

		canvasElement.width = canvasWidth;
		canvasElement.height = canvasHeight;

		const context = canvasElement.getContext('2d');
		if (!context) return;
		const ctx = context;

		class Point implements IPoint {
			r = getRandom(1, 3);
			x = getRandom(0, canvasWidth - this.r / 2);
			y = getRandom(0, canvasHeight - this.r / 2);
			color = getRandomColor();
			xSpeed = getRandom(-100, 100);
			ySpeed = getRandom(-100, 100);
			lastDrawTime = 0;

			draw() {
				if (this.lastDrawTime) {
					const now = Date.now();
					const t = (now - this.lastDrawTime) / 1000;
					let x = this.x + this.xSpeed * t;
					let y = this.y + this.ySpeed * t;

					if (x - this.r <= 0 || x + this.r >= canvasWidth) {
						x = getRandom(0, canvasWidth - this.r / 2);
						y = getRandom(0, canvasHeight - this.r / 2);
					}

					if (y - this.r <= 0 || y + this.r >= canvasHeight) {
						x = getRandom(0, canvasWidth - this.r / 2);
						y = getRandom(0, canvasHeight - this.r / 2);
					}

					this.x = x;
					this.y = y;
				}

				ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
				ctx.fillStyle = this.color;
				ctx.fill();
				this.lastDrawTime = Date.now();
			}
		}

		class Graph {
			pointNum: number;
			points: Point[];
			animationFrameId?: number;

			constructor() {
				this.pointNum = 20;
				this.points = new Array(this.pointNum).fill(0).map(() => new Point());
			}

			draw = () => {
				this.animationFrameId = window.requestAnimationFrame(this.draw);
				ctx.clearRect(0, 0, canvasWidth, canvasHeight);

				this.points.forEach((point, index) => {
					point.draw();
					for (let i = index; i < this.points.length; i++) {
						const targetPoint = this.points[i];
						if (getDistance(point, targetPoint) < 50 && point.r < targetPoint.r) {
							ctx.moveTo(point.x, point.y);
							ctx.lineTo(targetPoint.x, targetPoint.y);
							ctx.strokeStyle = point.color;
							ctx.lineWidth = 1;
							ctx.stroke();
						}
					}
				});
			};

			destroy() {
				if (this.animationFrameId) {
					window.cancelAnimationFrame(this.animationFrameId);
				}
			}
		}

		const lineBallGraph = new Graph();
		lineBallGraph.draw();

		return () => {
			lineBallGraph.destroy();
		};
	}, [height, width]);

	return (
		<div className="fixed top-0 left-0">
			<canvas width={width} height={height} ref={canvas} />
		</div>
	);
}
