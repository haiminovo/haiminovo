import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/NavBar';
import Aside from '@/components/aside/Aside';
import Links from '@/components/links/Links';
import Menu from '@/components/menu/Menu';
import MyInf from '@/components/myInf/MyInf';
import { AntdRegistry } from '@ant-design/nextjs-registry';

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
        <html lang="en">
            <body className={`${inter.className} relative flex justify-center min-h-screen h-full bg-[#E0E9E2]`}>
                <AntdRegistry>
                    <Aside className="sticky top-0 z-50 h-screen max-sm:hidden">
                        <MyInf className="max-lg:hidden"></MyInf>
                        <Links></Links>
                    </Aside>
                    <div className="flex flex-col h-full">
                        <Navbar className="sticky w-[1280px] min-w-[320px] top-0 z-50 max-2xl:w-[960px] max-xl:w-[810px] max-lg:w-[660px] max-md:w-[600px] max-sm:w-[425px]"></Navbar>
                        <main className="top-14 flex flex-1 min-h-[calc(100vh-56px)] max-w-[1280px] w-full max-2xl:w-[960px] max-xl:w-[810px] max-lg:w-[660px] max-md:w-[600px] max-sm:w-[425px]">
                            <div className="flex flex-col flex-1 bg-[#f5f9f6] w-full px-6 pt-6">
                                {children}
                                <Footer></Footer>
                            </div>
                            <Aside className="max-xl:hidden">
                                <Menu></Menu>
                            </Aside>
                        </main>
                    </div>
                </AntdRegistry>
            </body>
        </html>
    );
}
