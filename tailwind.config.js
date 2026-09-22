/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1ee',
          100: '#ffe4dd',
          200: '#fec8bb',
          300: '#fd9e88',
          400: '#fa6648',
          500: '#ee4b2b', // Striver classic orange-red accent
          600: '#db3214',
          700: '#b8230b',
          800: '#941e0d',
          900: '#7a1d10',
        },
        dark: {
          bg: '#0d1117',
          surface: '#161b22',
          card: '#1f242c',
          border: '#30363d',
          hover: '#262c36',
          text: '#e6edf3',
          muted: '#8b949e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-brand': '0 0 20px -5px rgba(238, 75, 43, 0.3)',
        'glow-success': '0 0 20px -5px rgba(34, 197, 94, 0.3)',
      }
    },
  },
  plugins: [],
}
