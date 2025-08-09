import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "600", "700"]
});

export const metadata: Metadata = {
  title: "أكاديمية العربية",
  description: "منصة تعليمية لشرح مادة اللغة العربية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} antialiased bg-background text-foreground`}>{children}</body>
    </html>
  );
}
