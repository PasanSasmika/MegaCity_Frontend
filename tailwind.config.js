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
        secondary: ["Inconsolata", "monospace"],
        primary: ["Josefin Sans", "sans-serif"]
      },
       colors: {
        secondery: "#0072ff",
        primary: "#f0db2e",
        accent: "#0f172a",
        low: "#ff9c00",
      },
    },
  },
  plugins: [],
}

