import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Currency Converter | Real-time Exchange Rates",
  description: "Convert currencies easily using real-time exchange rates. Support for 20+ major currencies with dark/light mode interface.",
  keywords: ["currency converter", "exchange rates", "currency exchange", "money converter"],
  authors: [{ name: "Hasbi Firasyan" }],
  openGraph: {
    title: "Currency Converter | Real-time Exchange Rates",
    description: "Convert currencies easily using real-time exchange rates",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
