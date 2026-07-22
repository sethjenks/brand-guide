import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { loadBrand } from "@/lib/load-brand";
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
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className={geistSans.className}>{children}</body>
    </html>
  );
}
