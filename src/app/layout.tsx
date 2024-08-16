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

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: '巅峰之路',
	description: 'haimin的巅峰之路',
	keywords: ['haimin', 'haiminovo', 'road to top', 'road to the top', '巅峰之路', '巅峰路', '前端'],
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
					content="width=device-width, user-scalable=1, initial-scale=1.0, minimum-scale=1, maximum-scale=10"
				/>
			</head>
			<SiteAnalytics></SiteAnalytics>
			<body
				className={`${inter.className} relative flex h-full min-h-screen min-w-80 justify-center bg-custom-color-1 text-font-normal dark:bg-custom-color-dark-1 dark:text-font-normal-dark`}
			>
				<div className="flex w-[1440px] shadow-xl">
					<Aside className="no-scrollbar sticky top-0 z-50 flex h-screen flex-col justify-between overflow-auto bg-custom-color-4 max-md:hidden dark:bg-custom-color-dark-4">
						<div className="flex w-full flex-col gap-3">
							<MyInf></MyInf>
							<Tags className="lg:hidden"></Tags>
							<PageNavigator className="lg:hidden"></PageNavigator>
						</div>
						<div className="flex w-full flex-col gap-3">
							<SiteInf></SiteInf>
						</div>
					</Aside>
					<div className="flex h-full w-full flex-col">
						<Navbar className="top-0 z-10 h-14"></Navbar>
						<main className="top-14 flex h-full min-h-[calc(100vh-56px)] w-full">
							<div className="flex h-full w-full flex-col">
								<div className="no-scrollbar flex h-full w-full flex-col bg-custom-color-7 dark:bg-custom-color-dark-7">
									{children}
								</div>
							</div>
							<Aside className="bg-custom-color-4 max-lg:hidden dark:bg-custom-color-dark-4">
								<Tags></Tags>
								<PageNavigator></PageNavigator>
								<BackToTop></BackToTop>
							</Aside>
						</main>
					</div>
				</div>
			</body>
		</html>
	);
}
