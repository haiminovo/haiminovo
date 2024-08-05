import React from 'react';
import DigitalClock from '../digitalClock/DigitalClock';
import DarkModeBtn from '../darkModeBtn/DarkModeBtn';
import Menu from '../menu/menu';

interface IProps {
    className?: string;
}

export default function Navbar(props: IProps) {
    const { className } = props;
    return (
        <div
            className={`flex items-center py-2 px-4 font-bold bg-gradient-to-r backdrop-blur-[2px]
                from-custom-color-4/100 to-custom-color-1/50 
                dark:from-custom-color-dark-4/100 dark:to-custom-color-dark-1/50
                ${className}`}
        >
            <div className="flex items-center justify-between w-full h-full max-md:justify-end">
                <DigitalClock className="zoom-25 h-full max-md:hidden"></DigitalClock>
                <div className="flex items-center gap-4">
                    <Menu className="md:hidden"></Menu>
                    <DarkModeBtn></DarkModeBtn>
                </div>
            </div>
        </div>
    );
}
