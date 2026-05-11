const hexToRgb = (str) => {
	let hexs = null;
	const reg = /^\#?[0-9A-Fa-f]{6}$/;
	if (!reg.test(str)) {
		throw new Error('Invalid color value in tailwind.config.mjs');
	}
	str = str.replace('#', '');
	hexs = str.match(/../g);
	return hexs?.map((item) => parseInt(item, 16));
};

const generateColor = (str, mode = 'light') => {
	let basicColor = hexToRgb(str);
	if (!basicColor) return [];
	if (mode === 'dark') basicColor = basicColor.map((item) => item - 100);
	const stepArr = basicColor.map((item) => (mode === 'dark' ? (item / 10).toFixed(0) : ((255 - item) / 10).toFixed(0)));
	return new Array(10).fill(undefined).map((_, index) => {
		const targetColor = basicColor.map((item, colorIndex) => {
			return mode === 'dark'
				? item - index * +stepArr[colorIndex] < 0
					? 0
					: item - index * +stepArr[colorIndex]
				: item + index * +stepArr[colorIndex] > 255
					? 255
					: item + index * +stepArr[colorIndex];
		});
		return `rgb(${targetColor[0]},${targetColor[1]},${targetColor[2]})`;
	});
};

const basicColor = '#e2e5e8';
const themeColors = {};

generateColor(basicColor).forEach((item, index) => {
	themeColors[`custom-color-${index + 1}`] = item;
});

generateColor(basicColor, 'dark').forEach((item, index) => {
	themeColors[`custom-color-dark-${index + 1}`] = item;
});

/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'font-light': '#5a6a7a',
				'font-normal': '#3a4a5a',
				'font-strong': '#1a2a3a',
				'font-light-dark': 'rgba(255,255,255,0.9)',
				'font-normal-dark': 'rgba(255,255,255,0.7)',
				'font-strong-dark': 'rgba(255,255,255,0.5)',
				...themeColors,
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [],
};

export default config;
