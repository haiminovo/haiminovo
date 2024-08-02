import type { Config } from 'tailwindcss';

export const generateColor = (str: string, mode: 'dark' | 'light' = 'light') => {
    let basicColor = hexToRgb(str);
    if (!basicColor) return;
    if (mode === 'dark') basicColor = basicColor.map((item) => item - 150);
    const stepArr = basicColor.map((item) =>
        mode === 'dark' ? (item / 10).toFixed(0) : ((255 - item) / 10).toFixed(0)
    );
    return new Array(10).fill(undefined).map((item, index) => {
        const targetColor = basicColor.map((_item, _index) => {
            return mode === 'dark'
                ? _item - index * +stepArr[_index] < 0
                    ? 0
                    : _item - index * +stepArr[_index]
                : _item + index * +stepArr[_index] > 255
                ? 255
                : _item + index * +stepArr[_index];
        });
        return `rgb(${targetColor[0]},${targetColor[1]},${targetColor[2]})`;
    });
};

const hexToRgb = (str: string) => {
    let hexs = null;
    let reg = /^\#?[0-9A-Fa-f]{6}$/;
    if (!reg.test(str)) return alert('色值不正确');
    str = str.replace('#', ''); // 去掉#
    hexs = str.match(/../g); // 切割成数组 409EFF => ['40','9E','FF']
    // 将切割的色值转换为16进制
    return hexs?.map((item) => parseInt(item, 16)); // 返回rgb色值[64, 158, 255]
};

export const basicColor = '#dfe9e2';
const themeColors: any = {};
generateColor(basicColor)?.forEach((item, index) => (themeColors[`custom-color-${index + 1}`] = item));
generateColor(basicColor, 'dark')?.forEach((item, index) => (themeColors[`custom-color-dark-${index + 1}`] = item));
const config: Config = {
    darkMode: ['selector'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            'font-light': '#5a6a7a',
            'font-normal': '#3a4a5a',
            'font-strong': '#1a2a3a',
            'font-light-dark': 'rgba(255,255,255,0.9)',
            'font-normal-dark': 'rgba(255,255,255,0.7)',
            'font-strong-dark': 'rgba(255,255,255,0.5)',
            ...themeColors,
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
};
export default config;
