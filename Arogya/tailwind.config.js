import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        funnel: ['FunnelSans', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        specialGothic: ['SpecialGothicExpandedOne', 'sans-serif'],
        plusjakarta: ['PlusJakartaSans', 'sans-serif'],
      },
      screens: {
        xs: '850px',
        xxs: '480px',
      },
      animation: {
        pulse1: 'moveY 25s ease-in-out infinite',
        pulse2: 'moveX 35s ease-in-out infinite',
        pulse3: 'spin 40s linear infinite',
      },
      keyframes: {
        moveY: {
          '0%, 100%': { transform: 'translateY(-50%)' },
          '50%': { transform: 'translateY(20%)' },
        },
        moveX: {
          '0%, 100%': { transform: 'translateX(-50%)' },
          '50%': { transform: 'translateX(30%)' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};

module.exports = config;
