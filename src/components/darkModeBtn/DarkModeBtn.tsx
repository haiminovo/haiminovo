'use client';

import { getLS, setLS } from '@/utils';
import { MoonFilled, SunFilled } from '@ant-design/icons';
import React, { useLayoutEffect, useState } from 'react';

interface IProps {
	className?: string;
}

type ThemeMode = 'dark' | 'light';

interface ThemeChangeEvent extends Event {
	newValue?: ThemeMode;
}

const DARK_MODE_STORAGE_KEY = 'user-color-scheme';

export default function DarkModeBtn(props: IProps) {
	const [isDark, setIsDark] = useState(false);

	const applyTheme = (mode: ThemeMode) => {
		document.documentElement.classList.toggle('dark', mode === 'dark');
		setIsDark(mode === 'dark');
	};

	useLayoutEffect(() => {
		const initialTheme = getLS(DARK_MODE_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
		applyTheme(initialTheme);

		const originalSetItem = window.localStorage.setItem;
		window.localStorage.setItem = function (key, newValue) {
			if (key === DARK_MODE_STORAGE_KEY) {
				const setThemeColor = new Event('setThemeColor') as ThemeChangeEvent;
				setThemeColor.newValue = newValue === 'dark' ? 'dark' : 'light';
				window.dispatchEvent(setThemeColor);
			}
			originalSetItem.apply(this, [key, newValue]);
		};

		const handleThemeChange = (event: Event) => {
			const nextTheme = (event as ThemeChangeEvent).newValue === 'dark' ? 'dark' : 'light';
			applyTheme(nextTheme);
		};

		window.addEventListener('setThemeColor', handleThemeChange);

		return () => {
			window.removeEventListener('setThemeColor', handleThemeChange);
			window.localStorage.setItem = originalSetItem;
		};
	}, []);

	return (
		<button
			type="button"
			aria-label={isDark ? '切换到浅色模式' : '切换到深色模式'}
			className="flex cursor-pointer items-center p-2 text-sm"
			onClick={() => {
				const nextTheme: ThemeMode = isDark ? 'light' : 'dark';
				setLS(DARK_MODE_STORAGE_KEY, nextTheme);
				applyTheme(nextTheme);
			}}
			{...props}
		>
			{isDark ? <SunFilled /> : <MoonFilled />}
		</button>
	);
}
