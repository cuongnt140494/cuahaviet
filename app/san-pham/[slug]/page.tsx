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
  Layers,
  Box,
  Timer,
  Cpu,
  Battery,
  Wrench,
  CircleDot,
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
        className="w-12 h-12 rounded-xl border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-all duration-200 ring-2 ring-gray-200"
        style={{ backgroundColor: color.hex }}
      />
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg z-10">
        {color.name}
      </div>
    </div>
  );
}

function SpecItem({ icon: Icon, label, value, highlight = false }: { icon: React.ElementType; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${highlight ? 'bg-primary/5 border border-primary/20' : 'bg-muted/50 hover:bg-muted'}`}>
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${highlight ? 'bg-primary/10' : 'bg-background'}`}>
        <Icon className={`h-5 w-5 ${highlight ? 'text-primary' : 'text-muted-foreground'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
        <p className={`font-semibold truncate ${highlight ? 'text-primary' : ''}`}>{value}</p>
      </div>
    </div>
  );
}

function DoorSpecsGrid({ specs }: { specs: DoorSpecifications }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SpecItem icon={FileText} label="Model" value={specs.model} highlight />
        <SpecItem icon={Layers} label="Độ dày nan" value={specs.thickness} />
        <SpecItem icon={Ruler} label="Kích thước tối đa" value={specs.maxSize} />
        {specs.material && <SpecItem icon={Box} label="Chất liệu" value={specs.material} />}
      </div>

      {/* Colors Section */}
      {specs.colors.length > 0 && (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/50">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
              <Palette className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">Màu sắc có sẵn</span>
            <Badge variant="secondary" className="ml-auto">{specs.colors.length} màu</Badge>
          </div>
          <div className="flex flex-wrap gap-4">
            {specs.colors.map((code) => (
              <ColorSwatch key={code} colorCode={code} />
            ))}
          </div>
        </div>
      )}

      {/* Included Items */}
      <div className="p-5 rounded-2xl bg-green-50 border border-green-200/50">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-lg bg-green-500 flex items-center justify-center">
            <Package className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-green-900">Tiêu chuẩn đồng bộ</span>
        </div>
        <p className="text-green-800">{specs.includedItems}</p>
      </div>
    </div>
  );
}

function MotorSpecsGrid({ specs }: { specs: MotorSpecifications }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SpecItem icon={FileText} label="Model" value={specs.model} highlight />
        <SpecItem icon={Zap} label="Điện áp định mức" value={specs.voltage} />
        <SpecItem icon={Cpu} label="Công suất" value={specs.power} />
        <SpecItem icon={Settings} label="Mô-men đầu ra" value={specs.torque} />
        <SpecItem icon={Ruler} label="Chiều cao nâng tối đa" value={specs.maxHeight} />
      </div>

      {/* Warranty Highlight */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-lg shadow-green-500/25">
            <Award className="h-7 w-7 text-white" />
          </div>
          <div>
            <p className="text-sm text-green-700 font-medium">Chế độ bảo hành</p>
            <p className="text-2xl font-bold text-green-800">{specs.warranty}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UPSSpecsGrid({ specs }: { specs: UPSSpecifications }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <SpecItem icon={FileText} label="Model" value={specs.model} highlight />
      <SpecItem icon={Battery} label="Dung lượng" value={specs.capacity} />
      <SpecItem icon={Zap} label="Điện áp" value={specs.voltage} />
      <SpecItem icon={Settings} label="Tương thích" value={specs.compatibility} />
    </div>
  );
}

function AccessorySpecsGrid({ specs }: { specs: AccessorySpecifications }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <SpecItem icon={FileText} label="Model" value={specs.model} highlight />
      <SpecItem icon={Wrench} label="Loại" value={specs.type} />
      {specs.compatibility && <SpecItem icon={Settings} label="Tương thích" value={specs.compatibility} />}
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
  return <SpecItem icon={FileText} label="Model" value={specs.model} />;
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
  const discountPercent = hasWholesalePrice ? Math.round((savings / product.price) * 100) : 0;

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

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Breadcrumb */}
        <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
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
        <section className="py-6 lg:py-10">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Image Gallery */}
              <div className="space-y-4">
                <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl shadow-slate-200/50 border border-slate-100">
                  <ImageGallery images={product.images} productName={product.name} />

                  {/* Stock & Discount Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                    <div className="flex flex-col gap-2 pointer-events-auto">
                      {product.inStock ? (
                        <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white px-3 py-1.5 text-xs font-semibold shadow-lg rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse mr-1.5" />
                          Còn hàng
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="px-3 py-1.5 text-xs font-semibold shadow-lg rounded-full">
                          Hết hàng
                        </Badge>
                      )}
                    </div>

                    {hasWholesalePrice && (
                      <Badge className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-500 hover:to-orange-500 text-white px-3 py-1.5 text-xs font-bold shadow-lg rounded-full pointer-events-auto">
                        -{discountPercent}%
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Trust Strip - Desktop Only */}
                <div className="hidden lg:grid grid-cols-4 gap-3">
                  {[
                    { icon: BadgeCheck, label: "Chính hãng 100%", color: "text-blue-600 bg-blue-50" },
                    { icon: Truck, label: "Giao hàng Hà Nội", color: "text-green-600 bg-green-50" },
                    { icon: Shield, label: "Bảo hành 5 năm", color: "text-purple-600 bg-purple-50" },
                    { icon: Headphones, label: "Hỗ trợ 24/7", color: "text-orange-600 bg-orange-50" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-2 ${item.color.split(' ')[1]}`}>
                        <item.icon className={`h-5 w-5 ${item.color.split(' ')[0]}`} />
                      </div>
                      <span className="text-xs font-medium text-slate-700">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Product Info */}
              <div className="space-y-6">
                {/* Category & Series Tags */}
                <div className="flex flex-wrap gap-2">
                  <Link href={`/san-pham?category=${product.category}`}>
                    <Badge variant="outline" className="px-3 py-1 text-xs hover:bg-slate-100 transition-colors cursor-pointer">
                      {categoryLabels[product.category]}
                    </Badge>
                  </Link>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/15 px-3 py-1 text-xs">
                    {seriesLabels[product.series]}
                  </Badge>
                  {product.shortDesc && (
                    <Badge variant="secondary" className="px-3 py-1 text-xs">
                      {product.shortDesc}
                    </Badge>
                  )}
                </div>

                {/* Product Title */}
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight text-slate-900">
                    {product.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-muted-foreground ml-1">4.9</span>
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">128 đánh giá</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-emerald-600 font-medium">500+ đã bán</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Price Section */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary rounded-full blur-3xl" />
                  </div>

                  <div className="relative">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <p className="text-sm text-white/60 mb-1">Giá bán</p>
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-3xl sm:text-4xl font-bold">
                            {formatPrice(hasWholesalePrice ? product.wholesalePrice! : product.price)}
                          </span>
                          <span className="text-lg text-white/60">/{product.unit}</span>
                        </div>
                        {hasWholesalePrice && (
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-lg text-white/40 line-through">
                              {formatPrice(product.price)}
                            </span>
                            <Badge className="bg-red-500 hover:bg-red-500 text-white text-xs">
                              Tiết kiệm {formatPrice(savings)}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">Đã bao gồm VAT</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <ProductActions product={product} />

                {/* Trust Strip - Mobile Only */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:hidden">
                  {[
                    { icon: BadgeCheck, label: "Chính hãng" },
                    { icon: Truck, label: "Giao Hà Nội" },
                    { icon: Shield, label: "BH 5 năm" },
                    { icon: Headphones, label: "Hỗ trợ 24/7" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center p-3 rounded-xl bg-white border border-slate-100">
                      <item.icon className="h-5 w-5 text-primary mb-1" />
                      <span className="text-xs font-medium text-slate-700">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Quick Contact */}
                <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center animate-pulse">
                          <Phone className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Hotline tư vấn</p>
                          <p className="font-bold text-xl text-primary">0919 086 272</p>
                        </div>
                      </div>
                      <a href="tel:0919086272">
                        <Button className="rounded-full gap-2">
                          <Phone className="h-4 w-4" />
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

        {/* Product Details Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Specifications & Features */}
              <div className="lg:col-span-2 space-y-8">
                {/* Specifications Card */}
                <Card className="border-0 shadow-xl shadow-slate-200/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <Settings className="h-5 w-5 text-white" />
                      </div>
                      Thông số kỹ thuật
                    </h2>
                  </div>
                  <CardContent className="p-6">
                    <ProductSpecifications product={product} />
                  </CardContent>
                </Card>

                {/* Features Card */}
                <Card className="border-0 shadow-xl shadow-slate-200/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <Star className="h-5 w-5 text-white" />
                      </div>
                      Đặc điểm nổi bật
                    </h2>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid gap-3">
                      {product.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 hover:shadow-md transition-shadow"
                        >
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/25">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                          <p className="text-sm text-slate-700 leading-relaxed pt-1 font-medium">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Why Choose Us */}
                <Card className="border-0 shadow-xl shadow-slate-200/50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl" />
                  </div>
                  <CardContent className="p-6 relative">
                    <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Tại sao chọn Cửa Hà Việt?
                    </h3>
                    <div className="space-y-4">
                      {[
                        { icon: BadgeCheck, text: "Đại lý chính hãng Austdoor" },
                        { icon: Award, text: "10+ năm kinh nghiệm" },
                        { icon: Truck, text: "Giao hàng tận nơi Hà Nội" },
                        { icon: Shield, text: "Bảo hành lên đến 5 năm" },
                        { icon: Clock, text: "Lắp đặt chuyên nghiệp" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                          <div className="h-9 w-9 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                            <item.icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm text-white/90 font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Promotion Card */}
                <Card className="border-0 shadow-xl shadow-slate-200/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 p-5 text-white text-center">
                    <p className="text-sm font-medium opacity-90">Cam kết</p>
                    <p className="text-2xl font-bold">Giá tốt nhất Hà Nội</p>
                  </div>
                  <CardContent className="p-5">
                    <ul className="space-y-3">
                      {[
                        "Sản phẩm chính hãng 100%",
                        "Giao hàng nhanh nội thành",
                        "Thi công chuẩn kỹ thuật",
                      ].map((text, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-sm text-slate-700 font-medium">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Contact Card */}
                <Card className="border-0 shadow-xl shadow-slate-200/50">
                  <CardContent className="p-6 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/25">
                      <MessageCircle className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Cần hỗ trợ thêm?</h3>
                    <p className="text-sm text-muted-foreground mb-5">
                      Đội ngũ tư vấn sẵn sàng hỗ trợ bạn 24/7
                    </p>
                    <Link href="/lien-he">
                      <Button className="w-full rounded-full gap-2">
                        Liên hệ ngay
                        <ArrowRight className="h-4 w-4" />
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
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/10">Sản phẩm liên quan</Badge>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Có thể bạn quan tâm</h2>
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
        <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Bạn cần tư vấn thêm?</h2>
              <p className="text-white/70 mb-8 text-lg">
                Liên hệ ngay để được đội ngũ chuyên gia tư vấn miễn phí và nhận báo giá tốt nhất
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:0919086272">
                  <Button size="lg" className="rounded-full gap-2 px-8 bg-white text-slate-900 hover:bg-white/90">
                    <Phone className="h-5 w-5" />
                    0919 086 272
                  </Button>
                </a>
                <Link href="/lien-he">
                  <Button size="lg" className="rounded-full gap-2 px-8 bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
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
