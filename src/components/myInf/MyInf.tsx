import React from 'react';
import Image from 'next/image';

interface IProps {
    className?: string;
}

export default function MyInf(props: IProps) {
    return (
        <div className="flex items-center w-full h-28 p-3 gap-3" {...props}>
            <Image
                alt="用户头像"
                src={'http://haiminovo.cn:8088/haimin.jpg'}
                width={64}
                height={64}
                className="rounded-3xl"
            ></Image>
            <div className="flex flex-col justify-center">
                <p className="text-sm font-bold">haimin</p>
                <p className="text-xs">dont know what to say.</p>
            </div>
        </div>
    );
}
