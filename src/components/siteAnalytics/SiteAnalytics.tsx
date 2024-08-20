'use client';
import Script from 'next/script';
const SiteAnalytics = () => {
	return (
		<>
			<Script
				id="googleAnalytics"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NNFGZDLC24', {
            page_path: window.location.pathname,
            });
          `,
				}}
			/>
		</>
	);
};
export default SiteAnalytics;
