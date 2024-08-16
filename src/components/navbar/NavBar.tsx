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
			className={`sticky flex items-center bg-gradient-to-r from-custom-color-4 to-custom-color-1/30 p-2 font-bold backdrop-blur-[2px] dark:from-custom-color-dark-4 dark:to-custom-color-dark-1/30 ${className}`}
		>
			<div className="flex h-full w-full items-center justify-between gap-2">
				<Links></Links>
				<div className="flex items-center">
					<DigitalClock className="zoom-20 h-full pr-28 max-md:hidden"></DigitalClock>
					<DarkModeBtn></DarkModeBtn>
				</div>
			</div>
		</div>
	);
}
