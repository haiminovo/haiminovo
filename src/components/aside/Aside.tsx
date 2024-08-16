import React from 'react';

interface IProps {
	children: React.ReactNode;
	className?: string;
}

export default function Aside(props: IProps) {
	const { children, className } = props;
	return (
		<aside className={`flex w-48 flex-shrink-0 flex-col items-center gap-3 p-3 text-sm ${className}`}>{children}</aside>
	);
}
