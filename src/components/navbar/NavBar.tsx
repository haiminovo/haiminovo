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
            className={`sticky flex items-center p-2 font-bold bg-gradient-to-r backdrop-blur-[2px]
                from-custom-color-4/100 to-custom-color-1/50 
                dark:from-custom-color-dark-4/100 dark:to-custom-color-dark-1/50
                ${className}`}
        >
            <div className="flex items-center justify-between gap-2 w-full h-full">
                <Links></Links>
                <div className="flex items-center">
                    <DigitalClock className="zoom-20 h-full max-md:hidden"></DigitalClock>
                    <DarkModeBtn></DarkModeBtn>
                </div>
            </div>
        </div>
    );
}
