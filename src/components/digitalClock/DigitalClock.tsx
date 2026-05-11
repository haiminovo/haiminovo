'use client';
import React, { useEffect, useRef, useState } from 'react';
import DigitalNumber from './digitalNumber/DigitalNumber';

interface IProps {
	className?: string;
}

export default function DigitalClock(props: IProps) {
	const { className } = props;
	const [renderArr, setRenderArr] = useState<string[]>([]);
	const ref: any = useRef(null);

	useEffect(() => {
		const timmer = setInterval(() => {
			const timeNow = new Date();
			const renderArr = Array.from(timeNow.toTimeString().substring(0, 9));
			setRenderArr(renderArr);
		}, 1000);
		return () => clearInterval(timmer);
	}, []);
	return (
		<div ref={ref} className={`flex origin-right scale-[0.2] items-center gap-2 max-lg:scale-[0.17] ${className}`}>
			{renderArr.map((item: any, index: React.Key) => (
				<DigitalNumber key={index} value={item}></DigitalNumber>
			))}
		</div>
	);
}
