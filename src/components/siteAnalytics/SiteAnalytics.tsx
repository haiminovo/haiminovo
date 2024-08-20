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
			<Script
				id="baiduAnalytics"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
            var _hmt = _hmt || [];
            (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?7a9f906e5caf3a001a3df333c920d23c";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
            })();
          `,
				}}
			/>
		</>
	);
};
export default SiteAnalytics;
