import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: undefined,
        },
        sitemap: 'http://roadto.top/sitemap.xml',
    };
}
