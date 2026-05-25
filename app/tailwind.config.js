/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        canvas: "#ffffff",
        charcoal: "#292d34",
        onyx: "#202023",
        ash: "#e8e8e8",
        smoke: "#b3b3b3",
        "hint-sky": "#e9ebf0",
        "tint-blue": "#edf6fd",
        violet: "#7b68ee",
        blue: "#0091ff",
        plum: "#514b81",
        "vivid-purple": "#6647f0",
        "deep-charcoal": "#090c1d",
        "warm-orange": "#ff5b36",
      },
      fontFamily: {
        heading: ["PlusJakartaSans-Bold"],
        body: ["Inter"],
        mono: ["JetBrainsMono"],
      },
      borderRadius: {
        sm: 9,
        DEFAULT: 9,
        md: 12,
        lg: 24,
        pill: 54,
        full: 9999,
      },
    },
  },
  plugins: [],
};
