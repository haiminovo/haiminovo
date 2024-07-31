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
        <html lang="zh-Hans-CN" className="max-[768px]:scale-50 max-[768px]:h-[200%] max-[768px]:overflow-hidden">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
            </head>
            <SiteAnalytics></SiteAnalytics>
            <body
                className={`${inter.className} relative flex justify-center min-h-screen h-full
                 bg-custom-color-1 text-font-normal
                 dark:bg-custom-color-dark-1 dark:text-font-normal-dark
                 max-[768px]:-translate-y-[100vh]`}
            >
                <Aside className="sticky top-0 z-50 min-h-screen h-full bg-custom-color-4 dark:bg-custom-color-dark-4">
                    <MyInf className="max-lg:hidden"></MyInf>
                    <Links></Links>
                </Aside>
                <div className="flex flex-col h-full">
                    <Navbar className="sticky w-[1280px] min-w-[320px] top-0 z-50 max-2xl:w-[960px] max-xl:w-[810px] max-lg:w-[708px]"></Navbar>
                    <main className="top-14 flex flex-1 w-full h-full min-h-[calc(100vh-56px)] max-w-[1280px] max-2xl:w-[960px] max-xl:w-[810px] max-lg:w-[708px]">
                        <div className="flex flex-col flex-1 bg-custom-color-7 dark:bg-custom-color-dark-7 w-full px-6 pt-6 no-scrollbar max-[768px]:overflow-scroll">
                            {children}
                            <Footer></Footer>
                        </div>
                        <Aside className="bg-custom-color-4 dark:bg-custom-color-dark-4 max-xl:hidden">
                            <SiteInf></SiteInf>
                        </Aside>
                    </main>
                </div>
            </body>
        </html>
    );
}
