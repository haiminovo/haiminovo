'use client';
import { removeLS, getLS, setLS } from '@/utils';
import { SunOutlined } from '@ant-design/icons';
import React, { useLayoutEffect, useState } from 'react';

interface IProps {
    className?: string;
}

export default function DarkModeBtn(props: IProps) {
    const { className } = props;
    const [rootElement, setRootElement] = useState<any>(); // <html>
    const darkModeStorageKey = 'user-color-scheme'; // 作为 localStorage 的 key

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
        console.log(res);

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
                rootElement?.classList.remove('dark');
            } else {
                rootElement?.classList.add('dark');
            }
        } else {
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
            className={`flex ${className}`}
            onClick={() => {
                applyCustomDarkModeSettings(toggleCustomDarkMode());
            }}
        >
            <SunOutlined />
        </div>
    );
}
