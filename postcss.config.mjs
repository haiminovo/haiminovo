import autoprefixer from 'autoprefixer';

/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
		// cssnano: {},
	},
};

export default config;
