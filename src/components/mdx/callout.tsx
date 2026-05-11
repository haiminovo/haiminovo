import clsx from 'clsx';

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
	icon?: string;
	children?: React.ReactNode;
	type?: 'default' | 'warning' | 'danger';
}

export function Callout({ children, icon, type = 'default', ...props }: CalloutProps) {
	const { className, ...restProps } = props;
	const styles = {
		default: 'border-sky-400 bg-sky-50/70 text-sky-950 dark:bg-sky-950/30 dark:text-sky-100',
		warning: 'border-amber-400 bg-amber-50/80 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100',
		danger: 'border-rose-400 bg-rose-50/80 text-rose-950 dark:bg-rose-950/30 dark:text-rose-100',
	};

	return (
		<div className={clsx('my-6 flex items-start rounded-md border-l-4 p-4', styles[type], className)} {...restProps}>
			{icon && <span className="mr-4 text-2xl">{icon}</span>}
			<div>{children}</div>
		</div>
	);
}
