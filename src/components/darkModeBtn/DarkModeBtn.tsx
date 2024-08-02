'use client';
import { removeLS, getLS, setLS } from '@/utils';
import { MoonFilled, MoonOutlined, SunOutlined } from '@ant-design/icons';
import React, { useLayoutEffect, useState } from 'react';

interface IProps {
    className?: string;
}

export default function DarkModeBtn(props: IProps) {
    const { className } = props;
    const [rootElement, setRootElement] = useState<any>();
    const [isDark, setIsDark] = useState(false);
    const darkModeStorageKey = 'user-color-scheme';

    const validColorModeKeys: any = {
        dark: true,
        light: true,
    };

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
        if (validColorModeKeys[currentSetting]) {
            currentSetting = invertDarkModeObj[currentSetting];
        } else if (currentSetting === null) {
            currentSetting = invertDarkModeObj[getModeFromClassList()];
        } else {
            return;
        }
        setLS(darkModeStorageKey, currentSetting);

        return currentSetting;
    };

    const applyCustomDarkModeSettings = (mode?: any) => {
        const currentSetting = mode || getLS(darkModeStorageKey);
        if (validColorModeKeys[currentSetting]) {
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
    };

    useLayoutEffect(() => {
        setRootElement(document.documentElement);
    }, []);

    useLayoutEffect(() => {
        if (rootElement) applyCustomDarkModeSettings();
    }, [rootElement]);

    return (
        <div
            className={`flex items-center cursor-pointer text-sm ${className}`}
            onClick={() => {
                setIsDark(!isDark);
                applyCustomDarkModeSettings(toggleCustomDarkMode());
            }}
        >
            {isDark ? <SunOutlined /> : <MoonFilled />}
        </div>
    );
}
