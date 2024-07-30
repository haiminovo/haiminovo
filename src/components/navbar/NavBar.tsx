import React, { useLayoutEffect, useRef } from 'react';
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
            <div className="flex justify-between w-full max-md:justify-end">
                <DigitalClock style={{ zoom: '.25' }}></DigitalClock>
            </div>
        </div>
    );
}
