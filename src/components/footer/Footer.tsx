import React from 'react';
import Image from 'next/image';

interface IProps {
	className?: string;
}

export default function Footer(props: IProps) {
	const { className } = props;
	return (
		<footer
			className={`text-font-light dark:text-font-light-dark mt-auto border-t border-dashed border-black/5 dark:border-white/5 flex w-full items-center justify-center gap-1 bg-transparent p-2 text-xs whitespace-nowrap max-md:flex-wrap ${className || ''}`}
		>
			<a
				className="flex gap-1"
				target="_blank"
				rel="noopener noreferrer"
				href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010502007246"
			>
				<Image className="object-contain" width={16} height={16} alt="警徽图标" src={'/备案图标.png'} unoptimized />
				浙公网安备33010502007246号
			</a>
			<a className="ml-5" target="_blank" rel="noopener noreferrer" href="https://beian.miit.gov.cn">
				浙ICP备2021034756号
			</a>
			<p className="ml-2">© 2024 by haimin.&emsp;All rights reserved. </p>
		</footer>
	);
}
