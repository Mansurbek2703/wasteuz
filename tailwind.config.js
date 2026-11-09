/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0284c7', // official WASTE-UZ blue
          'blue-dark': '#0369a1',
          'blue-light': '#38bdf8',
          green: '#16a34a', // official WASTE-UZ green
          'green-dark': '#15803d',
          'green-light': '#22c55e',
          amber: '#f59e0b',
          navy: '#0f172a',
          slate: '#1e293b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Source Serif 4', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
