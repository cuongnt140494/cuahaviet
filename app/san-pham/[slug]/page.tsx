import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/product-card";
import { ProductActions } from "./product-actions";
import { ImageGallery } from "@/components/image-gallery";
import { products, getProductBySlug, getProductsByCategory } from "@/data/products";
import { siteConfig } from "@/lib/seo-config";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import {
  categoryLabels,
  seriesLabels,
  Product,
  DoorSpecifications,
  MotorSpecifications,
  UPSSpecifications,
  AccessorySpecifications,
  austdoorColors,
} from "@/types";
import {
  ChevronRight,
  Shield,
  Truck,
  Phone,
  Clock,
  CheckCircle,
  Star,
  BadgeCheck,
  Award,
  Headphones,
  ArrowRight,
  Package,
  Ruler,
  Palette,
  Zap,
  Settings,
  FileText,
  MessageCircle,
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

function ColorSwatch({ colorCode }: { colorCode: string }) {
  const color = austdoorColors[colorCode];
  if (!color) return null;
  return (
    <div className="group relative">
      <div
        className="w-10 h-10 rounded-xl border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform"
        style={{ backgroundColor: color.hex }}
      />
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-900 text-white text-xs px-2 py-1 rounded">
        {color.name}
      </div>
    </div>
  );
}

function SpecCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function DoorSpecsGrid({ specs }: { specs: DoorSpecifications }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SpecCard icon={FileText} label="Model" value={specs.model} />
      <SpecCard icon={Ruler} label="Độ dày nan" value={specs.thickness} />
      <SpecCard icon={Package} label="Kích thước tối đa" value={specs.maxSize} />
      {specs.material && <SpecCard icon={Settings} label="Chất liệu" value={specs.material} />}
      <div className="sm:col-span-2 p-4 rounded-xl bg-muted/50">
        <div className="flex items-center gap-2 mb-3">
          <Palette className="h-5 w-5 text-primary" />
          <span className="font-semibold">Màu sắc có sẵn</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {specs.colors.map((code) => (
            <ColorSwatch key={code} colorCode={code} />
          ))}
        </div>
      </div>
      <div className="sm:col-span-2">
        <SpecCard icon={Package} label="Tiêu chuẩn đồng bộ" value={specs.includedItems} />
      </div>
    </div>
  );
}

function MotorSpecsGrid({ specs }: { specs: MotorSpecifications }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SpecCard icon={FileText} label="Model" value={specs.model} />
      <SpecCard icon={Zap} label="Điện áp định mức" value={specs.voltage} />
      <SpecCard icon={Settings} label="Công suất" value={specs.power} />
      <SpecCard icon={Settings} label="Mô-men đầu ra" value={specs.torque} />
      <SpecCard icon={Ruler} label="Chiều cao nâng tối đa" value={specs.maxHeight} />
      <div className="p-4 rounded-xl bg-green-50 border border-green-200">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
            <Award className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-green-600">Bảo hành</p>
            <p className="font-bold text-green-700">{specs.warranty}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UPSSpecsGrid({ specs }: { specs: UPSSpecifications }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SpecCard icon={FileText} label="Model" value={specs.model} />
      <SpecCard icon={Zap} label="Dung lượng" value={specs.capacity} />
      <SpecCard icon={Zap} label="Điện áp" value={specs.voltage} />
      <SpecCard icon={Settings} label="Tương thích" value={specs.compatibility} />
    </div>
  );
}

function AccessorySpecsGrid({ specs }: { specs: AccessorySpecifications }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SpecCard icon={FileText} label="Model" value={specs.model} />
      <SpecCard icon={Package} label="Loại" value={specs.type} />
      {specs.compatibility && <SpecCard icon={Settings} label="Tương thích" value={specs.compatibility} />}
    </div>
  );
}

