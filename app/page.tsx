import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts, products } from "@/data/products";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { pageSEO, siteConfig } from "@/lib/seo-config";
import {
  Shield,
  Truck,
  Phone,
  ArrowRight,
  Star,
  Zap,
  Clock,
  Headphones,
  BadgeCheck,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Gift,
  MessageCircle,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

// Page Metadata
export const metadata: Metadata = {
  title: pageSEO.home.title,
  description: pageSEO.home.description,
  keywords: pageSEO.home.keywords,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: pageSEO.home.title,
    description: pageSEO.home.description,
    url: siteConfig.url,
    type: "website",
  },
};

// FAQs for SEO
const homeFAQs = [
  {
    question: "Cửa cuốn Austdoor có bảo hành bao lâu?",
    answer: "Cửa Hà Việt cam kết bảo hành 5 năm cho nan cửa và 2 năm cho motor cửa cuốn Austdoor. Ngoài ra, chúng tôi hỗ trợ kỹ thuật trọn đời sản phẩm.",
  },
  {
    question: "Cửa Hà Việt có giao hàng và lắp đặt tại Hà Nội không?",
    answer: "Có. Cửa Hà Việt chuyên phục vụ khách hàng tại Hà Nội với dịch vụ giao hàng tận nơi và lắp đặt chuyên nghiệp bởi đội ngũ kỹ thuật viên giàu kinh nghiệm.",
  },
  {
    question: "Giá cửa cuốn Austdoor tại Cửa Hà Việt là bao nhiêu?",
    answer: "Giá cửa cuốn Austdoor tại Cửa Hà Việt dao động từ 850.000đ đến 6.000.000đ/m² tùy theo dòng sản phẩm. Liên hệ hotline 0919 086 272 để được báo giá chi tiết.",
  },
  {
    question: "Làm thế nào để chọn loại cửa cuốn phù hợp?",
    answer: "Việc chọn cửa cuốn phụ thuộc vào nhu cầu sử dụng: Cửa cuốn khe thoáng phù hợp cho garage, kho hàng. Cửa cuốn tấm liền phù hợp cho cửa hàng, nhà ở cần bảo mật cao. Liên hệ Cửa Hà Việt để được tư vấn miễn phí.",
  },
  {
    question: "Thời gian lắp đặt cửa cuốn mất bao lâu?",
    answer: "Thời gian lắp đặt cửa cuốn thường từ 2-4 giờ tùy theo kích thước và loại cửa. Đối với công trình lớn có thể mất 1-2 ngày. Đội ngũ kỹ thuật Cửa Hà Việt cam kết thi công nhanh chóng, đảm bảo chất lượng.",
  },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(8);
  const newArrivals = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground py-2.5 text-center text-sm">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2">
          <Gift className="h-4 w-4" />
          <span className="font-medium">
            Chuyên cửa cuốn Austdoor chính hãng tại Hà Nội - Bảo hành lên đến 5 năm
          </span>
          <Gift className="h-4 w-4" />
        </div>
      </div>

      {/* Hero Section - Modern Split Design */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span>Đại lý chính hãng Austdoor #1</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Nâng tầm
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                  không gian sống
                </span>
              </h1>

              <p className="text-xl text-white/70 max-w-lg leading-relaxed">
                Hệ thống cửa cuốn cao cấp Austdoor - Giải pháp an ninh toàn diện
                với công nghệ tiên tiến từ Nhật Bản.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/san-pham">
                  <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 h-14 rounded-full">
                    Khám phá ngay
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <a href="tel:0919086272">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto gap-2 text-base px-8 h-14 rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                  >
                    <Phone className="h-5 w-5" />
                    Hotline: 0919 086 272
                  </Button>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/60 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">5,000+</p>
                    <p className="text-white/50">Khách hàng tin dùng</p>
                  </div>
                </div>
                <div className="h-12 w-px bg-white/20" />
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm font-medium">4.9/5</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Main Card */}
                <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 flex items-center justify-center">
                  <div className="text-center text-white/80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="180"
                      height="180"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto opacity-40"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 7h18" />
                      <path d="M3 11h18" />
                      <path d="M3 15h18" />
                      <path d="M3 19h18" />
                    </svg>
                    <p className="mt-4 text-sm">Cửa cuốn Austdoor</p>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-2xl p-4 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <BadgeCheck className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Chính hãng</p>
                      <p className="text-sm text-slate-500">100% Austdoor</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Bảo hành 5 năm</p>
                      <p className="text-sm text-slate-500">Hỗ trợ trọn đời</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Bar */}
      <section className="bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { icon: Truck, title: "Giao hàng tận nơi", desc: "Khu vực Hà Nội" },
              { icon: Shield, title: "Bảo hành 5 năm", desc: "Chính hãng" },
              { icon: Headphones, title: "Tư vấn 24/7", desc: "Hỗ trợ nhiệt tình" },
              { icon: Clock, title: "Lắp đặt chuyên nghiệp", desc: "Đội ngũ kỹ thuật" },
            ].map((item, idx) => (
              <div key={idx} className="py-6 px-4 flex items-center gap-4 justify-center">
                <item.icon className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid - Modern Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/10">Danh mục sản phẩm</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Khám phá bộ sưu tập</h2>
            </div>
            <Link href="/san-pham" className="hidden md:flex items-center gap-1 text-primary hover:underline font-medium">
              Xem tất cả <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                slug: "cua-cuon-tam-lien",
                title: "Cửa cuốn tấm liền",
                desc: "An toàn tuyệt đối",
                count: "7 sản phẩm",
                gradient: "from-blue-500 to-blue-600",
              },
              {
                slug: "cua-cuon-khe-thoang",
                title: "Cửa cuốn khe thoáng",
                desc: "Thông thoáng & hiện đại",
                count: "8 sản phẩm",
                gradient: "from-emerald-500 to-emerald-600",
              },
              {
                slug: "motor",
                title: "Motor cửa cuốn",
                desc: "Vận hành mượt mà",
                count: "20+ sản phẩm",
                gradient: "from-orange-500 to-orange-600",
              },
              {
                slug: "phu-kien",
                title: "Phụ kiện & Lưu điện",
                desc: "Hoàn thiện hệ thống",
                count: "10+ sản phẩm",
                gradient: "from-purple-500 to-purple-600",
              },
            ].map((cat) => (
              <Link key={cat.slug} href={`/san-pham?category=${cat.slug}`}>
                <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                  <CardContent className="p-0">
                    <div className={`aspect-[4/3] bg-gradient-to-br ${cat.gradient} p-6 flex flex-col justify-end relative overflow-hidden`}>
                      {/* Decorative circles */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                      <div className="relative z-10">
                        <Badge variant="secondary" className="mb-2 bg-white/20 text-white border-0 hover:bg-white/30">
                          {cat.count}
                        </Badge>
                        <h3 className="text-xl font-bold text-white mb-1">{cat.title}</h3>
                        <p className="text-white/80 text-sm">{cat.desc}</p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between bg-card">
                      <span className="text-sm font-medium">Xem sản phẩm</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/10">
                <TrendingUp className="h-3 w-3 mr-1" />
                Bán chạy nhất
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Sản phẩm nổi bật</h2>
              <p className="text-muted-foreground mt-2">Được khách hàng tin tưởng lựa chọn</p>
            </div>
            <Link href="/san-pham">
              <Button variant="outline" className="gap-2 rounded-full">
                Xem tất cả <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-8 md:p-16">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-white/5 rounded-full translate-y-1/2" />

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <Badge className="mb-4 bg-white/20 text-white border-0">Ưu đãi đặc biệt</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Giá tốt nhất<br />khu vực Hà Nội
                </h2>
                <p className="text-white/80 mb-6 text-lg">
                  Đội ngũ kỹ thuật chuyên nghiệp với hơn 10 năm kinh nghiệm.
                  Cam kết thi công chuẩn kỹ thuật, bảo hành dài hạn.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/san-pham">
                    <Button variant="secondary" size="lg" className="rounded-full gap-2">
                      Đặt hàng ngay <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/lien-he">
                    <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
                      Tư vấn miễn phí
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="hidden md:flex justify-center">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "10+", label: "Năm kinh nghiệm" },
                    { value: "5000+", label: "Công trình" },
                    { value: "50+", label: "Kỹ thuật viên" },
                    { value: "99%", label: "Hài lòng" },
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white">
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm text-white/70">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - New Design */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/10">Tại sao chọn chúng tôi</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cam kết chất lượng vượt trội</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cửa Hà Việt tự hào là đại lý phân phối cửa cuốn Austdoor uy tín hàng đầu
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BadgeCheck,
                title: "100% Chính hãng",
                desc: "Sản phẩm Austdoor chính hãng với đầy đủ tem, nhãn mác và giấy tờ bảo hành. Không hàng nhái, hàng giả.",
                highlight: "bg-blue-50 text-blue-600",
              },
              {
                icon: Shield,
                title: "Bảo hành 5 năm",
                desc: "Chính sách bảo hành dài hạn 5 năm cho nan cửa, 2 năm cho motor. Hỗ trợ kỹ thuật trọn đời sản phẩm.",
                highlight: "bg-green-50 text-green-600",
              },
              {
                icon: Truck,
                title: "Lắp đặt chuyên nghiệp",
                desc: "Đội ngũ kỹ thuật viên chuyên nghiệp, được đào tạo bài bản. Thi công nhanh, chuẩn kỹ thuật.",
                highlight: "bg-orange-50 text-orange-600",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${feature.highlight} mb-6`}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps - Timeline Style */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/10">Quy trình</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">4 bước đơn giản</h2>
            <p className="text-muted-foreground">Sở hữu cửa cuốn Austdoor chính hãng nhanh chóng</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

              {[
                { step: 1, title: "Liên hệ tư vấn", desc: "Gọi hotline 0919 086 272 hoặc để lại thông tin, chúng tôi sẽ liên hệ ngay" },
                { step: 2, title: "Khảo sát miễn phí", desc: "Đội ngũ kỹ thuật đến tận nơi đo đạc, tư vấn mẫu mã và báo giá" },
                { step: 3, title: "Xác nhận đơn hàng", desc: "Ký hợp đồng, đặt cọc và xác nhận thời gian thi công" },
                { step: 4, title: "Lắp đặt & Nghiệm thu", desc: "Thi công chuyên nghiệp, bàn giao và hướng dẫn sử dụng" },
              ].map((item, idx) => (
                <div key={idx} className={`relative flex items-center gap-8 mb-12 last:mb-0 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`flex-1 ${idx % 2 === 1 ? 'md:text-right' : ''}`}>
                    <Card className="inline-block border-0 shadow-lg">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-xl shadow-lg">
                    {item.step}
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Modern Cards */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/10">
              <MessageCircle className="h-3 w-3 mr-1" />
              Đánh giá
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Khách hàng nói gì về chúng tôi</h2>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <span>Đánh giá trung bình</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold text-foreground">4.9/5</span>
              <span>(500+ đánh giá)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Anh Minh Tuấn",
                role: "Chủ nhà tại Quận 7, TP.HCM",
                content: "Rất hài lòng với chất lượng cửa cuốn và dịch vụ của Cửa Hà Việt. Đội ngũ tư vấn nhiệt tình, lắp đặt chuyên nghiệp. Cửa vận hành êm ái, thiết kế đẹp.",
                rating: 5,
              },
              {
                name: "Chị Thanh Hương",
                role: "Chủ cửa hàng tại Bình Dương",
                content: "Đã lắp cửa cuốn Austdoor cho 3 mặt bằng kinh doanh. Giá cả hợp lý, bảo hành tốt. Khi có vấn đề gọi là có người hỗ trợ ngay. Rất tin tưởng!",
                rating: 5,
              },
              {
                name: "Anh Văn Đức",
                role: "Chủ xưởng tại Đồng Nai",
                content: "Cần lắp cửa cuốn công nghiệp gấp, Cửa Hà Việt thi công chỉ trong 2 ngày. Cửa chắc chắn, motor khỏe. Đã giới thiệu cho nhiều đối tác.",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {testimonial.name.split(' ').pop()?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/10">
              <HelpCircle className="h-3 w-3 mr-1" />
              Câu hỏi thường gặp
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">FAQ</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Giải đáp các thắc mắc phổ biến về cửa cuốn Austdoor
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {homeFAQs.map((faq, idx) => (
              <Card key={idx} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                      <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ JSON-LD */}
      <FAQJsonLd faqs={homeFAQs} />

      {/* Breadcrumb JSON-LD */}
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
        ]}
      />

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Bạn cần tư vấn?
                  </h2>
                  <p className="text-white/70 mb-8 text-lg">
                    Để lại thông tin, chúng tôi sẽ liên hệ tư vấn miễn phí và báo giá tốt nhất cho bạn.
                  </p>

                  <div className="space-y-4">
                    <a href="tel:0919086272" className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                      <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-white/60">Hotline</p>
                        <p className="text-xl font-bold">0919 086 272</p>
                      </div>
                    </a>

                    <a href="https://zalo.me/0123456789" className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                      <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-white/60">Zalo tư vấn</p>
                        <p className="text-xl font-bold">Chat ngay</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="p-8 md:p-12 bg-card">
                  <h3 className="text-xl font-bold mb-6">Đăng ký nhận tư vấn</h3>
                  <form className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Họ và tên *"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Số điện thoại *"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Nội dung cần tư vấn"
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      />
                    </div>
                    <Button size="lg" className="w-full rounded-lg">
                      Gửi yêu cầu tư vấn
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Chúng tôi sẽ liên hệ lại trong vòng 30 phút
                    </p>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
