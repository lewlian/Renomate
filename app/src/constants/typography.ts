export const fonts = {
  display: "Fraunces",
  body: "Inter",
  mono: "JetBrainsMono",
} as const;

export const fontSizes = {
  displayXl: {
    fontSize: 48,
    lineHeight: 56,
    fontFamily: fonts.display,
    fontWeight: "400" as const,
  },
  displayLg: {
    fontSize: 36,
    lineHeight: 44,
    fontFamily: fonts.display,
    fontWeight: "400" as const,
  },
  displayMd: {
    fontSize: 28,
    lineHeight: 36,
    fontFamily: fonts.display,
    fontWeight: "400" as const,
  },
  heading: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: fonts.body,
    fontWeight: "600" as const,
  },
  bodyLg: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: fonts.body,
    fontWeight: "400" as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.body,
    fontWeight: "400" as const,
  },
  bodySm: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fonts.body,
    fontWeight: "400" as const,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.body,
    fontWeight: "500" as const,
  },
  monoSm: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fonts.mono,
    fontWeight: "400" as const,
  },
} as const;
