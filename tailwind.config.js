/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "white",
      "aloom-bg-dark": "#282828",
      "aloom-orange": "#FF521B",
    },
    extend: {
      backgroundImage: {
        "lol-jhin": "url('src/assets/jhin_0.jpg')",
      },
    },
  },
  plugins: [],
};
