'use client';
import { generateColor } from '@/utils';
import { useEffect, useState } from 'react';
import { basicColor } from '../../../tailwind.config';

export default function Dashboard() {
    const [colorArr, setColorArr] = useState<string[]>([]);
    const [colorArr1, setColorArr1] = useState<string[]>([]);
    const [basicColorSelect, setBasicColorSelect] = useState(basicColor);
    useEffect(() => {
        const colors = generateColor(basicColorSelect);
        if (!colors) return;
        console.log(colors);
        setColorArr(colors);
        const colors1 = generateColor(basicColorSelect, 'dark');
        if (!colors1) return;
        console.log(colors1);
        setColorArr1(colors1);
    }, [basicColorSelect]);
    return (
        <div className="flex flex-col">
            <input
                type="color"
                name="color"
                id="color"
                defaultValue={basicColor}
                onChange={(val) => {
                    setBasicColorSelect(val.target.value);
                }}
            />
            <div className="flex w-[500px] h-[64px]">
                {colorArr.map((item, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                width: '50px',
                                height: '50px',
                                background: colorArr[index],
                            }}
                        ></div>
                    );
                })}
            </div>
            <div className="flex w-[500px] h-[64px]">
                {colorArr1.map((item, index) => {
                    return (
                        <div
                            key={index + 'a'}
                            style={{
                                width: '50px',
                                height: '50px',
                                background: colorArr1[index],
                            }}
                        ></div>
                    );
                })}
            </div>
            <div className="flex w-[500px] h-[64px]">
                {colorArr1.slice(0, 7).map((item, index) => {
                    return (
                        <div
                            key={index + 'a'}
                            style={{
                                width: '50px',
                                height: '50px',
                                background: `#${index}a${index + 1}a${index + 2}a`,
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}
