'use client';
import LineBallCanvas from '@/components/lineBallCanvas';
import { useRef } from 'react';

export default function Test() {
	const ref: any = useRef();

	return (
		<div ref={ref} className="flex h-full flex-col items-center p-6 max-md:p-4">
			<div className="relative">
				<LineBallCanvas></LineBallCanvas>
			</div>
		</div>
	);
}
