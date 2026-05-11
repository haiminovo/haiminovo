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
	return (
		<Link
			href={`/post/${data.slugAsParams}`}
			className={`bg-custom-color-9 dark:border-custom-color-dark-4 dark:bg-custom-color-dark-9 relative flex w-full cursor-pointer flex-col justify-between gap-4 rounded-xl p-4 shadow-md ${className}`}
		>
			<div
				className={clsx(
					'bg-custom-color-7/80 dark:border-custom-color-dark-7 dark:bg-custom-color-dark-7/80 flex rounded-xl text-black/80 shadow-inner transition-transform duration-200 hover:-translate-y-0.5 max-lg:flex-col dark:text-white',
					{
						'flex-row-reverse': index % 2 === 1,
					}
				)}
			>
				{image && (
					<div className="relative h-full min-h-32 w-[33%] rounded-t-2xl max-lg:min-h-64 max-lg:w-full">
						<Image
							className={clsx('object-cover max-lg:rounded-t-xl max-lg:rounded-b-none dark:brightness-90', {
								'rounded-r-xl': index % 2 === 1,
								'rounded-l-xl': index % 2 === 0,
							})}
							alt="文章头图"
							src={image || ''}
							fill
							sizes="(max-width: 1024px) 100vw, 33vw"
						></Image>
					</div>
				)}
				<div className="flex flex-1 flex-col justify-center gap-1 p-4">
					<h1 className="indent-2 text-base font-black break-all">{`# ${title} `}</h1>
					<p className="line-clamp-3 indent-4 text-sm font-normal break-all text-ellipsis">{description}</p>
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
