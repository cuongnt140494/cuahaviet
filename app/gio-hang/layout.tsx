import { Metadata } from "next";
import { pageSEO, siteConfig } from "@/lib/seo-config";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: pageSEO.cart.title,
  description: pageSEO.cart.description,
  alternates: {
    canonical: `${siteConfig.url}/gio-hang`,
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: pageSEO.cart.title,
    description: pageSEO.cart.description,
    url: `${siteConfig.url}/gio-hang`,
    type: "website",
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Giỏ hàng", url: "/gio-hang" },
        ]}
      />
      {children}
    </>
  );
}
