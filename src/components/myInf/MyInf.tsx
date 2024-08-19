import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
	className?: string;
}

export default function MyInf(props: IProps) {
	return (
		<div
			className="mt-3 flex h-24 w-full cursor-pointer items-center gap-3 rounded-xl bg-custom-color-9 p-3 shadow-md dark:bg-custom-color-dark-9"
			{...props}
		>
			<Link href={'/about'} className="flex">
				<Image
					alt="用户头像"
					src={'http://haiminovo.cn:8088/haimin.jpg'}
					width={56}
					height={56}
					className="rounded-3xl"
				></Image>
			</Link>

			<div className="flex flex-1 flex-col justify-center">
				<p className="text-sm font-bold">haimin</p>
				<p className="text-xs">dont know what to say.</p>
			</div>
		</div>
	);
}
