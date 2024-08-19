interface IProps {
	className?: string;
}

export default function Banner(props: IProps) {
	const { className } = props;
	return (
		<div
			className={`flex h-80 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border bg-custom-color-10 bg-contain bg-bottom bg-no-repeat p-4 text-3xl font-black underline shadow-lg dark:border-custom-color-dark-7 dark:bg-custom-color-dark-10 ${className}`}
		>
			<span>Site In Developing</span>
		</div>
	);
}
