import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CYCLONE AI — North Indian Ocean Tropical Cyclone Intelligence & Prediction Platform",
  description: "AI/ML-based decision support system for Tropical Cyclone Identification, Classification, Temporal Analysis, and Multi-Source Satellite Prediction. Research Prototype.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full bg-[#0B1120] text-[#F8FAFC] antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B1120] text-[#F8FAFC] selection:bg-[#1E40AF] selection:text-white">
        {children}
      </body>
    </html>
  );
}
