import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AstryxProviders } from "@/components/AstryxProviders";
import { loadBrand } from "@/lib/load-brand";
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import "@/themes/brand.theme.css";
import "./globals.css";

/**
 * Next font loader contract (N faces — do not codegen from Design system stacks):
 * 1. Design system owns CSS stacks (`--font-sans` required; optional `--font-serif`
 *    for display/heading; optional `--font-mono` for labels/code).
 * 2. This file owns which webfont CSS variables `next/font` injects
 *    (Sample Brand: `--font-geist-sans`).
 * 3. Every `var(--font-*)` in authored stacks must appear as `variable: "--font-…"` here.
 * 4. Put loader `.variable` classes on `<html>` — never on `<body>` (that fights the theme stack).
 * 5. Adding a face is a required hand edit here + the matching Visual field + Design stack.
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
