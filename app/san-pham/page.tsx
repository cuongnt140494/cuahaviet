import { Suspense } from "react";
import { Metadata } from "next";
import { ProductsContent } from "./products-content";
import { pageSEO, siteConfig } from "@/lib/seo-config";
import { CollectionPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: pageSEO.products.title,
  description: pageSEO.products.description,
  keywords: pageSEO.products.keywords,
  alternates: {
    canonical: `${siteConfig.url}/san-pham`,
  },
  openGraph: {
    title: pageSEO.products.title,
    description: pageSEO.products.description,
    url: `${siteConfig.url}/san-pham`,
    type: "website",
  },
};

function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-4 w-32 bg-muted rounded mb-6" />
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 shrink-0 space-y-6">
            <div className="h-10 bg-muted rounded" />
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-muted rounded" />
              ))}
            </div>
          </aside>
          <div className="flex-1">
            <div className="h-8 w-48 bg-muted rounded mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-muted rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <>
      {/* Structured Data */}
      <CollectionPageJsonLd
        name="Sản phẩm cửa cuốn Austdoor"
        description={pageSEO.products.description}
        url={`${siteConfig.url}/san-pham`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Sản phẩm", url: "/san-pham" },
        ]}
      />

      <Suspense fallback={<ProductsLoading />}>
        <ProductsContent />
      </Suspense>
    </>
  );
}
