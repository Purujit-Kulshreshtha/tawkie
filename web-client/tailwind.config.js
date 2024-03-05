const { colors: defaultColors } = require("tailwindcss/defaultTheme");

const colors = {
  ...defaultColors,
  ...{
    light: {
      500: "#ddd",
    },
    medium: {
      500: "#777",
    },
    dark: {
      500: "#333",
    },
    accent: {
      500: "#2b858f",
    },
  },
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors,
    },
  },
  variants: {},
  plugins: [],
};
