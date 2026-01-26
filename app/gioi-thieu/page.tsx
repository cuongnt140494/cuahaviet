import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { pageSEO, siteConfig } from "@/lib/seo-config";
import { AboutPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import {
  Shield,
  Trophy,
  Heart,
  Lightbulb,
  Users,
  Building,
  CheckCircle,
  ArrowRight,
  Phone,
  Target,
  Eye,
  ChevronRight,
  Sparkles,
  Award,
  Clock,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: pageSEO.about.title,
  description: pageSEO.about.description,
  keywords: pageSEO.about.keywords,
  alternates: {
    canonical: `${siteConfig.url}/gioi-thieu`,
  },
  openGraph: {
    title: pageSEO.about.title,
    description: pageSEO.about.description,
    url: `${siteConfig.url}/gioi-thieu`,
    type: "website",
  },
};

const stats = [
  { value: "10+", label: "Năm kinh nghiệm", icon: <Building className="h-6 w-6" /> },
  { value: "1000+", label: "Công trình tại Hà Nội", icon: <CheckCircle className="h-6 w-6" /> },
  { value: "20+", label: "Nhân viên kỹ thuật", icon: <Users className="h-6 w-6" /> },
  { value: "99%", label: "Khách hàng hài lòng", icon: <Heart className="h-6 w-6" /> },
];

const team = [
  {
    name: "Nguyễn Văn A",
    role: "Giám đốc điều hành",
    description: "Hơn 15 năm kinh nghiệm trong ngành cửa và vật liệu xây dựng.",
  },
  {
    name: "Trần Thị B",
    role: "Giám đốc kỹ thuật",
    description: "Chuyên gia về kỹ thuật lắp đặt và thiết kế cửa cao cấp.",
  },
  {
    name: "Lê Văn C",
    role: "Trưởng phòng kinh doanh",
    description: "Đảm bảo dịch vụ tư vấn và chăm sóc khách hàng tốt nhất.",
  },
  {
    name: "Phạm Thị D",
    role: "Quản lý chất lượng",
    description: "Kiểm soát chất lượng sản phẩm và quy trình sản xuất.",
  },
];

const values = [
  {
    title: "Chất lượng",
    description:
      "Cam kết cung cấp sản phẩm chất lượng cao, đạt tiêu chuẩn quốc tế.",
    icon: <Shield className="h-8 w-8" />,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Uy tín",
    description: "Xây dựng niềm tin qua từng sản phẩm và dịch vụ chuyên nghiệp.",
    icon: <Trophy className="h-8 w-8" />,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Tận tâm",
    description: "Luôn đặt lợi ích khách hàng lên hàng đầu trong mọi hoạt động.",
    icon: <Heart className="h-8 w-8" />,
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Đổi mới",
    description:
      "Không ngừng cập nhật công nghệ và xu hướng mới nhất trong ngành.",
    icon: <Lightbulb className="h-8 w-8" />,
    color: "from-green-500 to-emerald-500",
  },
];

const timeline = [
  { year: "2014", event: "Thành lập Cửa Hà Việt tại Hà Nội" },
  { year: "2016", event: "Trở thành đại lý chính thức Austdoor" },
  { year: "2018", event: "Mở rộng đội ngũ kỹ thuật lên 20+ nhân viên" },
  { year: "2020", event: "Hoàn thành 500+ công trình" },
  { year: "2023", event: "Đạt mốc 1000+ công trình tại Hà Nội" },
];

const partners = [
  { name: "Austdoor", logo: "/images/partners/austdoor.png" },
  { name: "YKK", logo: "/images/partners/ykk.png" },
  { name: "Mitsubishi", logo: "/images/partners/mitsubishi.png" },
  { name: "Xingfa", logo: "/images/partners/xingfa.png" },
];

export default function AboutPage() {
  return (
    <>
      {/* Structured Data */}
      <AboutPageJsonLd
        name="Giới thiệu Cửa Hà Việt"
        description={pageSEO.about.description}
        url={`${siteConfig.url}/gioi-thieu`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Giới thiệu", url: "/gioi-thieu" },
        ]}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
          <nav className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-white/70 mb-6 md:mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4" aria-hidden="true" />
            <span className="text-white">Giới thiệu</span>
          </nav>
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/10 text-white border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              Về chúng tôi
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Cửa Hà Việt
            </h1>
            <p className="text-xl text-white/70 leading-relaxed">
              Được thành lập từ năm 2014, Cửa Hà Việt tự hào là đại lý phân phối
              cửa cuốn Austdoor hàng đầu tại Hà Nội. Với phương châm
              &quot;Chất lượng tạo nên thương hiệu&quot;, chúng tôi cam kết mang
              đến những sản phẩm và dịch vụ tốt nhất cho khách hàng.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-16 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-xl overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 rounded-full">
                <Clock className="h-3 w-3 mr-1" />
                Câu chuyện
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Hành trình 10 năm phát triển
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Khởi đầu từ một cửa hàng nhỏ tại Hà Nội, Cửa Hà Việt
                  đã không ngừng phát triển và mở rộng quy mô hoạt động. Sau hơn
                  10 năm, chúng tôi đã trở thành đối tác tin cậy của hàng nghìn
                  khách hàng và hàng trăm nhà thầu xây dựng trên khắp Hà Nội.
                </p>
                <p>
                  Chúng tôi hiểu rằng cửa không chỉ là một phần của ngôi nhà, mà
                  còn là điểm nhấn thẩm mỹ, đảm bảo an toàn và tiện nghi cho gia
                  đình bạn. Vì vậy, chúng tôi luôn chọn lọc kỹ càng từng sản
                  phẩm, đảm bảo chất lượng tốt nhất trước khi đến tay khách
                  hàng.
                </p>
                <p>
                  Với đội ngũ kỹ thuật viên lành nghề và hệ thống dịch vụ
                  chuyên nghiệp, Cửa Hà Việt cam kết mang đến trải nghiệm mua
                  sắm hoàn hảo từ khâu tư vấn, chọn lựa sản phẩm đến lắp đặt và
                  bảo hành.
                </p>
              </div>
            </div>
            <div className="relative">
              <Card className="border-0 shadow-2xl overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                  <Building className="h-24 w-24 text-slate-300" />
                </div>
              </Card>
              {/* Floating card */}
              <Card className="absolute -bottom-6 -left-6 border-0 shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">99%</p>
                      <p className="text-sm text-muted-foreground">Khách hàng hài lòng</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl p-4 shadow-lg">
                <Award className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 rounded-full">
              <Star className="h-3 w-3 mr-1" />
              Cột mốc
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hành trình phát triển
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20" />

              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-start gap-6 mb-8 last:mb-0">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white font-bold shadow-lg z-10">
                    {item.year}
                  </div>
                  <Card className="flex-1 border-0 shadow-lg">
                    <CardContent className="p-4">
                      <p className="font-medium">{item.event}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-xl overflow-hidden group hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-primary to-primary/80 p-8 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                    <Target className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold">Sứ mệnh</h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Mang đến cho khách hàng những giải pháp cửa cuốn chất lượng cao,
                  an toàn và tiện nghi, góp phần nâng cao chất lượng cuộc sống và
                  bảo vệ tài sản của mỗi gia đình, doanh nghiệp tại Hà Nội.
                </p>
              </div>
            </Card>
            <Card className="border-0 shadow-xl overflow-hidden group hover:shadow-2xl transition-all">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                    <Eye className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold">Tầm nhìn</h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Trở thành đơn vị phân phối cửa cuốn Austdoor hàng đầu tại Hà Nội,
                  được khách hàng tin tưởng và lựa chọn đầu tiên khi có nhu cầu
                  về cửa cuốn và các giải pháp an ninh cho công trình.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 rounded-full">
              <Heart className="h-3 w-3 mr-1" />
              Giá trị cốt lõi
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Những giá trị chúng tôi theo đuổi
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Những giá trị định hình nên bản sắc và cam kết của Cửa Hà Việt
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all group overflow-hidden">
                <CardContent className="p-8 relative">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${value.color} text-white mb-6 group-hover:scale-110 transition-transform`}>
                    {value.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 rounded-full">
              <Users className="h-3 w-3 mr-1" />
              Đội ngũ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Đội ngũ lãnh đạo</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Những người dẫn dắt Cửa Hà Việt phát triển bền vững
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all group">
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center relative overflow-hidden">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="h-14 w-14 text-primary/50" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3 rounded-full">
                    {member.role}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 rounded-full">
              <Award className="h-3 w-3 mr-1" />
              Đối tác
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Đối tác & Chứng nhận
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cửa Hà Việt tự hào là đại lý chính thức của các thương hiệu hàng đầu
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all group"
              >
                <CardContent className="p-8 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Building className="h-10 w-10 text-slate-400" />
                  </div>
                  <p className="font-semibold text-center">{partner.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-6 bg-white/10 text-white border-0">
            <Phone className="h-3 w-3 mr-1" />
            Liên hệ ngay
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Sẵn sàng bắt đầu dự án của bạn?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí và nhận
            báo giá tốt nhất cho công trình tại Hà Nội
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/san-pham">
              <Button size="lg" className="h-14 px-8 rounded-xl bg-white text-slate-900 hover:bg-white/90 gap-2 text-base">
                Xem sản phẩm
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="tel:0919086272">
              <Button
                size="lg"
                className="h-14 px-8 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white gap-2 text-base"
              >
                <Phone className="h-5 w-5" />
                0919 086 272
              </Button>
            </a>
          </div>
        </div>
        </section>
      </div>
    </>
  );
}
