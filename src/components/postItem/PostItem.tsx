import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import type { Post } from 'contentlayer/generated';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
	index: number;
	data: Post;
	className?: string;
}

export default function PostItem(props: IProps) {
	const { index, data, className } = props;
	let { title, description, authors, date, tags, image } = data;
	const hasImage = Boolean(image?.trim());
	return (
		<Link
			href={`/post/${data.slugAsParams}`}
			className={`bg-custom-color-9 dark:border-custom-color-dark-4 dark:bg-custom-color-dark-9 relative flex w-full cursor-pointer flex-col justify-between gap-2 rounded-xl p-3 shadow-md ${className}`}
		>
			<div
				className={clsx(
					'bg-custom-color-7/80 dark:border-custom-color-dark-7 dark:bg-custom-color-dark-7/80 flex overflow-hidden rounded-xl text-black/80 shadow-inner transition-transform duration-200 hover:-translate-y-0.5 max-lg:flex-col dark:text-white',
					{
						'flex-row-reverse': index % 2 === 1,
						'max-lg:flex-col': hasImage,
					}
				)}
			>
				{hasImage && (
					<div
						className={clsx(
							'bg-custom-color-8 dark:bg-custom-color-dark-8 relative w-[34%] shrink-0 overflow-hidden max-lg:w-full',
							{
								'rounded-r-xl rounded-l-none max-lg:rounded-t-xl max-lg:rounded-b-none': index % 2 === 1,
								'rounded-l-xl rounded-r-none max-lg:rounded-t-xl max-lg:rounded-b-none': index % 2 === 0,
							}
						)}
					>
						<div className="relative aspect-[16/9] w-full">
							<Image className="object-cover dark:brightness-90" alt="文章头图" src={image || ''} fill sizes="(max-width: 1024px) 100vw, 34vw"></Image>
						</div>
					</div>
				)}
				<div
					className={clsx('flex flex-1 flex-col justify-center break-words', {
						'min-h-[156px] gap-3 px-5 py-4 max-lg:min-h-0': hasImage,
						'min-h-[96px] gap-2 px-4 py-3': !hasImage,
					})}
				>
					<h1
						className={clsx('font-black break-words text-slate-700 dark:text-slate-100', {
							'line-clamp-2 text-lg leading-7': hasImage,
							'line-clamp-2 text-base leading-6': !hasImage,
						})}
					>
						{title}
					</h1>
					<p
						className={clsx('font-normal break-words text-slate-600 dark:text-slate-300', {
							'line-clamp-3 max-w-[58ch] text-sm leading-7': hasImage,
							'line-clamp-2 max-w-[72ch] text-sm leading-6': !hasImage,
						})}
					>
						{description}
					</p>
				</div>
			</div>
			<div className="bottom-2 left-1/2 flex w-full flex-wrap justify-between gap-2 max-[424px]:flex-col">
				<ul className="text-font-strong dark:text-font-light-dark flex flex-wrap items-center gap-2">
					{tags?.map((item) => (
						<li
							key={item}
							className="from-custom-color-1 to-custom-color-9 dark:from-custom-color-dark-10 dark:to-custom-color-dark-5 flex items-center gap-2 rounded-md bg-gradient-to-tl px-2 py-1 text-xs text-nowrap shadow-sm"
						>
							# {item}
						</li>
					))}
				</ul>
				<ul className="text-font-strong dark:text-font-light-dark flex flex-wrap items-center gap-2">
					<li className="from-custom-color-1 to-custom-color-9 dark:from-custom-color-dark-10 dark:to-custom-color-dark-5 flex flex-wrap items-center gap-2 rounded-md bg-gradient-to-t px-2 py-1 text-xs shadow-sm">
						<UserOutlined />
						{authors.map((item) => (
							<span key={item}>{item}</span>
						))}
					</li>
					<li className="from-custom-color-1 to-custom-color-9 dark:from-custom-color-dark-10 dark:to-custom-color-dark-5 flex items-center gap-2 rounded-md bg-gradient-to-t px-2 py-1 text-xs whitespace-nowrap shadow-sm">
						<ClockCircleOutlined />
						<div>{date.slice(0, 10)}</div>
					</li>
				</ul>
			</div>
		</Link>
	);
}
