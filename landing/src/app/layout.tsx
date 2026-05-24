import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Renomate — Your renovation, organised.",
  description:
    "A single workspace for the timeline, decisions, prices and invoices that define every Singapore renovation — for homeowners and the interior designers who run their projects.",
  metadataBase: new URL("https://renomate.sg"),
  openGraph: {
    title: "Renomate — Your renovation, organised.",
    description:
      "A single workspace for the timeline, decisions, prices and invoices that define every Singapore renovation.",
    type: "website",
    locale: "en_SG",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
