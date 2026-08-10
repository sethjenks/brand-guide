import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AstryxProviders } from "@/components/AstryxProviders";
import { loadBrand } from "@/lib/load-brand";
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import "@/themes/brand.theme.css";
import "./globals.css";

/**
 * Next font loader contract (two owners — do not codegen from Design system stacks):
 * 1. Design system owns CSS stacks (`--font-sans` required; optional `--font-serif` for headings).
 * 2. This file owns which webfont CSS variables `next/font` injects (today `--font-geist-sans`).
 * 3. Authored stacks should reference those variables so loaded faces win.
 * 4. Adding a display/serif face (e.g. Literata) means a hand edit here + `--font-serif` in brand.md.
 */
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export function generateMetadata(): Metadata {
  const brand = loadBrand();
  return {
    title: `${brand.name} — Brand Guide`,
    description:
      brand.setup.support ||
      `${brand.name}. ${brand.tagline}`,
    alternates: {
      types: {
        "text/plain": "/brand",
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>
        <AstryxProviders>{children}</AstryxProviders>
      </body>
    </html>
  );
}
