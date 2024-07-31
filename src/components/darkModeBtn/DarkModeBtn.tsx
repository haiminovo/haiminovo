'use client';
import { removeLS, getLS, setLS } from '@/utils';
import React, { useLayoutEffect } from 'react';

interface IProps {
    className?: string;
}

export default function DarkModeBtn(props: IProps) {
    const { className } = props;
    const rootElement = document.documentElement; // <html>
    const darkModeStorageKey = 'user-color-scheme'; // 作为 localStorage 的 key
    const getModeFromCSSMediaQuery = () => {
        const res = rootElement.classList.contains('dark');
        console.log(res);

        return res ? 'dark' : 'light';
    };

    const resetRootDarkModeAttributeAndLS = () => {
        rootElement.classList.remove('dark');
        //removeLS(darkModeStorageKey);
    };

    const validColorModeKeys: any = {
        dark: true,
        light: true,
    };

    const applyCustomDarkModeSettings = (mode?: any) => {
        // 接受从「开关」处传来的模式，或者从 localStorage 读取
        const currentSetting = mode || getLS(darkModeStorageKey);
        if (currentSetting === getModeFromCSSMediaQuery()) {
            // 当用户自定义的显示模式和 prefers-color-scheme 相同时重置、恢复到自动模式
            resetRootDarkModeAttributeAndLS();
        } else if (validColorModeKeys[currentSetting]) {
            if (currentSetting === 'light') {
                rootElement.classList.remove('dark');
            } else {
                rootElement.classList.add('dark');
            }
        } else {
            // 首次访问或从未使用过开关、localStorage 中没有存储的值，currentSetting 是 null
            // 或者 localStorage 被篡改，currentSetting 不是合法值
            resetRootDarkModeAttributeAndLS();
        }
    };

    const invertDarkModeObj: any = {
        dark: 'light',
        light: 'dark',
    };

    const toggleCustomDarkMode = () => {
        let currentSetting: any = getLS(darkModeStorageKey);

        if (validColorModeKeys[currentSetting]) {
            // 从 localStorage 中读取模式，并取相反的模式
            currentSetting = invertDarkModeObj[currentSetting];
        } else if (currentSetting === null) {
            // localStorage 中没有相关值，或者 localStorage 抛了 Error
            // 从 CSS 中读取当前 prefers-color-scheme 并取相反的模式
            currentSetting = invertDarkModeObj[getModeFromCSSMediaQuery()];
        } else {
            // 不知道出了什么幺蛾子，比如 localStorage 被篡改成非法值
            return; // 直接 return;
        }
        // 将相反的模式写入 localStorage
        setLS(darkModeStorageKey, currentSetting);

        return currentSetting;
    };

    // 当页面加载时，将显示模式设置为 localStorage 中自定义的值（如果有的话）
    useLayoutEffect(() => {
        //console.log('/////', window.matchMedia('(prefers-color-scheme: dark)').matches);
        applyCustomDarkModeSettings();
    }, []);

    return (
        <div
            className={`flex h-36 ${className}`}
            onClick={() => {
                applyCustomDarkModeSettings(toggleCustomDarkMode());
            }}
        >
            123
        </div>
    );
}
