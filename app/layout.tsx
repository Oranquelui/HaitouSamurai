import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display"
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono"
});

const jpSerif = Noto_Serif_JP({
  weight: ["500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-jp"
});

export const metadata: Metadata = {
  title: "HaitouSamurai | Dividend Mining Research Tool",
  description: "A dividend mining dashboard for checking coverage metrics, risk flags, and after-tax income scenarios without ticker recommendations.",
  metadataBase: new URL("https://github.com/Oranquelui/HaitouSamurai"),
  openGraph: {
    title: "HaitouSamurai",
    description: "Check dividend candidates, risk flags, and after-tax income in one research screen.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${mono.variable} ${jpSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
