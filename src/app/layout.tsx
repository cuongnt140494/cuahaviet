import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Header, Footer, FloatingCTA } from "@/components/storefront";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-geist-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Cửa Hà Việt - Cửa Cuốn, Cửa Nhôm Kính & Cửa Gỗ Nhựa Cao Cấp",
    template: "%s | Cửa Hà Việt",
  },
  description: "Chuyên cung cấp và thi công cửa cuốn, cửa nhôm Xingfa, cửa gỗ nhựa composite cao cấp tại Hà Nội. Bảo hành chính hãng, lắp đặt miễn phí. Hotline: 0919086272",
  keywords: ["cửa cuốn", "cửa nhôm", "cửa gỗ composite", "cửa hà nội", "cửa hà việt", "cửa Xingfa", "cửa Austdoor"],
  authors: [{ name: "Cửa Hà Việt" }],
  creator: "Cửa Hà Việt",
  metadataBase: new URL("https://cuahaviet.vn"),
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://cuahaviet.vn",
    siteName: "Cửa Hà Việt",
    title: "Cửa Hà Việt - Cửa Cuốn, Cửa Nhôm Kính & Cửa Gỗ Nhựa Cao Cấp",
    description: "Chuyên cung cấp và thi công cửa cuốn, cửa nhôm Xingfa, cửa gỗ nhựa composite cao cấp tại Hà Nội. Bảo hành chính hãng, lắp đặt miễn phí.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cửa Hà Việt - Giải pháp cửa hàng đầu Việt Nam",
      },
    ],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${beVietnamPro.variable} font-sans`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <FloatingCTA />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
