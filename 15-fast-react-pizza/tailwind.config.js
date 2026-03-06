/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		// these overwrites the native tailwind fontFamily theme, if you want to add - put it on the extend
		fontFamily: {
			sans: 'Roboto Mono, monospace',
		},
		extend: {
			// this is just testing the extending of tailwind CSS color palette
			colors: {
				pizza: '#123456',
			},
			fontSize: {
				huge: ['80rem', { lineHeight: '1' }],
			},
			height: {
				screen: '100dvh',
			},
		},
	},
	plugins: [],
};
