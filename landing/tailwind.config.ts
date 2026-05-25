import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
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
        heading: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-sometype)', 'monospace'],
      },
      fontSize: {
        'display': ['76px', { lineHeight: '1.05', letterSpacing: '-0.05em', fontWeight: '800' }],
        'heading-lg': ['52px', { lineHeight: '1.12', letterSpacing: '-0.035em', fontWeight: '700' }],
        'heading': ['40px', { lineHeight: '1.14', letterSpacing: '-0.04em', fontWeight: '700' }],
        'heading-sm': ['34px', { lineHeight: '1.18', letterSpacing: '-0.035em', fontWeight: '700' }],
        'subheading': ['26px', { lineHeight: '1.25', letterSpacing: '-0.035em', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '1.5', letterSpacing: '-0.02em' }],
        'body': ['16px', { lineHeight: '1.5', letterSpacing: '-0.016em' }],
        'body-sm': ['14px', { lineHeight: '1.43', letterSpacing: '-0.011em' }],
        'caption': ['12px', { lineHeight: '1.43', letterSpacing: '-0.012em', fontWeight: '500' }],
      },
      borderRadius: {
        'sm': '9px',
        DEFAULT: '9px',
        'md': '12px',
        'lg': '24px',
        'pill': '54px',
        'full': '9999px',
      },
      boxShadow: {
        'subtle': 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px',
        'hover': 'rgba(18, 43, 165, 0.04) 0px 1px 1px -0.5px, rgba(18, 43, 165, 0.04) 0px 3px 3px -1.5px, rgba(18, 43, 165, 0.04) 0px 6px 6px -3px, rgba(18, 43, 165, 0.04) 0px 12px 12px -6px',
        'button': 'rgba(13, 21, 48, 0.04) 0px 4px 4px 0px',
      },
      maxWidth: {
        'container': '1200px',
        'narrow': '760px',
      },
    },
  },
  plugins: [],
};

export default config;
