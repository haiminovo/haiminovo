'use client';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

interface IPoint {
    r: number;
    x: number;
    y: number;
    color: string;
    xSpeed: number;
    ySpeed: number;
    lastDrawTime: number;
}

export default function Ball() {
    const canvas: any = useRef();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleMouseMove = (e: any) => {};

    const getRandom = (min: number, max: number) => {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    };

    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    };

    const getDistance = (point: IPoint, targetPoint: IPoint) => {
        return (Math.abs(point.x - targetPoint.x) ** 2 + Math.abs(point.y - targetPoint.y) ** 2) ** 0.5;
    };

    useLayoutEffect(() => {
        setHeight(document.documentElement.clientHeight);
        setWidth(document.documentElement.clientWidth);
        const initCanvas = (canvas: any, width: number, height: number) => {
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.current.getContext('2d');
            class Point implements IPoint {
                r = getRandom(1, 2);
                x = getRandom(0, canvas.width - this.r / 2);
                y = getRandom(0, canvas.height - this.r / 2);
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
                        if (x - this.r <= 0 || x + this.r >= canvas.width) {
                            x = getRandom(0, canvas.width - this.r / 2);
                            y = getRandom(0, canvas.height - this.r / 2);
                        }
                        if (y - this.r <= 0 || y + this.r >= canvas.height) {
                            x = getRandom(0, canvas.width - this.r / 2);
                            y = getRandom(0, canvas.height - this.r / 2);
                        }
                        this.x = x;
                        this.y = y;
                    }
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                    this.lastDrawTime = Date.now();
                }
            }
            class Graph {
                pointNum: number;
                points: Point[];
                constructor() {
                    this.pointNum = 20;
                    this.points = new Array(this.pointNum).fill(0).map(() => new Point());
                }
                draw() {
                    requestAnimationFrame(() => {
                        this.draw();
                    });
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    this.points.forEach((point, index) => {
                        point.draw();
                        for (let i = index; i < this.points.length; i++) {
                            let targetPoint = this.points[i];
                            if (getDistance(point, targetPoint) < 50 && point.r < targetPoint.r) {
                                ctx.moveTo(point.x, point.y);
                                ctx.lineTo(targetPoint.x, targetPoint.y);
                                ctx.strokeStyle = point.color;
                                ctx.lineWidth = 1;
                                ctx.stroke();
                            }
                        }
                    });
                }
            }
            const lineBallGraph = new Graph();
            lineBallGraph.draw();
        };
        initCanvas(canvas, document.documentElement.clientWidth, document.documentElement.clientHeight);
    }, []);

    return (
        <div className="fixed z-50 pointer-events-none">
            <canvas width={width} height={height} ref={canvas} onMouseMove={handleMouseMove} />
        </div>
    );
}
