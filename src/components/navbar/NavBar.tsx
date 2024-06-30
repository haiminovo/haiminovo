import React from 'react';
import DigitalClock from '../digitalClock/DigitalClock';

interface IProps {
    className?: string;
}

export default function Navbar(props: IProps) {
    const { className } = props;
    return (
        <div className={`flex h-14 p-4 font-bold bg-gradient-to-tr from-[#F5F9F6] to-[#EBF2ED] ${className}`}>
            <div className="flex justify-between w-full">
                <DigitalClock className="scale-[20%] -translate-x-44 -translate-y-14"></DigitalClock>
                <div>占位</div>
            </div>
        </div>
    );
}
