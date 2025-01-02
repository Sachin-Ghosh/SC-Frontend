/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  './pages/**/*.{js,jsx}',
	  './components/**/*.{js,jsx}',
	  './app/**/*.{js,jsx}',
	  './src/**/*.{js,jsx}',
	  ],
	theme: {
	  container: {
		center: true,
		padding: "2rem",
		screens: {
		  "2xl": "1400px",
		},
	  },
	  extend: {
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		  shimmer: "shimmer 2s linear infinite",
		},
		keyframes: {
		  "accordion-down": {
			from: { height: 0 },
			to: { height: "var(--radix-accordion-content-height)" },
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: 0 },
		  },
		  shimmer: {
			from: {
			  backgroundPosition: "0 0",
			},
			to: {
			  backgroundPosition: "-200% 0",
			},
		  },
		},
	  },
	plugins: [
		require("tailwindcss-animate"),
		 require("daisyui")
		],
		daisyui: {
			themes: [
			  {
				mytheme: {
				  primary: "#FF6B35",
				  secondary: "#1A1A1A",
				  accent: "#37CDBE",
				  neutral: "#3D4451",
				  "base-100": "#FFFFFF",
				  info: "#3ABFF8",
				  success: "#36D399",
				  warning: "#FBBD23",
				  error: "#F87272",
				},
			  },
			  "light",
			],
			darkTheme: "dark",
		  },
  }
}
  
  