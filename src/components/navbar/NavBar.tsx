import React from 'react';
import DigitalClock from '../digitalClock/DigitalClock';

interface IProps {
    className?: string;
}

export default function Navbar(props: IProps) {
    const { className } = props;
    return (
        <div
            className={`flex h-14 p-4 font-bold bg-gradient-to-r from-[rgba(235,242,237,1)] to-[rgba(225,232,227,.5)] backdrop-blur-[2px] ${className}`}
        >
            <div className="flex justify-between w-full">
                <DigitalClock className="scale-[20%] -translate-x-44 -translate-y-14"></DigitalClock>
                <div>placeholder</div>
            </div>
        </div>
    );
}
