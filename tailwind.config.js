/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx,jsx}', './components/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
