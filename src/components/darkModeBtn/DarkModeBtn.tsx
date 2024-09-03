'use client';
import { removeLS, getLS, setLS } from '@/utils';
import { MoonFilled, SunFilled } from '@ant-design/icons';
import React, { useCallback, useLayoutEffect, useState } from 'react';

interface IProps {
	className?: string;
}

export default function DarkModeBtn(props: IProps) {
	const [rootElement, setRootElement] = useState<any>();
	const [isDark, setIsDark] = useState(false);
	const darkModeStorageKey = 'user-color-scheme';

	const invertDarkModeObj: any = {
		dark: 'light',
		light: 'dark',
	};

	const getModeFromClassList = () => {
		const res = rootElement?.classList.contains('dark');
		return res ? 'dark' : 'light';
	};

	const toggleCustomDarkMode = () => {
		let currentSetting: any = getLS(darkModeStorageKey);
		if (currentSetting) {
			currentSetting = invertDarkModeObj[currentSetting];
		} else if (currentSetting === null) {
			currentSetting = invertDarkModeObj[getModeFromClassList()];
		} else {
			return;
		}
		setLS(darkModeStorageKey, currentSetting);

		return currentSetting;
	};

	const applyCustomDarkModeSettings = useCallback(
		(mode?: any) => {
			const currentSetting = mode || getLS(darkModeStorageKey);
			if (currentSetting) {
				if (currentSetting === 'light') {
					setIsDark(false);
					rootElement?.classList.remove('dark');
				} else {
					rootElement?.classList.add('dark');
				}
			} else {
				setIsDark(true);
				rootElement?.classList.remove('dark');
				removeLS(darkModeStorageKey);
			}
		},
		[rootElement?.classList]
	);

	useLayoutEffect(() => {
		const orignSetItem = window.localStorage.setItem;
		window.localStorage.setItem = function (key, newValue) {
			if (key === 'user-color-scheme') {
				const setThemeColor: any = new Event('setThemeColor');
				setThemeColor.newValue = newValue;
				window.dispatchEvent(setThemeColor); // 抛出自定义事件切换主题
			}
			orignSetItem.apply(this, [key, newValue]);
		};
		setRootElement(document.documentElement);
		return () => {
			window.localStorage.setItem = orignSetItem;
		};
	}, []);

	useLayoutEffect(() => {
		if (rootElement) applyCustomDarkModeSettings();
	}, [applyCustomDarkModeSettings, rootElement]);

	return (
		<div
			className="flex cursor-pointer items-center p-2 text-sm"
			onClick={() => {
				setIsDark(!isDark);
				applyCustomDarkModeSettings(toggleCustomDarkMode());
			}}
			{...props}
		>
			{isDark ? <SunFilled /> : <MoonFilled />}
		</div>
	);
}
