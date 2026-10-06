/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "SF Pro Display",
          "Inter",
          "Segoe UI",
          "Helvetica Neue",
          "sans-serif"
        ],
      },
      colors: {
        apple: {
          blue: '#0071e3',
          'blue-dark': '#0077ed',
          gray: '#86868b',
          'gray-light': '#f5f5f7',
          'card-light': '#ffffff',
          'card-dark': '#1c1c1e',
          'bg-dark': '#000000',
        }
      },
      boxShadow: {
        'apple': '0 4px 24px -1px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'apple-hover': '0 8px 32px -2px rgba(0, 0, 0, 0.10), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'apple-dark': '0 4px 24px -1px rgba(0, 0, 0, 0.4), 0 2px 8px -1px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