function ProductSpecifications({ product }: { product: Product }) {
  const specs = product.specifications;
  const category = product.category;

  if (category === "cua-cuon-tam-lien" || category === "cua-cuon-khe-thoang" || category === "cua-cuon-dac-biet") {
    return <DoorSpecsGrid specs={specs as DoorSpecifications} />;
  }
  if (category === "motor") {
    return <MotorSpecsGrid specs={specs as MotorSpecifications} />;
  }
  if (category === "luu-dien") {
    return <UPSSpecsGrid specs={specs as UPSSpecifications} />;
  }
  if (category === "phu-kien") {
    return <AccessorySpecsGrid specs={specs as AccessorySpecifications} />;
  }
  return <SpecCard icon={FileText} label="Model" value={specs.model} />;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại",
      description: "Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.",
    };
  }

  const title = `${product.name} | Cửa Hà Việt`;
  const description = `${product.name} - ${product.description.slice(0, 150)}... Giá: ${new Intl.NumberFormat("vi-VN").format(product.wholesalePrice || product.price)}đ. Bảo hành ${product.category.includes("motor") ? "3 năm" : "5 năm"}.`;

  return {
    title,
    description,
    keywords: `${product.name}, ${categoryLabels[product.category]}, ${seriesLabels[product.series]}, cửa cuốn Austdoor, ${product.specifications.model}`,
    alternates: {
      canonical: `${siteConfig.url}/san-pham/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/san-pham/${product.slug}`,
      type: "website",
      images: [
        {
          url: product.images[0] || `${siteConfig.url}/images/og-product.jpg`,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const hasWholesalePrice = !!product.wholesalePrice;
  const savings = hasWholesalePrice ? product.price - product.wholesalePrice! : 0;

  return (
    <>
      {/* Structured Data */}
      <ProductJsonLd
        name={product.name}
        description={product.description}
        image={product.images[0] || `${siteConfig.url}/images/product-placeholder.jpg`}
        sku={product.specifications.model}
        brand="Austdoor"
        price={product.wholesalePrice || product.price}
        currency="VND"
        availability={product.inStock ? "InStock" : "OutOfStock"}
        url={`${siteConfig.url}/san-pham/${product.slug}`}
        category={categoryLabels[product.category]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Sản phẩm", url: "/san-pham" },
          { name: categoryLabels[product.category], url: `/san-pham?category=${product.category}` },
          { name: product.name, url: `/san-pham/${product.slug}` },
        ]}
      />

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <nav className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors shrink-0">
              Trang chủ
            </Link>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground shrink-0" aria-hidden="true" />
            <Link href="/san-pham" className="text-muted-foreground hover:text-primary transition-colors hidden sm:inline">
              Sản phẩm
            </Link>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground shrink-0 hidden sm:block" aria-hidden="true" />
            <Link
              href={`/san-pham?category=${product.category}`}
              className="text-muted-foreground hover:text-primary transition-colors hidden md:inline"
            >
              {categoryLabels[product.category]}
            </Link>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground shrink-0 hidden md:block" aria-hidden="true" />
            <span className="text-foreground font-medium truncate max-w-[180px] sm:max-w-[250px] md:max-w-[300px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Column - Image Gallery */}
            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 shadow-2xl">
                <ImageGallery images={product.images} productName={product.name} />

                {/* Stock Badge */}
                <div className="absolute top-6 left-6">
                  {product.inStock ? (
                    <Badge className="bg-green-500 hover:bg-green-500 text-white px-4 py-2 text-sm font-semibold shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse mr-2" />
                      Còn hàng
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="px-4 py-2 text-sm font-semibold shadow-lg">
                      Hết hàng
                    </Badge>
                  )}
                </div>

                {/* Discount Badge */}
                {hasWholesalePrice && (
                  <div className="absolute top-6 right-6">
                    <Badge className="bg-red-500 hover:bg-red-500 text-white px-4 py-2 text-sm font-semibold shadow-lg">
                      Tiết kiệm {formatPrice(savings)}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Trust Strip - Mobile Hidden, Desktop Shown */}
              <div className="hidden lg:grid grid-cols-4 gap-4">
                {[
                  { icon: BadgeCheck, label: "Chính hãng 100%" },
                  { icon: Truck, label: "Giao hàng Hà Nội" },
                  { icon: Shield, label: "Bảo hành 5 năm" },
                  { icon: Headphones, label: "Hỗ trợ 24/7" },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-4 rounded-2xl bg-muted/50">
                    <item.icon className="h-6 w-6 text-primary mb-2" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-8">
              {/* Category & Series Tags */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="px-4 py-1.5 text-sm">
                  {categoryLabels[product.category]}
                </Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/10 px-4 py-1.5 text-sm">
                  {seriesLabels[product.series]}
                </Badge>
              </div>

              {/* Product Title & Rating */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4.9/5 (128 đánh giá)</span>
                  <span className="text-sm text-muted-foreground">|</span>
                  <span className="text-sm text-green-600 font-medium">500+ đã bán</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Price Section */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Giá bán</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-bold text-primary">
                          {formatPrice(hasWholesalePrice ? product.wholesalePrice! : product.price)}
                        </span>
                        <span className="text-lg text-muted-foreground">/{product.unit}</span>
                      </div>
                      {hasWholesalePrice && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-lg text-muted-foreground line-through">
                            {formatPrice(product.price)}
                          </span>
                          <Badge variant="destructive" className="text-xs">
                            -{Math.round((savings / product.price) * 100)}%
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Đã bao gồm VAT</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <ProductActions product={product} />

              {/* Trust Strip - Mobile Only */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:hidden">
                {[
                  { icon: BadgeCheck, label: "Chính hãng" },
                  { icon: Truck, label: "Giao Hà Nội" },
                  { icon: Shield, label: "Bảo hành 5 năm" },
                  { icon: Headphones, label: "Hỗ trợ 24/7" },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-3 rounded-xl bg-muted/50">
                    <item.icon className="h-5 w-5 text-primary mb-1" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Quick Contact */}
              <Card className="border-2 border-dashed">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tư vấn miễn phí</p>
                        <p className="font-bold text-lg">0919 086 272</p>
                      </div>
                    </div>
                    <a href="tel:0919086272">
                      <Button variant="outline" size="sm" className="rounded-full">
                        Gọi ngay
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Specifications */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 lg:p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Settings className="h-5 w-5 text-primary" />
                    </div>
                    Thông số kỹ thuật
                  </h2>
                  <ProductSpecifications product={product} />
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 lg:p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    Đặc điểm nổi bật
                  </h2>
                  <div className="grid gap-4">
                    {product.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100"
                      >
                        <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm leading-relaxed pt-1">{feature}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Why Choose Us */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Tại sao chọn Cửa Hà Việt?</h3>
                  <div className="space-y-4">
                    {[
                      { icon: BadgeCheck, text: "Đại lý chính hãng Austdoor" },
                      { icon: Award, text: "10+ năm kinh nghiệm" },
                      { icon: Truck, text: "Giao hàng tận nơi Hà Nội" },
                      { icon: Shield, text: "Bảo hành lên đến 5 năm" },
                      { icon: Clock, text: "Lắp đặt chuyên nghiệp" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-primary" />
                        <span className="text-sm text-white/90">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Promotion Card */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 text-white text-center">
                  <p className="text-sm font-medium">Cam kết</p>
                  <p className="text-xl font-bold">Giá tốt nhất Hà Nội</p>
                </div>
                <CardContent className="p-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Sản phẩm chính hãng 100%</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Giao hàng nhanh nội thành</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Thi công chuẩn kỹ thuật</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Cần hỗ trợ thêm?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Đội ngũ tư vấn sẵn sàng hỗ trợ bạn 24/7
                  </p>
                  <Link href="/lien-he">
                    <Button className="w-full rounded-full">
                      Liên hệ ngay
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/10">Sản phẩm liên quan</Badge>
                <h2 className="text-3xl font-bold">Có thể bạn quan tâm</h2>
              </div>
              <Link href={`/san-pham?category=${product.category}`}>
                <Button variant="outline" className="rounded-full gap-2">
                  Xem tất cả <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Bạn cần tư vấn thêm?</h2>
            <p className="text-white/70 mb-8 text-lg">
              Liên hệ ngay để được đội ngũ chuyên gia tư vấn miễn phí và nhận báo giá tốt nhất
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:0919086272">
                <Button size="lg" className="rounded-full gap-2 px-8">
                  <Phone className="h-5 w-5" />
                  0919 086 272
                </Button>
              </a>
              <Link href="/lien-he">
                <Button size="lg" className="rounded-full gap-2 px-8 bg-white/10 border border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                  <MessageCircle className="h-5 w-5" />
                  Gửi yêu cầu báo giá
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
