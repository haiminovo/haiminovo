'use client';
import { getLS } from '@/utils';
import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

export default function Comment() {
	const [theme, setTheme] = useState(getLS('user-color-scheme') || 'light');
	const handleThemeChange = function (e: any) {
		setTheme(e.newValue);
	};
	const sign = new AbortController().signal;
	useEffect(() => {
		// 监听自定义事件切换主题
		window.addEventListener('setThemeColor', handleThemeChange);
		return () => {
			window.removeEventListener('setThemeColor', handleThemeChange, true);
		};
	}, []);
	return (
		<Giscus
			id="comments"
			repo="haiminovo/haiminovo"
			repoId="R_kgDOMPKLVA"
			category="Announcements"
			categoryId="DIC_kwDOMPKLVM4ChGRd"
			mapping="pathname"
			reactionsEnabled="1"
			emitMetadata="0"
			inputPosition="top"
			theme={theme}
			lang="zh-CN"
			loading="lazy"
		/>
	);
}
