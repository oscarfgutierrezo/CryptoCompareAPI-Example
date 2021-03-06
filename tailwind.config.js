/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './public/js/classes/UI.js'],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      'sans': 'Roboto',
    },
    extend: {
      screens: {
        'xs': '425px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
