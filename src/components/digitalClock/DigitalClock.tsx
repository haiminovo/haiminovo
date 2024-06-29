'use client';
import React, { useEffect, useState } from 'react';
import DigitalNumber from './digitalNumber/DigitalNumber';

export default function DigitalClock() {
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
        <div className="flex h-full">
            {renderArr.map((item: any, index: React.Key) => (
                <DigitalNumber key={index} value={item}></DigitalNumber>
            ))}
        </div>
    );
}
