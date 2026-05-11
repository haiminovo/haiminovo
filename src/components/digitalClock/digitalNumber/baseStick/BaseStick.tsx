import React from 'react';
interface IProps {
	active?: boolean;
	direction?: 'top' | 'mid' | 'bottom' | 'left' | 'right';
}
const directionDegreeMap = {
	top: 'rotate-180',
	bottom: '',
	mid: '',
	left: 'rotate-90',
	right: '-rotate-90',
};
export default function BaseStick(props: IProps) {
	const { active = true, direction = 'bottom' } = props;
	if (!active) return <div className="h-2 w-12"></div>;
	const svgClass = `h-2 w-12 transition-all duration-700 ${directionDegreeMap[direction]}`;

	if (direction === 'mid') {
		return (
			<svg
				viewBox="0 0 48 8"
				aria-hidden="true"
				className={svgClass}
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
			>
				<path className="fill-custom-color-dark-4 dark:fill-custom-color-4" d="M6 0H42L48 4L42 8H6L0 4L6 0Z" />
				<path className="fill-custom-color-2 dark:fill-custom-color-dark-2" d="M0 4L6 0V2L3 4L6 6V8L0 4Z" />
				<path className="fill-custom-color-2 dark:fill-custom-color-dark-2" d="M48 4L42 0V2L45 4L42 6V8L48 4Z" />
			</svg>
		);
	}

	return (
		<svg
			viewBox="0 0 48 8"
			aria-hidden="true"
			className={svgClass}
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="none"
		>
			<path className="fill-custom-color-dark-4 dark:fill-custom-color-4" d="M4 0H44L40 8H8L4 0Z" />
			<path className="fill-custom-color-2 dark:fill-custom-color-dark-2" d="M0 0H4L8 8H4L0 0Z" />
			<path className="fill-custom-color-2 dark:fill-custom-color-dark-2" d="M44 0H48L44 8H40L44 0Z" />
		</svg>
	);
}
