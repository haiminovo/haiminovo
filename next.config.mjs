/** @type {import('next').NextConfig} */
import { withContentlayer } from 'next-contentlayer2';

const nextConfig = {
	output: 'export', // ssg
	trailingSlash: true, // 动态路由刷新问题
	images: {
		loader: 'akamai',
		path: '',
		unoptimized: true,
	},
};

export default withContentlayer(nextConfig);
