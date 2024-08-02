import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/NavBar';
import Aside from '@/components/aside/Aside';
import Links from '@/components/links/Links';
import MyInf from '@/components/myInf/MyInf';
import SiteInf from '@/components/siteInf/SiteInf';
import SiteAnalytics from '@/components/siteAnalytics/SiteAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: '野猪巢穴',
    description: 'haimin的个人网站',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-Hans-CN">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1, maximum-scale=10"
                />
            </head>
            <SiteAnalytics></SiteAnalytics>
            <body
                className={`${inter.className} relative flex justify-center min-h-screen h-full
                bg-custom-color-1 text-font-normal
                dark:bg-custom-color-dark-1 dark:text-font-normal-dark
                 `}
            >
                <div className="flex w-[1440px]">
                    <Aside
                        className="sticky top-0 flex flex-col justify-between z-50 h-screen
                        bg-custom-color-4 dark:bg-custom-color-dark-4 max-[768px]:hidden"
                    >
                        <div>
                            <MyInf></MyInf>
                            <Links className="flex-col px-3"></Links>
                        </div>
                        <SiteInf></SiteInf>
                    </Aside>
                    <div className="flex flex-1 flex-col h-full">
                        <Navbar className="sticky w-full top-0 z-50 h-14 max-md:h-10"></Navbar>
                        <main
                            className="top-14 flex flex-1 w-full h-full 
                                min-h-[calc(100vh-56px)]"
                        >
                            <div className="flex flex-col flex-1 justify-between ">
                                <div
                                    className="flex flex-col flex-1 w-full pt-6 no-scrollbar px-6
                                    bg-custom-color-7 dark:bg-custom-color-dark-7 max-[768px]:overflow-scroll max-md:px-2"
                                >
                                    {children}
                                </div>
                                <Footer></Footer>
                            </div>
                            <Aside className="bg-custom-color-4 dark:bg-custom-color-dark-4 max-xl:hidden">
                                <div></div>
                                {/* <SiteInf></SiteInf> */}
                            </Aside>
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
