module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	mode: "jit",
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			display: ["Open Sans", "cursive"],
			body: ["Comfortaa", "cursive"],
		},
		extend: {
			screens: {
				mf: "320px",
			},
			colors: {
				red1: "#663333",
				green1: "#2E443B",
			},
			keyframes: {
				"slide-in": {
					"0%": {
						"-webkit-transform": "translateX(120%)",
						transform: "translateX(120%)",
					},
					"100%": {
						"-webkit-transform": "translateX(0%)",
						transform: "translateX(0%)",
					},
				},
			},
			animation: {
				"slide-in": "slide-in 0.5s ease-out",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms")],
};

