import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import type { Post } from 'contentlayer/generated';
import clsx from 'clsx';
import Image from 'next/image';

interface IProps {
	index: number;
	data: Post;
	className?: string;
	onClick?: () => void;
}

export default function PostItem(props: IProps) {
	const { index, data, className, onClick } = props;
	let { title, description, authors, date, tags, image } = data;
	return (
		<div
			className={`relative flex w-full cursor-pointer flex-col justify-between gap-4 rounded-xl border bg-custom-color-9 p-4 shadow-md dark:border-custom-color-dark-4 dark:bg-custom-color-dark-9 ${className}`}
			onClick={onClick}
		>
			<div
				className={clsx(
					'flex rounded-xl border bg-custom-color-7/80 text-black/80 shadow-inner max-lg:flex-col dark:border-custom-color-dark-7 dark:bg-custom-color-dark-7/80 dark:text-white',
					{
						'flex-row-reverse': index % 2 === 1,
					}
				)}
			>
				{image && (
					<div className="relative h-full min-h-32 w-[33%] rounded-t-2xl max-lg:min-h-64 max-lg:w-full">
						<Image
							className={clsx('object-cover max-lg:rounded-b-none max-lg:rounded-t-xl dark:brightness-90', {
								'rounded-r-xl': index % 2 === 1,
								'rounded-l-xl': index % 2 === 0,
							})}
							alt="文章头图"
							src={image || ''}
							fill
						></Image>
					</div>
				)}
				<div className="flex flex-1 flex-col justify-center gap-1 p-4">
					<h1 className="break-all indent-2 text-base font-black">{`# ${title} `}</h1>
					<p className="line-clamp-3 text-ellipsis break-all indent-4 text-sm font-normal">{description}</p>
				</div>
			</div>
			<div className="bottom-2 left-1/2 flex w-full flex-wrap justify-between gap-2 max-[424px]:flex-col">
				<ul className="flex flex-wrap items-center gap-2 text-font-strong dark:text-font-light-dark">
					{tags?.map((item) => (
						<li
							key={item}
							className="flex items-center gap-2 text-nowrap rounded-md bg-gradient-to-tl from-custom-color-1 to-custom-color-9 px-2 py-1 text-xs shadow-sm dark:from-custom-color-dark-10 dark:to-custom-color-dark-5"
						>
							# {item}
						</li>
					))}
				</ul>
				<ul className="flex flex-wrap items-center gap-2 text-font-strong dark:text-font-light-dark">
					<li className="flex flex-wrap items-center gap-2 rounded-md bg-gradient-to-t from-custom-color-1 to-custom-color-9 px-2 py-1 text-xs shadow-sm dark:from-custom-color-dark-10 dark:to-custom-color-dark-5">
						<UserOutlined />
						{authors.map((item) => (
							<div key={item}>{item}</div>
						))}
					</li>
					<li className="flex items-center gap-2 whitespace-nowrap rounded-md bg-gradient-to-t from-custom-color-1 to-custom-color-9 px-2 py-1 text-xs shadow-sm dark:from-custom-color-dark-10 dark:to-custom-color-dark-5">
						<ClockCircleOutlined />
						<div>{date.slice(0, 10)}</div>
					</li>
				</ul>
			</div>
		</div>
	);
}
