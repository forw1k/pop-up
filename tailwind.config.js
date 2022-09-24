/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'mobile': '100px',
      'tablet': '500px',
      'desktop': '769px',
    },
    extend: {
      width: {
        '600': '41.8rem',
        '31-5-p': '31.5%',
        '66-p': '66%',
      },
      minHeight: {
        '100px': '100px',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
