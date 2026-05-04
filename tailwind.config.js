/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      colors: {
        clay: '#C4A882',
        slate: '#2C3E50',
        cream: '#FAF7F2',
        terra: '#A0522D',
        moss: '#4A5240',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        tilegallery: {
          primary: '#C4A882',
          secondary: '#4A5240',
          accent: '#A0522D',
          neutral: '#2C3E50',
          'base-100': '#FAF7F2',
          'base-200': '#F0EBE3',
          'base-300': '#E5DDD3',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
};
