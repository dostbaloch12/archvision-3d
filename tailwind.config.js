/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#041B13',
          900: '#062B1F',
          800: '#0A3D2B',
          700: '#07553B',
          600: '#0B6B4A',
          500: '#108A61',
        },
        olive: {
          500: '#B8C053',
          400: '#CED46A',
          300: '#DDE08F',
        },
        sand: {
          100: '#EAF3EC',
          300: '#B9CCC0',
          400: '#8FAA9B',
        },
        plum: {
          950: '#1E1230',
          900: '#2E1A47',
          800: '#3D2B6B',
          700: '#4E3A85',
          600: '#654EA3',
          500: '#7C5FB0',
          400: '#9370BC',
          300: '#B489C2',
        },
        blush: {
          600: '#D2A2C8',
          500: '#E0A9CA',
          400: '#EAAFCB',
          300: '#F0C4D8',
          200: '#F6DCE8',
          100: '#FBF0F5',
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}