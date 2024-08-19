import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/NavBar';
import Aside from '@/components/aside/Aside';
import MyInf from '@/components/myInf/MyInf';
import SiteInf from '@/components/siteInf/SiteInf';
import SiteAnalytics from '@/components/siteAnalytics/SiteAnalytics';
import Tags from '@/components/tags/Tags';
import PageNavigator from '@/components/pageNavigator/PageNavigator';
import BackToTop from '@/components/backToTop/BackToTop';
import Footer from '@/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: '巅峰之路-haimin的互联网自留地',
	description: '一个记录开发收获和日常生活的个人站点,主要涉及前端开发,web技术相关内容',
	keywords: ['haimin', 'haiminovo', 'road to top', 'road to the top', '巅峰之路', '巅峰路', '前端'],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh-Hans-CN" className="flex justify-center">
			<head>
				<meta
					name="viewport"
					content="width=device-width, user-scalable=1, initial-scale=1.0, minimum-scale=1, maximum-scale=10"
				/>
			</head>
			<SiteAnalytics></SiteAnalytics>
			<body
				className={`${inter.className} flex h-full min-h-screen w-full min-w-80 flex-col items-center bg-custom-color-7 text-font-normal dark:bg-custom-color-dark-7 dark:text-font-normal-dark`}
			>
				<Navbar className="top-0 z-10 h-14 w-full"></Navbar>
				<main className="top-14 flex min-h-[calc(100vh-88px)] w-full max-w-[1440px] justify-center">
					<Aside className="sticky top-14 flex justify-between bg-custom-color-7 py-6 max-md:hidden dark:bg-custom-color-dark-7">
						<div className="flex w-full flex-col gap-3">
							<MyInf></MyInf>
							<Tags className="lg:hidden"></Tags>
							<PageNavigator className="sticky top-16 lg:hidden"></PageNavigator>
						</div>
						<div className="flex w-full flex-col gap-3">
							<SiteInf></SiteInf>
						</div>
					</Aside>
					<div className="flex w-full flex-1 flex-col">
						<div className="no-scrollbar flex h-full w-full flex-col bg-custom-color-7 dark:bg-custom-color-dark-7">
							{children}
						</div>
					</div>
					<Aside className="bg-custom-color-7 max-lg:hidden dark:bg-custom-color-dark-7">
						<Tags></Tags>
						<PageNavigator></PageNavigator>
						<BackToTop></BackToTop>
					</Aside>
				</main>
				<Footer></Footer>
			</body>
		</html>
	);
}
