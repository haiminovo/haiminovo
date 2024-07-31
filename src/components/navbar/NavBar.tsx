import React, { useLayoutEffect, useRef } from 'react';
import DigitalClock from '../digitalClock/DigitalClock';
import DarkModeBtn from '../darkModeBtn/DarkModeBtn';

interface IProps {
    className?: string;
}

export default function Navbar(props: IProps) {
    const { className } = props;
    return (
        <div
            className={`flex h-14 p-4 font-bold bg-gradient-to-r backdrop-blur-[2px]
                from-custom-color-4 to-custom-color-1 
                dark:from-custom-color-dark-4 dark:to-custom-color-dark-1 
                ${className}`}
        >
            <div className="flex justify-between w-full max-md:justify-end">
                <DigitalClock className="zoom-25"></DigitalClock>
                <DarkModeBtn></DarkModeBtn>
            </div>
        </div>
    );
}
