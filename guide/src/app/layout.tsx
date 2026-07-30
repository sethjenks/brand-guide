import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AstryxProviders } from "@/components/AstryxProviders";
import { loadBrand } from "@/lib/load-brand";
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import "@/themes/brand.theme.css";
import "./globals.css";

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
