'use client';
import { CaretUpOutlined } from '@ant-design/icons';
import React from 'react';

interface IProps {}

export default function BackToTop(props: IProps) {
	return (
		<div
			className="toTopBox fixed bottom-12 right-12 flex h-12 w-12 cursor-n-resize flex-col items-center justify-center rounded-lg bg-custom-color-9 font-medium text-font-strong shadow-md dark:bg-custom-color-dark-9 dark:text-font-light-dark"
			onClick={() => {
				scrollTo(0, 0);
			}}
		>
			<CaretUpOutlined />
			<div data-id="--scroll-position">%</div>
		</div>
	);
}
