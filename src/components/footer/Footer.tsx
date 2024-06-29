import React from 'react';
import Image from 'next/image';
import siteConfig from '@/configs/siteConfig';

export default function Footer() {
    return (
        <footer>
            <div className="flex gap-4 w-full justify-center p-2">
                <a target="_blank" href="https://beian.miit.gov.cn">
                    浙ICP备2021034756号
                </a>
                <a
                    className="flex gap-2"
                    target="_blank"
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010502007246"
                >
                    <Image
                        className="object-contain"
                        width={16}
                        height={16}
                        alt="浙公网安备33010502007246号"
                        src={siteConfig.imgServer + '备案图标.png'}
                        unoptimized
                    />
                    浙公网安备33010502007246号
                </a>
                <a target="_blank">© 2024 haimin</a>
            </div>
        </footer>
    );
}
