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
        [rootElement?.classList],
    );

    useLayoutEffect(() => {
        setRootElement(document.documentElement);
    }, []);

    useLayoutEffect(() => {
        if (rootElement) applyCustomDarkModeSettings();
    }, [applyCustomDarkModeSettings, rootElement]);

    return (
        <div
            className="flex items-center cursor-pointer p-2 text-sm"
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
