/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        'hero' : "url('https://tailwindcss.com/_next/static/media/blog-post-form-dark@90.5b274bea.jpg')",
        'heroLite' : "url('https://tailwindcss.com/_next/static/media/docs@tinypng.d9e4dcdc.png')"
      },
      animation: {
        'bookingsup' : 'translateup 1s ease-in-out',
        'popInWeather' : 'popIn 0.5s ease-in-out'
      },
      keyframes: {
        translateup: {
          '0%': {
            transform: 'translateY(0)'
          },
          '100%' : { 
            transform: 'translateY(-380px)'
          }
        },
        popIn: {
          '0%': {
            transform: 'scale(0) translateX(-48px)'
          },
          '70%' : { 
            transform: 'scale(1.15) translateX(-48px)'
          },
          '90%' : {
            transform: 'scale(1.05) translateX(-48px)'
          },
          '100%' : {
            transform: 'scale(1) translateX(-48px)'
          }
        }
      }
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}

