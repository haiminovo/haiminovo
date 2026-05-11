import React from 'react';
import DigitalClock from '../digitalClock/DigitalClock';
import DarkModeBtn from '../darkModeBtn/DarkModeBtn';
import Links from '../links/Links';

interface IProps {
	className?: string;
}

export default function Navbar(props: IProps) {
	const { className } = props;
	return (
		<div
			className={`from-custom-color-4 to-custom-color-1/30 dark:from-custom-color-dark-4 dark:to-custom-color-dark-1/30 sticky flex items-center justify-center bg-gradient-to-b p-2 font-bold backdrop-blur-[2px] ${className}`}
		>
			<div className="flex h-full w-full max-w-[1440px] items-center justify-between gap-2 px-2 max-lg:px-3 max-md:px-2">
				<Links></Links>
				<div className="flex items-center gap-2">
					<DigitalClock className="h-full pr-8 max-lg:pr-2 max-md:hidden"></DigitalClock>
					<DarkModeBtn></DarkModeBtn>
				</div>
			</div>
		</div>
	);
}
