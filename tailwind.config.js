/** @type {import('tailwindcss').Config} */
module.exports = {
	// darkMode ni olib tashlash
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)'
		},
		colors: {
		  // Aniq rang qiymatlarini berish
		  background: '#FFFFFF',
		  foreground: '#0A0A0A',
		  card: {
			DEFAULT: '#FFFFFF',
			foreground: '#0A0A0A'
		  },
		  popover: {
			DEFAULT: '#FFFFFF',
			foreground: '#0A0A0A'
		  },
		  primary: {
			DEFAULT: '#171717',
			foreground: '#FAFAFA'
		  },
		  secondary: {
			DEFAULT: '#F5F5F5',
			foreground: '#171717'
		  },
		  muted: {
			DEFAULT: '#F5F5F5',
			foreground: '#737373'
		  },
		  accent: {
			DEFAULT: '#F5F5F5',
			foreground: '#171717'
		  },
		  destructive: {
			DEFAULT: '#EF4444',
			foreground: '#FAFAFA'
		  },
		  border: '#E5E5E5',
		  input: '#E5E5E5',
		  ring: '#171717',
		  chart: {
			'1': '#F97316',
			'2': '#14B8A6',
			'3': '#0F172A',
			'4': '#EAB308',
			'5': '#F97316'
		  }
		}
	  }
	},
	plugins: [require("tailwindcss-animate")],
  }