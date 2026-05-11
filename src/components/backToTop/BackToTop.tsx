'use client';
import { CaretUpOutlined } from '@ant-design/icons';
import React from 'react';

interface IProps {}

export default function BackToTop(props: IProps) {
	return (
		<button
			type="button"
			aria-label="返回顶部"
			className="toTopBox bg-custom-color-9 text-font-strong dark:bg-custom-color-dark-9 dark:text-font-light-dark fixed right-12 bottom-12 flex h-12 w-12 cursor-n-resize flex-col items-center justify-center rounded-lg font-medium shadow-md"
			onClick={() => {
				scrollTo(0, 0);
			}}
		>
			<CaretUpOutlined />
			<div data-id="--scroll-position">%</div>
		</button>
	);
}
