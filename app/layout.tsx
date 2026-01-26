import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/contexts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ToastContainer } from "@/components/toast-container";
import { ScrollToTop } from "@/components/scroll-to-top";
import { CompareBar } from "@/components/compare-bar";
import { QuickViewWrapper } from "@/components/quick-view-wrapper";
import {
  OrganizationJsonLd,
  LocalBusinessJsonLd,
  WebSiteJsonLd,
} from "@/components/seo/json-ld";
import { siteConfig, pageSEO } from "@/lib/seo-config";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  // Basic Metadata
  title: {
    default: pageSEO.home.title,
    template: "%s | Cửa Hà Việt",
  },
  description: pageSEO.home.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#2563eb" },
    ],
  },

  // Manifest
  manifest: "/manifest.webmanifest",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: pageSEO.home.title,
    description: pageSEO.home.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: pageSEO.home.title,
    description: pageSEO.home.description,
    images: [siteConfig.ogImage],
    creator: "@cuahaviet",
  },

  // Verification (uncomment and add your verification codes)
  verification: {
    // google: siteConfig.verification.google,
    // yandex: siteConfig.verification.yandex,
    // other: {
    //   'msvalidate.01': siteConfig.verification.bing,
    // },
  },

  // Alternate Languages
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "vi-VN": siteConfig.url,
    },
  },

  // Category
  category: "business",

  // Other
  metadataBase: new URL(siteConfig.url),
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />

        {/* Preconnect to important origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ToastContainer />
          <ScrollToTop />
          <CompareBar />
          <QuickViewWrapper />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
