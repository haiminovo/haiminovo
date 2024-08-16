/** @type {import('next').NextConfig} */
import { withContentlayer } from 'next-contentlayer2';

const nextConfig = {
	output: 'export', // ssg
	trailingSlash: true, // 动态路由刷新问题
	images: {
		loader: 'akamai',
		path: '',
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'haiminovo.cn',
				port: '8088',
				pathname: '**',
			},
		],
	},
};

export default withContentlayer(nextConfig);
