/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      fontFamily: {
        main: ["Poppins"],
        secondery:["Inter"] 
         
      },
      colors:{
        primary:"#fde047"
      },
    },
  },
  plugins: [],
}

