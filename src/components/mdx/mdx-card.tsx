// mdx-card.tsx
import clsx from 'clsx';
import Link from 'next/link';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	href?: string;
	disabled?: boolean;
}

export function MdxCard({ href, className, children, disabled, ...props }: CardProps) {
	return (
		<div
			className={clsx(
				'group relative rounded-lg p-6 shadow-md transition-shadow',
				disabled ? 'cursor-not-allowed opacity-60' : 'hover:shadow-lg',
				className
			)}
			{...props}
		>
			<div className="flex flex-col justify-between space-y-4">
				<div className="[&>p]:text-muted-foreground space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0">{children}</div>
			</div>
			{href && !disabled && (
				<Link href={disabled ? '#' : href} className="absolute inset-0">
					<span className="sr-only">View</span>
				</Link>
			)}
		</div>
	);
}
