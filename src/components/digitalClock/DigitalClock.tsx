'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import DigitalNumber from './digitalNumber/DigitalNumber';

interface IProps {
    className?: string;
}

export default function DigitalClock(props: IProps) {
    const { className } = props;
    const [renderArr, setRenderArr] = useState<string[]>([]);
    const ref: any = useRef(null);

    useEffect(() => {
        const timmer = setInterval(() => {
            const timeNow = new Date();
            const renderArr = Array.from(timeNow.toTimeString().substring(0, 9));
            setRenderArr(renderArr);
        }, 1000);
        return () => clearInterval(timmer);
    }, []);
    return (
        <div ref={ref} className={`flex items-center h-36 ${className}`}>
            {renderArr.map((item: any, index: React.Key) => (
                <DigitalNumber key={index} value={item}></DigitalNumber>
            ))}
        </div>
    );
}
