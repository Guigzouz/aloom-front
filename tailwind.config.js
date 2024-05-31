/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "white",
      black: "black",
      "aloom-bg-dark": "#282828",
      "aloom-bg-dark-second": "#1E1E1E",
      "aloom-orange": "#FF521B",
      "aloom-disabled-grey": "#808080",
    },
    extend: {
      backgroundImage: {
        "lol-jhin": "url('src/assets/jhin_0.jpg')",
        "elden-ring": "url('src/assets/elden-ring.avif')",
      },
    },
  },
  plugins: [],
};
