'use client';
import React, { useEffect, useState } from 'react';
import DigitalNumber from './digitalNumber/DigitalNumber';

interface IProps {
    className?: string;
    backgroundColor?: string;
}

export default function DigitalClock(props: IProps) {
    const { backgroundColor, className } = props;
    const [renderArr, setRenderArr] = useState<string[]>([]);
    useEffect(() => {
        const timmer = setInterval(() => {
            const timeNow = new Date();
            const renderArr = Array.from(timeNow.toTimeString().substring(0, 9));
            setRenderArr(renderArr);
        }, 1000);
        return () => clearInterval(timmer);
    }, []);
    return (
        <div className={`flex h-36 ${className}`}>
            {renderArr.map((item: any, index: React.Key) => (
                <DigitalNumber key={index} value={item} backgroundColor={backgroundColor}></DigitalNumber>
            ))}
        </div>
    );
}
