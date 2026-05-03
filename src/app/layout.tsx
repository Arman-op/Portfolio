import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neo-Retro Portfolio",
  description: "8-Bit Pixel Art Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${vt323.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-vt323 text-xl tracking-wide">{children}</body>
    </html>
  );
}
