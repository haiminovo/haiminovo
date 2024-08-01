import React, { useLayoutEffect, useRef } from 'react';
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
            className={`flex h-14 p-4 font-bold bg-gradient-to-r backdrop-blur-[2px] max-md:h-10
                from-custom-color-4/100 to-custom-color-1/50 
                dark:from-custom-color-dark-4/100 dark:to-custom-color-dark-1/50
                ${className}`}
        >
            <div className="flex justify-between w-full max-md:justify-end">
                <DigitalClock className="zoom-25 max-md:hidden"></DigitalClock>
                <div className="flex items-center gap-4">
                    <DarkModeBtn></DarkModeBtn>
                    <Menu className=" lg:hidden"></Menu>
                </div>
            </div>
        </div>
    );
}
