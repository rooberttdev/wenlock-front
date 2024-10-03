// tailwind.config.js

module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // ou 'media' ou 'class'
  theme: {
    extend: {
      colors: {
        primeiro: '#00AAC1',
        segundo: '#AACBC4',
        terceiro : '#0D1931',
        quarto : '#0290A4',
        quinto: '#0B2B25',
        sexto: '#021B1A'
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        'custom-menu': '7px 0px 6px #0000002C',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
