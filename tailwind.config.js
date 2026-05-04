/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        visly: {
          dark: '#0B1120',    // Very dark blue/black for backgrounds
          navy: '#1B2A4E',    // Primary deep blue
          blue: '#3B82F6',    // Bright tech blue
          cyan: '#06B6D4',    // Cyan accent
          teal: '#14B8A6',    // Teal accent
          gray: '#F3F4F6',    // Light gray background
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
