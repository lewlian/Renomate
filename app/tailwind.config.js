/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: "#1A1A2E",
        charcoal: "#3A3A4A",
        slate: "#7C7C8A",
        mist: "#B8B8C8",
        cloud: "#E8E8F0",
        snow: "#F0F4F3",
        "mint-bg": "#E8F5F0",
        white: "#FFFFFF",
        coral: {
          DEFAULT: "#FF6B6B",
          soft: "#FFE0E0",
        },
        sage: {
          DEFAULT: "#7EC8A0",
          soft: "#D4F0E0",
        },
        lavender: {
          DEFAULT: "#B8A9E8",
          soft: "#E8E0F8",
        },
        sky: {
          DEFAULT: "#7EC8E3",
          soft: "#D4EEF8",
        },
        sand: {
          DEFAULT: "#F5DEB3",
          soft: "#FFF5E0",
        },
        peach: {
          DEFAULT: "#FFB088",
          soft: "#FFE8D8",
        },
      },
      fontFamily: {
        heading: ["Inter-Bold"],
        body: ["Inter"],
        mono: ["JetBrainsMono"],
      },
      borderRadius: {
        sm: 8,
        DEFAULT: 12,
        md: 16,
        lg: 20,
        xl: 24,
        full: 9999,
      },
    },
  },
  plugins: [],
};
