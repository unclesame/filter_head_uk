/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0f9f4',
          100: '#daf1e4',
          200: '#b8e3cc',
          300: '#88ceab',
          400: '#55b385',
          500: '#339968',
          600: '#237a52',
          700: '#1c6244',
          800: '#194e38',
          900: '#15402f',
          950: '#0b241a',
        },
        ocean: {
          50: '#eff8ff',
          100: '#dbeffe',
          200: '#bfe3fe',
          300: '#93d2fd',
          400: '#60b8fa',
          500: '#3b99f5',
          600: '#257bea',
          700: '#1d64d7',
          800: '#1e51ae',
          900: '#1e4689',
          950: '#172c54',
        },
        sand: {
          50: '#faf8f5',
          100: '#f3efe8',
          200: '#e6ddd0',
          300: '#d5c6b0',
          400: '#c2ab8e',
          500: '#b39575',
          600: '#a68367',
          700: '#8a6c56',
          800: '#71594a',
          900: '#5d4a3e',
          950: '#312620',
        },
      },
    },
  },
  plugins: [],
};
