/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#586eb6",
        compl: "#b6a058",
        secondary: "#a058b6",
        secCompl: "#6eb658",
      },
    },
  },
  plugins: [],
};
