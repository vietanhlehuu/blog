const plugin = require("tailwindcss/plugin")

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./content/**/*.md"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        "border-collapse": "0 0 0 4px #8b5cf6",
      },
      backgroundImage: {
        primary: "linear-gradient(to right, red, yellow)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        ".writing-vlr": {
          "writing-mode": "vertical-lr",
        },
        ".writing-vrl": {
          "writing-mode": "vertical-rl",
        },
      })
    }),
  ],
  corePlugins: {
    preflight: false,
  },
}
