import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
    className?: string;
}

export default function MyInf(props: IProps) {
    return (
        <div className="flex items-center w-full h-28 p-3 gap-3 cursor-pointer" {...props}>
            <Link href={'/about'} className="flex">
                <Image
                    alt="用户头像"
                    src={'http://haiminovo.cn:8088/haimin.jpg'}
                    width={56}
                    height={56}
                    className="rounded-3xl"
                ></Image>
            </Link>

            <div className="flex flex-1 flex-col justify-center">
                <p className="text-sm font-bold">haimin</p>
                <p className="text-xs">dont know what to say.</p>
            </div>
        </div>
    );
}
