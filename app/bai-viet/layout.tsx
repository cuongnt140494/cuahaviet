import { Metadata } from "next";
import { pageSEO, siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: pageSEO.blog.title,
  description: pageSEO.blog.description,
  keywords: pageSEO.blog.keywords,
  alternates: {
    canonical: `${siteConfig.url}/bai-viet`,
  },
  openGraph: {
    title: pageSEO.blog.title,
    description: pageSEO.blog.description,
    url: `${siteConfig.url}/bai-viet`,
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
