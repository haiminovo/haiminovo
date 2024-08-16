'use client';
import React from 'react';

interface IProps {}

export default function BackToTop(props: IProps) {
	return (
		<div className="toTopBox fixed bottom-0 flex justify-center text-lg">
			<button
				data-id="--scroll-position"
				onClick={() => {
					scrollTo(0, 0);
				}}
				className="h-8 w-16 cursor-n-resize rounded-xl bg-gradient-to-b from-custom-color-dark-1/10 to-custom-color-4/20 text-sm font-medium text-font-strong dark:from-custom-color-dark-6 dark:to-custom-color-dark-4 dark:text-font-light-dark"
			>
				%
			</button>
		</div>
	);
}
