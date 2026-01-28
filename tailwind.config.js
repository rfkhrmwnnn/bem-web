/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7', // Primary Brand Color
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e', // Deep Sea
          950: '#082f49',
        },
        cloud: {
          light: '#F8FAFC',
          DEFAULT: '#E2E8F0',
          dark: '#94A3B8'
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.7)',
          dark: 'rgba(15, 23, 42, 0.6)'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: [],
}
