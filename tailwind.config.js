/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/**/*.{edge,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '##fff7ed',
          100: '##ffedd5',
          200: '##fed7aa',
          300: '##fdba74',
          400: '##fb923c',
          500: '##f97316',
          600: '##ea580c',
          700: '##c2410c',
          800: '##9a3412',
          900: '##7c2d12',
          950: '##431407',
        },
      },
    },
  },
  plugins: [],
}
