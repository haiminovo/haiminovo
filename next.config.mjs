/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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

export default nextConfig;
