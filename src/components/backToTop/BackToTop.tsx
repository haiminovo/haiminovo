'use client';
import React from 'react';

interface IProps {}

export default function BackToTop(props: IProps) {
	return (
		<div className="toTopBox fixed bottom-14 flex text-lg">
			<button
				data-id="--scroll-position"
				onClick={() => {
					scrollTo(0, 0);
				}}
				className="h-8 w-14 cursor-n-resize rounded-lg bg-gradient-to-b from-custom-color-1/70 to-custom-color-4/70 text-sm font-medium text-font-strong dark:from-custom-color-dark-1/70 dark:to-custom-color-dark-4/70 dark:text-font-light-dark"
			>
				%
			</button>
		</div>
	);
}
