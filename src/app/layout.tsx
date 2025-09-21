import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "../components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Career Advisor - Find Your Future Path 🚀",
    template: "%s | AI Career Advisor"
  },
  description: "Personalized AI-powered career guidance with roadmaps, skill analysis, and market insights. Get your career path analyzed by advanced AI technology.",
  keywords: [
    "AI career advisor",
    "career guidance",
    "job search",
    "career planning",
    "skill analysis",
    "career roadmap",
    "professional development",
    "career counseling",
    "job market insights",
    "career assessment",
    "future career",
    "career path",
    "AI powered careers",
    "career recommendations"
  ],
  authors: [
    {
      name: "AI Career Advisor Team",
      url: "https://ai-career-advisor-alpha.vercel.app/"
    }
  ],
  creator: "AI Career Advisor Team",
  publisher: "AI Career Advisor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ai-career-advisor-alpha.vercel.app/"),
  alternates: {
    canonical: "https://ai-career-advisor-alpha.vercel.app/",
  },
  openGraph: {
    title: "AI Career Advisor - Find Your Future Path 🚀",
    description: "Personalized AI-powered career guidance with roadmaps, skill analysis, and market insights. Discover your ideal career path today!",
    url: "https://ai-career-advisor-alpha.vercel.app/",
    siteName: "AI Career Advisor",
    images: [
      {
        url: "https://ai-career-advisor-alpha.vercel.app/ai-advisor-4.0.png",
        width: 1200,
        height: 630,
        alt: "AI Career Advisor - Advanced AI-powered career guidance platform",
        type: "image/png",
        secureUrl: "https://ai-career-advisor-alpha.vercel.app/ai-advisor-4.0.png"
      },
      {
        url: "https://ai-career-advisor-alpha.vercel.app/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "AI Career Advisor Logo",
        type: "image/png",
        secureUrl: "https://ai-career-advisor-alpha.vercel.app/android-chrome-512x512.png"
      }
    ],
    locale: "en_US",
    type: "website",
    countryName: "Global",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Career Advisor - Find Your Future Path 🚀",
    description: "Personalized AI-powered career guidance with roadmaps, skill analysis, and market insights.",
    creator: "@aicareeradvisor",
    images: [
      {
        url: "https://ai-career-advisor-alpha.vercel.app/ai-advisor-4.0.png",
        alt: "AI Career Advisor - Advanced AI-powered career guidance platform",
        width: 1200,
        height: 630
      }
    ],
    site: "@aicareeradvisor"
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
    yandex: "your-yandex-verification-code", // Replace with actual verification code
    other: {
      "msvalidate.01": "your-bing-verification-code", // Replace with actual verification code
    }
  },
  category: "Career Development",
  classification: "AI Career Guidance Platform",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: [{ url: "/favicon.ico" }],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#0a0a0a",
    "msapplication-config": "/browserconfig.xml",
    "application-name": "AI Career Advisor",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "AI Career Advisor",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-tap-highlight": "no",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData metadata={metadata} />

        {/* Force favicon override - must come before other meta tags */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Additional favicon sizes */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />
        <link rel="icon" type="image/png" sizes="128x128" href="/favicon-128x128.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />

        {/* Apple touch icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Android Chrome icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />

        {/* Windows tile */}
        <meta name="msapplication-TileImage" content="/favicon-128x128.png" />

        {/* Additional Social Media Meta Tags for better sharing */}
        <meta property="og:image" content="https://ai-career-advisor-alpha.vercel.app/ai-advisor-4.0.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="AI Career Advisor - Advanced AI-powered career guidance platform" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:secure_url" content="https://ai-career-advisor-alpha.vercel.app/ai-advisor-4.0.png" />

        {/* Twitter Card specific */}
        <meta name="twitter:image" content="https://ai-career-advisor-alpha.vercel.app/ai-advisor-4.0.png" />
        <meta name="twitter:image:alt" content="AI Career Advisor - Advanced AI-powered career guidance platform" />

        {/* LinkedIn specific */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* WhatsApp and general social sharing */}
        <meta property="og:image" content="https://ai-career-advisor-alpha.vercel.app/ai-advisor-4.0.png" />
        <meta property="og:image:secure_url" content="https://ai-career-advisor-alpha.vercel.app/ai-advisor-4.0.png" />

        {/* Fallback for platforms that don't support Open Graph */}
        <link rel="image_src" href="https://ai-career-advisor-alpha.vercel.app/ai-advisor-4.0.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
