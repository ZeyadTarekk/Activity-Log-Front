/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#616161',
        'custom-gray-light': '#F5F5F5',
        'custom-gray-light-1': '#F5F5F5',
        'custom-gray-light-2': '#929292',
        'custom-black': '#1C1C1C',
      },
    },
  },
  plugins: [],
}

