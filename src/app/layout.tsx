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
        <html lang="zh-Hans-CN" className="max-[750px]:scale-50 max-[750px]:h-[200%] max-[750px]:overflow-hidden">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
                />
            </head>
            <SiteAnalytics></SiteAnalytics>
            <body
                className={`${inter.className} relative flex justify-center min-h-screen h-full bg-[#E0E9E2] max-[750px]:-translate-y-[100vh]`}
            >
                <Aside className="sticky top-0 z-50 min-h-screen h-full">
                    <MyInf className="max-lg:hidden"></MyInf>
                    <Links></Links>
                </Aside>
                <div className="flex flex-col h-full">
                    <Navbar className="sticky w-[1280px] min-w-[320px] top-0 z-50 max-2xl:w-[960px] max-xl:w-[810px] max-lg:w-[690px]"></Navbar>
                    <main className="top-14 flex flex-1 w-full h-full min-h-[calc(100vh-56px)] max-w-[1280px] max-2xl:w-[960px] max-xl:w-[810px] max-lg:w-[690px]">
                        <div className="flex flex-col flex-1 bg-[#f5f9f6] w-full px-6 pt-6 overflow-scroll">
                            {children}
                            <Footer></Footer>
                        </div>
                        <Aside className="max-xl:hidden">
                            <SiteInf></SiteInf>
                        </Aside>
                    </main>
                </div>
            </body>
        </html>
    );
}
