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
  title: "AI Career Advisor - Find Your Future Path 🚀",
  description: "Personalized AI-powered career guidance with roadmaps, skill analysis, and market insights",
  alternates: {
    canonical: "https://ai-career-advisor.vercel.app/",
  },
  openGraph: {
    title: "AI Career Advisor - Find Your Future Path 🚀",
    description: "Personalized AI-powered career guidance with roadmaps, skill analysis, and market insights",
    url: "https://ai-career-advisor.vercel.app/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Career Advisor - Find Your Future Path 🚀",
    description: "Personalized AI-powered career guidance with roadmaps, skill analysis, and market insights",
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
