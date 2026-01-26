import { Metadata } from "next";
import { pageSEO, siteConfig } from "@/lib/seo-config";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: pageSEO.compare.title,
  description: pageSEO.compare.description,
  alternates: {
    canonical: `${siteConfig.url}/so-sanh`,
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: pageSEO.compare.title,
    description: pageSEO.compare.description,
    url: `${siteConfig.url}/so-sanh`,
    type: "website",
  },
};

export default function CompareLayout({
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
          { name: "So sánh sản phẩm", url: "/so-sanh" },
        ]}
      />
      {children}
    </>
  );
}
