import React from 'react';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="flex justify-between px-3 py-2 bg-[#fefffd] rounded-xl my-2 text-xs">
            <div className="flex gap-4">
                <a
                    className="flex gap-1"
                    target="_blank"
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010502007246"
                >
                    <Image
                        className="object-contain"
                        width={16}
                        height={16}
                        alt="浙公网安备33010502007246号"
                        src={'/备案图标.png'}
                        unoptimized
                    />
                    浙公网安备33010502007246号
                </a>
                <a target="_blank" href="https://beian.miit.gov.cn">
                    浙ICP备2021034756号
                </a>
            </div>
            <a target="_blank">© 2024 by haimin.&emsp;All rights reserved. </a>
        </footer>
    );
}
