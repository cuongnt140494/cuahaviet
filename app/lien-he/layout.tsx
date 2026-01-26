import { Metadata } from "next";
import { pageSEO, siteConfig } from "@/lib/seo-config";
import { ContactPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: pageSEO.contact.title,
  description: pageSEO.contact.description,
  keywords: pageSEO.contact.keywords,
  alternates: {
    canonical: `${siteConfig.url}/lien-he`,
  },
  openGraph: {
    title: pageSEO.contact.title,
    description: pageSEO.contact.description,
    url: `${siteConfig.url}/lien-he`,
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data */}
      <ContactPageJsonLd
        name="Liên hệ Cửa Hà Việt"
        description={pageSEO.contact.description}
        url={`${siteConfig.url}/lien-he`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Liên hệ", url: "/lien-he" },
        ]}
      />
      {children}
    </>
  );
}
