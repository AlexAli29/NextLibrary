
/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lora: ['var(--font-lora)'],
        montserrat: ['var(--font-montserrat)'],
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),

    // Or with a custom prefix:
    require('@headlessui/tailwindcss')({ prefix: 'ui' })
  ],
}