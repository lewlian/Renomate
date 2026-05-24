import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
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
        heading: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        body: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'SF Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(40px, 6vw, 72px)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-lg': ['clamp(28px, 4vw, 44px)', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display-md': ['28px', { lineHeight: '36px', fontWeight: '700' }],
        'heading': ['22px', { lineHeight: '28px', fontWeight: '600' }],
        'heading-sm': ['18px', { lineHeight: '24px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px' }],
        'body': ['16px', { lineHeight: '24px' }],
        'body-sm': ['14px', { lineHeight: '20px' }],
        'caption': ['12px', { lineHeight: '16px', letterSpacing: '0.04em', fontWeight: '500' }],
        'mono-sm': ['13px', { lineHeight: '18px' }],
      },
      borderRadius: {
        'sm': '8px',
        DEFAULT: '12px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.1)',
        'button': '0 2px 4px rgba(255,107,107,0.3)',
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
