/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", 
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8",   
        secondary: "#F59E0B",
      },
      spacing: {
        128: "32rem",          
      },
    },
  },
  plugins: [],
};