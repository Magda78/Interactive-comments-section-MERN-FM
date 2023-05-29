/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [ './src/**/*.{js,jsx,ts,tsx}' ],
	theme: {
		colors: {
			background: '#F5F6FA',
			'component-background': '#ffffff',
			'dark-blue': '#334253',
			'grayish-blue': '#67727E',
			'light-grayish-blue': '#C5C6EF',
			'moderate-blue': '#5357B6',
			'soft-red': '#ED6368',
			'very-light-gray': '#F5F6FA',
			'light-gray': '#E9EBF0',
			'pale-red': '#FFB8BB',
			overlay: 'rgb(103, 114, 126,0.5)',
			white: '#ffffff'
		},
		fontFamily: {
			Rubik: [ 'Rubik' ]
		},
		extend: {}
	},
	plugins: []
};
