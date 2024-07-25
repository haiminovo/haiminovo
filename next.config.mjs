/** @type {import('next').NextConfig} */
import { withContentlayer } from 'next-contentlayer'

const nextConfig = {
    output: 'export',
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

export default withContentlayer(nextConfig)