const { colors: defaultColors } = require("tailwindcss/defaultTheme");

const colors = {
  ...defaultColors,
  ...{
    light: {
      500: "#C4FCEF",
    },
    medium: {
      500: "#00C9A7",
    },
    dark: {
      500: "#4D8076",
    },
    accent: {
      500: "#845EC2",
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
