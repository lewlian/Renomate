import type { Config } from "tailwindcss";

// Design tokens from Knowledge/DesignSystem.md
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
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
        display: ['var(--font-fraunces)', 'Iowan Old Style', 'Georgia', 'serif'],
        body: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'SF Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        // [size, lineHeight]
        'display-xl': ['clamp(40px, 6vw, 72px)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(28px, 4vw, 44px)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-md': ['28px', { lineHeight: '36px' }],
        'heading': ['20px', { lineHeight: '28px' }],
        'body-lg': ['18px', { lineHeight: '28px' }],
        'body': ['16px', { lineHeight: '24px' }],
        'body-sm': ['14px', { lineHeight: '20px' }],
        'caption': ['12px', { lineHeight: '16px', letterSpacing: '0.08em' }],
        'mono-sm': ['13px', { lineHeight: '18px' }],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '24px',
        '6': '32px',
        '7': '48px',
        '8': '64px',
        '9': '96px',
        '10': '128px',
      },
      borderRadius: {
        'sm': '4px',
        DEFAULT: '8px',
        'md': '12px',
        'lg': '16px',
        'full': '9999px',
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.2, 0, 0, 1)',
      },
      maxWidth: {
        'container': '1120px',
        'narrow': '760px',
      },
    },
  },
  plugins: [],
};

export default config;
