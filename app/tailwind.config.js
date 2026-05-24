/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: "#161513",
        charcoal: "#3D3A36",
        slate: "#6E6963",
        mist: "#A8A29B",
        linen: "#EFEAE2",
        paper: "#FAF7F2",
        white: "#FFFFFF",
        clay: {
          DEFAULT: "#B85C3C",
          soft: "#E8C9B8",
          deep: "#8A4329",
        },
        success: {
          DEFAULT: "#5C7A4F",
          soft: "#D8E4D0",
        },
        warning: {
          DEFAULT: "#C68C3A",
          soft: "#F0E1C2",
        },
        error: {
          DEFAULT: "#A8453A",
          soft: "#E8C7C2",
        },
        info: "#3A6680",
      },
      fontFamily: {
        display: ["Fraunces"],
        body: ["Inter"],
        mono: ["JetBrainsMono"],
      },
      borderRadius: {
        sm: 4,
        DEFAULT: 8,
        md: 12,
        lg: 16,
        full: 9999,
      },
    },
  },
  plugins: [],
};
