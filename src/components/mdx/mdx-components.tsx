// mdx-components.tsx
import * as React from 'react';
import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import type { MDXComponents } from 'mdx/types';

import { Callout } from '@/components/mdx/callout';
import { MdxCard } from '@/components/mdx/mdx-card';
import { CopyButton } from './copyButton';

const components: MDXComponents = {
	h1: ({ className, ...props }) => (
		<h1 className={'mt-2 scroll-m-20 text-4xl tracking-tight ' + className} {...props} />
	),
	h2: ({ className, ...props }) => (
		<h2
			className={
				'mt-10 scroll-m-20 border-b border-gray-500/50 pb-2 text-3xl font-black tracking-tight first:mt-0 ' + className
			}
			{...props}
		/>
	),
	h3: ({ className, ...props }) => (
		<h3 className={'mt-8 scroll-m-20 pl-3 text-2xl font-extrabold tracking-tight ' + className} {...props} />
	),
	h4: ({ className, ...props }) => (
		<h4 className={'mt-8 scroll-m-20 pl-6 text-xl font-bold tracking-tight ' + className} {...props} />
	),
	h5: ({ className, ...props }) => (
		<h5 className={'mt-8 scroll-m-20 pl-9 text-lg font-semibold tracking-tight ' + className} {...props} />
	),
	h6: ({ className, ...props }) => (
		<h6 className={'mt-8 scroll-m-20 pl-12 text-base font-normal tracking-tight ' + className} {...props} />
	),
	a: ({ className, ...props }) => (
		<a target="_blank" className={'font-medium underline underline-offset-4 ' + className} {...props} />
	),
	p: ({ className, ...props }) => (
		<p className={'indent-8 leading-7 [&:not(:first-child)]:mt-6 ' + className} {...props} />
	),
	ul: ({ className, ...props }) => <ul className={'my-6 ml-6 list-disc ' + className} {...props} />,
	ol: ({ className, ...props }) => <ol className={'my-6 ml-6 list-decimal ' + className} {...props} />,
	li: ({ className, ...props }) => <li className={'mt-2 ' + className} {...props} />,
	blockquote: ({ className, ...props }) => (
		<blockquote className={'[&>*]:text-muted-foreground mt-6 border-l-2 pl-6 italic ' + className} {...props} />
	),
	img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img className={'rounded-md dark:brightness-[.9] ' + className} alt={alt} {...props} />
	),
	hr: ({ ...props }) => <hr className="my-4" {...props} />,
	table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="my-6 w-full overflow-y-auto">
			<table className={'w-full ' + className} {...props} />
		</div>
	),
	tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr className={'even:bg-muted m-0 border-t p-0 ' + className} {...props} />
	),
	th: ({ className, ...props }) => (
		<th
			className={
				'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right ' + className
			}
			{...props}
		/>
	),
	td: ({ className, ...props }) => (
		<td
			className={'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right ' + className}
			{...props}
		/>
	),
	pre: ({ className, ...props }) => {
		return (
			<CopyButton>
				<pre className={'mb-4 mt-6 overflow-x-auto rounded-lg ' + className} {...props}>
					{props.children}
				</pre>
			</CopyButton>
		);
	},
	code: ({ className, ...props }) => (
		<code className={'relative max-w-[280px] rounded p-2 font-mono text-sm ' + className} {...props} />
	),
	Image,
	Callout,
	Card: MdxCard,
};

interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	return (
		<div className="mdx">
			<Component components={components} />
		</div>
	);
}
