interface CalloutProps {
	icon?: string;
	children?: React.ReactNode;
	type?: 'default' | 'warning' | 'danger';
}

export function Callout({ children, icon, type = 'default', ...props }: CalloutProps) {
	return (
		<div className="my-6 flex items-start rounded-md border border-l-4 p-4" {...props}>
			{icon && <span className="mr-4 text-2xl">{icon}</span>}
			<div>{children}</div>
		</div>
	);
}
