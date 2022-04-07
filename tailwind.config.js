module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: { display: ['group-hover'] },
	},
	plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar-hide')],
};
