/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rcn-blue': '#006cfa',
        'neutral-white': '#f9f9f9'
      }
    },
  },
  plugins: [],
}

