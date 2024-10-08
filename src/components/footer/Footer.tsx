import React from 'react';
import Image from 'next/image';

export default function Footer() {
	return (
		<footer className="flex w-full items-center justify-center gap-1 whitespace-nowrap bg-custom-color-8 p-2 text-xs text-font-light max-md:flex-wrap dark:bg-custom-color-dark-8 dark:text-font-light-dark">
			<a
				className="flex gap-1"
				target="_blank"
				href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010502007246"
			>
				<Image className="object-contain" width={16} height={16} alt="警徽图标" src={'/备案图标.png'} unoptimized />
				浙公网安备33010502007246号
			</a>
			<a className="ml-5" target="_blank" href="https://beian.miit.gov.cn">
				浙ICP备2021034756号
			</a>
			<p className="ml-2">© 2024 by haimin.&emsp;All rights reserved. </p>
		</footer>
	);
}
