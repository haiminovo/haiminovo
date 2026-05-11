import type { Metadata, Viewport } from 'next';
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
import { getCanonicalUrl, getSeoImage, siteConfig } from '@/lib/seo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.title,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [...siteConfig.keywords],
	applicationName: siteConfig.name,
	authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
	creator: siteConfig.author.name,
	publisher: siteConfig.name,
	category: 'technology',
	alternates: {
		canonical: getCanonicalUrl('/'),
	},
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	icons: {
		icon: [
			{ url: '/favicon.ico', sizes: 'any' },
			{ url: '/icon.png', type: 'image/png', sizes: '512x512' },
		],
		apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
	},
	openGraph: {
		type: 'website',
		locale: siteConfig.locale,
		url: getCanonicalUrl('/'),
		siteName: siteConfig.name,
		title: siteConfig.title,
		description: siteConfig.description,
		images: [
			{
				url: getSeoImage(),
				width: 1200,
				height: 630,
				alt: `${siteConfig.name} 的站点预览图`,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.title,
		description: siteConfig.description,
		images: [getSeoImage()],
		creator: `@${siteConfig.author.handle}`,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},
	verification: {
		other: {
			'baidu-site-verification': 'codeva-IDE8CkNHDF',
			'msvalidate.01': '078ED44B766D08ACBE91D7855C8966BF',
		},
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	minimumScale: 1,
	maximumScale: 10,
	userScalable: true,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh-Hans-CN" className="relative flex justify-center">
			<head />
			<body
				className={`${inter.className} circuit-texture-canvas bg-custom-color-7 text-font-normal dark:bg-custom-color-dark-7 dark:text-font-normal-dark flex min-h-screen w-full min-w-80 flex-col items-center`}
			>
				<SiteAnalytics></SiteAnalytics>
				<Navbar className="dark:border-custom-color-dark-7 top-0 z-10 h-10 w-full shadow-sm"></Navbar>
				<main className="flex h-full w-full max-w-[1440px] justify-center gap-2 px-3 max-xl:px-2 max-lg:px-0">
					<Aside className="h-full min-h-[calc(100vh-40px)] max-lg:hidden">
						<div className="flex h-full w-full flex-1 flex-col gap-3 pt-5">
							<MyInf></MyInf>
							<Tags className="hidden"></Tags>
							<SiteInf></SiteInf>
							<PageNavigator className="hidden"></PageNavigator>
						</div>
					</Aside>
					<div className="flex w-full flex-1 flex-col">
						<div className="no-scrollbar flex h-full w-full flex-col">
							{children}
						</div>
					</div>
					<Aside className="max-xl:hidden">
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
