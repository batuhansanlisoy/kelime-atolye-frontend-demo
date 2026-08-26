/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
  ],
  // theme: {
  //   extend: {
  //     colors: {
  //       patlican: '#2E0B2E'
  //     },
  //     fontFamily: {
  //       sans: ['"PT Sans"', 'sans-serif'],
  //     },
  //   },
  // },
  plugins: [],
}

