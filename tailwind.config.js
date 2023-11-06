/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/script.js"],
  theme: {
    extend: {
      fontFamily: {
        openSan: "Open Sans, sans-serif",
        playfair: "Playfair Display, serif;",
      },
      colors: {
        main: "#5EC576",
        mainAlt: "#4bbb7d",
        bgColor: "#000000",
        container: "#1C1C1C",
        containerAlt: "#141414",
        body: "#CFCFCF",
        yellow: "#FFCB03",
        magenta: "#FF585F",
      },
    },
  },
  plugins: [],
};
