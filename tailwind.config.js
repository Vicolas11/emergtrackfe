/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["AvenirBold", "AvenirRegular"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        bgColor: "#ffffff",
        bgColor2: "#F2F2F2",
        prmColor: "#5721B7",
        color: "#0d0d0f",
        color1: "#1b1c1e40",
        color2: "#FBFBFB",
        color3: "#290863",
        color4: "#F3900F",
        color5: "#E18D06",
        color6: "#ece7f7",
      },
    },
    screens: {
      lit: { max: "300px" },
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
