import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getCategories, getFeaturedProducts, getFeaturedTestimonials, getFAQs, getCompanyInfo } from '@/lib/data';

// Revalidate every hour
export const revalidate = 3600;

export default async function HomePage() {
  // Fetch data - currently using static content, data will be used in dynamic version
  const [, , , , companyInfo] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getFeaturedTestimonials(),
    getFAQs(),
    getCompanyInfo(),
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-amber-50/50 dark:bg-amber-900/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800">
                <span className="flex h-2 w-2 rounded-full bg-[#1b399d] animate-pulse"></span>
                <span className="text-xs font-bold text-[#1b399d] dark:text-blue-300 uppercase tracking-wide">
                  Giải pháp cửa hàng đầu Việt Nam
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight">
                Kiến tạo không gian <br />
                <span className="text-gradient">Hoàn mỹ & Bền vững</span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Chuyên cung cấp và thi công cửa cuốn, cửa nhôm kính và cửa gỗ nhựa composite cao cấp.
                Đem lại sự an toàn tuyệt đối và vẻ đẹp sang trọng cho ngôi nhà của bạn.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/san-pham">
                  <Button className="w-full sm:w-auto px-8 py-6 bg-[#1b399d] hover:bg-[#132a75] text-white rounded-xl font-bold text-base shadow-lg hover:shadow-[#1b399d]/30 transition-all">
                    Xem sản phẩm
                    <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                  </Button>
                </Link>
                <a href={`tel:${companyInfo.phone}`}>
                  <Button variant="outline" className="w-full sm:w-auto px-8 py-6 bg-white dark:bg-slate-800 text-slate-700 dark:text-white border-slate-200 dark:border-slate-700 hover:border-[#1b399d]/50 hover:text-[#1b399d] rounded-xl font-bold text-base shadow-sm transition-all">
                    <span className="material-symbols-outlined text-[#1b399d] mr-2">call</span>
                    Tư vấn miễn phí
                  </Button>
                </a>
              </div>

              <div className="pt-4 flex items-center justify-center lg:justify-start gap-8 text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-500">verified_user</span>
                  <span className="text-sm font-semibold">ISO 9001:2015</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-500">workspace_premium</span>
                  <span className="text-sm font-semibold">Top 10 Thương hiệu</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex-1 w-full relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1b399d]/20 to-transparent rounded-2xl transform translate-x-4 translate-y-4"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-200">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIQUmVz-1kC_8EUOx-8X-g-gyosd_7lN34HmpSewnX82hm-Ivt4tC7wZ1ma2_JfGE18UBiW9zJqlJVxlliGqnRFWA_Lc59smQ_QF8KJzW5HtETJE7OkBR1WJySFCkeIEaLDt8fRYjfSKZRWin2yZO-VbS45C1_DQifIzL-D27rvAvfRlVdJrL7QMa5koOgfy_0aGt3x1x41d3OgO3LHRl8bazNSQ-vOPyGrLzue5A2MJufSshG6Z-r180XQGFvJTW4Uq79RxU2VN_B"
                  alt="Cửa nhôm kính cao cấp"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                {/* Floating Stat Card */}
                <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20 flex items-center gap-4">
                  <div className="bg-[#1b399d]/10 p-3 rounded-full text-[#1b399d]">
                    <span className="material-symbols-outlined">groups</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">1000+</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Khách hàng tin dùng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-16 bg-white dark:bg-[#1e2330]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Tại sao chọn Cửa Hà Việt?</h2>
            <div className="w-20 h-1 bg-[#1b399d] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'security', color: 'blue', title: 'Bảo hành 10 năm', desc: 'Cam kết chất lượng dài lâu với chính sách bảo hành chính hãng lên đến 10 năm.' },
              { icon: 'engineering', color: 'amber', title: 'Kỹ thuật Đức', desc: 'Ứng dụng công nghệ sản xuất tiên tiến từ CHLB Đức, đảm bảo độ chính xác tuyệt đối.' },
              { icon: 'build', color: 'emerald', title: 'Lắp đặt miễn phí', desc: 'Đội ngũ kỹ thuật viên chuyên nghiệp hỗ trợ vận chuyển và lắp đặt tận nơi.' },
              { icon: 'support_agent', color: 'purple', title: 'Hỗ trợ 24/7', desc: 'Luôn sẵn sàng giải đáp mọi thắc mắc và xử lý sự cố bất kể thời gian nào.' },
            ].map((item, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-[#1b399d]/20 hover:shadow-soft transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${item.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-[#1b399d]' :
                  item.color === 'amber' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-500' :
                    item.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' :
                      'bg-purple-100 dark:bg-purple-900/30 text-purple-600'
                  }`}>
                  <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-background dark:bg-[#121520]" id="categories">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Danh mục sản phẩm</h2>
              <p className="text-slate-500 dark:text-slate-400">Khám phá các dòng cửa cao cấp phù hợp với mọi công trình</p>
            </div>
            <Link href="/san-pham" className="text-[#1b399d] font-bold hover:underline flex items-center gap-1">
              Xem tất cả danh mục
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Cửa Nhôm Kính',
                desc: 'Hệ nhôm Xingfa nhập khẩu, kính cường lực an toàn, cách âm cách nhiệt hoàn hảo.',
                badge: '45+ Mẫu mới',
                icon: 'sensor_door',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT_nUYIOVwo8F2u_oBYjavZad0cR9OHju9r-Ee8cuz7gOPd7HlmvlDYC32hk8jpN_8fCiu_5jkltSOCAD23wpiMoOMn1IrlZ7kA8sbt6YpHSO-Yd0Ue8t79yPwKM7C4dbwPReAOC0MeB6ydJPCaAxTXPjbJotg71gOydp6_XANX_Vs5sIxqJoQ2JbMPNFzvwXxyKxkvlEd8VHx4yoRUXqUcbnNi-dVLfmxlojKEB1dd6rV1V2SKWgRbk-HQSmGPNmdJcs-aIkbR3Ev',
                href: '/danh-muc/cua-nhom',
              },
              {
                title: 'Cửa Cuốn Khe Thoáng',
                desc: 'Công nghệ Austdoor siêu êm, tích hợp cảm biến đảo chiều an toàn.',
                badge: 'Bán chạy nhất',
                icon: 'garage',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwPyjYfxwyhNOg_KbI_kHt6m-3K5mtVBvzrni_9WiP6eGGg7TgNM9H3J7shOaVeScyFzosi20S_R3sOmQKscY-ALKDSLNdo5T4NXMSalaUIEdrtjcRLYRVdEHSNmyJJRj21vFO4o9kgF7i_dKhD2NbR2gOojQq_ILuCEvEuDdV5e8NlYUGgD25jS4y_2FXhji7T4EwZhIDzQgTG1D42K3-VaLMEIT653FZnxgNABu4b5ppZt-s8PqBkFPGJ4I2selfshxOfWxCM3Gv',
                href: '/danh-muc/cua-cuon',
              },
              {
                title: 'Cửa Gỗ Nhựa Composite',
                desc: 'Vẻ đẹp gỗ tự nhiên, không cong vênh, mối mọt, kháng nước tuyệt đối.',
                badge: 'Chống nước 100%',
                icon: 'nature_people',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrOEuu7SJ1CNYXr98si18j8bb5coRQveKFJ1bl0r8I5TQlEj6Riugp46HCD6Zodd5lYbSpmDJhgYi_ciWU2wCjmuXZPVAq3Bj4GPXMZ5hRsz00Py7XSblO5s6zotcVawo4QGAm5sDPce51MmMxPGj2Th8c9w0Pc4-PLpp5jWGOn6X3rIJrOf49wVVRzctBV5YfZNsY7o1Ill7U-si2iz7CQsGLfJp0RNtWMqqdeNLJvhb8paiTFZ6F-SZXH55NP7sr_9A8opJL9AWV',
                href: '/danh-muc/cua-go-composite',
              },
            ].map((cat, index) => (
              <Link key={index} href={cat.href} className="group relative rounded-2xl overflow-hidden aspect-[3/4] md:aspect-[4/5] shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300"></div>
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                    <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                    <span>{cat.badge}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                  <p className="text-white/70 text-sm line-clamp-2 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white dark:bg-[#1e2330]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Sản phẩm nổi bật</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Những mẫu cửa được khách hàng yêu thích và lựa chọn nhiều nhất trong năm nay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Cửa Nhôm Xingfa 4 Cánh',
                desc: 'Hệ 55 nhập khẩu chính hãng, kính cường lực 8mm, phụ kiện Kinlong cao cấp.',
                price: 'Liên hệ',
                badge: 'HOT',
                badgeColor: 'bg-amber-500',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB7COWVxTTBEF1CEQmti9_vifJTHTe70IcBsHnDWnxUyj4iIMqg0nmWAKuoEeFvvK_UUftVY64LJT1dxOyEq1vDRF0nSBc_mJogaG-PjMY5S91AQhTtribSHKS1St7SExn0CQnHT3j5PUj_a23AXBRUTFjXtr3YO_2yH1MmD1sfJbwdlBUGO_DYR4NZ0T1_ucStI2DEMX3Pr2ghmjEZzBt6WPAhvnrC8xbBgmGicb6rjlASHctFXaCYHiXVS20-7CMw2GNnE66FAeu',
              },
              {
                title: 'Cửa Gỗ Composite Phào Nổi',
                desc: 'Mẫu tân cổ điển sang trọng, chống nước, cách âm tốt, phù hợp cửa phòng ngủ.',
                price: '3.200.000₫',
                priceUnit: '/m²',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1LYOWqDgRuqx0Q5mKefvQBRnF0BA1UNuW-YY5Xapu_js-j86Xu5VM5TgFKW949OsDQ9aRi86A8vT1BCa5gdE4UGmW-_niofe_De-VXF8lbBixHPL_XMM1A8DuTq5xvfqQTSN2I02DcuHDYvHYG-Jrx8TX8aJN4SLcGmubei_vqYKG4XetWjAVOxdXCAkJO-93rDWfDKDYLExs62DHfEJ1bj44z3MG1MVR9FUyQrD_oIQeVbo3UjCYlaO58cO72g_Njf94IYvAVAOW',
              },
              {
                title: 'Cửa Cuốn Austdoor S52i',
                desc: 'Dòng Combi siêu êm, nan nhôm 2 lớp, tích hợp công nghệ chống sao chép mã.',
                price: 'Liên hệ',
                badge: 'Mới',
                badgeColor: 'bg-emerald-500',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSjZfBVRjnUPsc58X0ZD9Ez0qBTwkimtq_wBU5G4UC-4tlzrmvzIeKqjPcZy19FDMDQn58zC2TnaFHdv3d7FBnT9Txddqe6gOahZTXzgoOMODmFkrIvLOOEXZBydFimgLwS_ju6c2TP-RO2akQ6mjiAe8H5iDCo9J7e_ck5KqwmefXPPzDXRdOcIIHESRIBrtmKjgo5IYYfv1Zjz7vhZLFx_9V1WU0NaWzrOduN7uvRsTzVnbcW-ZMMGxnWIDYP_Ke6QKmOxTBXlqM',
              },
            ].map((product, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  {product.badge && (
                    <span className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-bold px-2 py-1 rounded z-10`}>
                      {product.badge}
                    </span>
                  )}
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button className="absolute bottom-4 right-4 bg-white text-[#1b399d] p-2 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#1b399d] transition-colors mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{product.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#1b399d] font-bold text-lg">
                      {product.price}
                      {product.priceUnit && <span className="text-xs font-normal text-slate-500">{product.priceUnit}</span>}
                    </span>
                    <button className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#1b399d] flex items-center gap-1 transition-colors">
                      Chi tiết <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-50/50 dark:bg-slate-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1b399d]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="container-custom relative z-10">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Khách hàng nói gì về chúng tôi?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Anh Minh Tuấn',
                location: 'Quận Cầu Giấy, Hà Nội',
                content: 'Tôi rất ấn tượng với tốc độ thi công của đội ngũ Hà Việt. Cửa nhôm Xingfa rất chắc chắn, cách âm tuyệt vời cho nhà mặt phố.',
                rating: 5,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_khzkpD_0qCesN6kKV7R29jI7DM7n1pFAXauecaptuv-1w7Pp6cWwEPzm5HqWFj9EzXNunyL83z48kqOAy3NyizTcqfnlJHUBAN5npYx4kiwY11Wru0u3kO7Aq6LKw7zd9VJRrvogh1V0QQOcCJqKUXkQ0ST5eYK5EMDgLN8Z1L06GKssswY56no7GrfJH9_fbFwTN63e_BiXgeXvP1fEBSxQPr87wPiDo6ukzTkfg1xhw67prsmReBvLg2u2nWZZbZl-x4F2ess9',
              },
              {
                name: 'Chị Thu Hương',
                location: 'KĐT Ecopark',
                content: 'Sản phẩm cửa gỗ nhựa Composite rất đẹp, nhìn như gỗ thật nhưng không lo mối mọt. Nhân viên tư vấn rất nhiệt tình.',
                rating: 5,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5RWq8_n0cwpBD11fjtZRwLkqxTByIfVMK3Yg0uftPdYedgQH64AtjWd6CyoQ1Jt9iuuDc_Iiy4ASCjjcpL0KR91CPL7GV-08aCRDr6H6-aG7uNvQ442nYu4MlAJX-ewpMwGz3uVcUF8_gTucmbNBWkw9Xkxn6IUXvS1dhSzWmxL8b_CMnTzkD53rRbq4T55uFlT76G7jvO9dYmdTjXOn9yDoMRLmdZ5hkYe5DvvPLDEheE9AR14etW--NgJymJZOGTRS7uunqMOKq',
              },
              {
                name: 'Chú Hoàng',
                location: 'Quận Long Biên',
                content: 'Giá cả hợp lý so với chất lượng. Bảo hành chu đáo. Đã giới thiệu cho người thân và bạn bè sử dụng dịch vụ tại đây.',
                rating: 4.5,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNJ4zWP9q-IWROBx8vZwDJ3wWGS7NJo7py-xKbpKy8r7CjKwfArfuh-w9bi8VDpDEoiKYjDsUmqax0yoq6FnuOwcuO4UFSfJEsOSqNuYfSxGsO9qjAooQiTjQ7xo9vI7yNy-H6Rbnk_Xnl3dRFHs_PrIjBzevH5yQ782PUCtdQ7ktdU-Jxed4Pr_KcfZ8A9B0x93IIjQQdRlnJ5IkI4ef_9VLsc9PW-Ds_P8CfK2Itl5CJSR2kozv6FH_fGfV36He_adWKp2p1Tmfl',
              },
            ].map((review, index) => (
              <Card key={index} className="p-8">
                <div className="flex gap-1 text-amber-500 mb-4">
                  {Array.from({ length: Math.floor(review.rating) }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                  {review.rating % 1 !== 0 && (
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                  )}
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 italic">&ldquo;{review.content}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden relative">
                    <Image src={review.image} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{review.name}</h4>
                    <p className="text-xs text-slate-500">{review.location}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background dark:bg-[#121520]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-10">Câu hỏi thường gặp</h2>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: 'Thời gian bảo hành cửa là bao lâu?',
                a: 'Tùy vào loại sản phẩm, thời gian bảo hành dao động từ 2 đến 10 năm. Cụ thể: Cửa cuốn Austdoor bảo hành 5 năm, Phụ kiện Kinlong bảo hành 2 năm, Cửa gỗ Composite bảo hành 3 năm.',
              },
              {
                q: 'Có mất phí vận chuyển và lắp đặt không?',
                a: 'Cửa Hà Việt miễn phí 100% chi phí vận chuyển và lắp đặt trong khu vực nội thành Hà Nội. Đối với các tỉnh lân cận, chúng tôi có chính sách hỗ trợ chi phí cực tốt.',
              },
              {
                q: 'Quy trình đặt hàng như thế nào?',
                a: 'Bước 1: Tư vấn và báo giá sơ bộ. Bước 2: Khảo sát đo đạc thực tế tại công trình. Bước 3: Ký hợp đồng và đặt cọc. Bước 4: Sản xuất và lắp đặt hoàn thiện. Bước 5: Nghiệm thu và bàn giao.',
              },
            ].map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 data-[state=open]:ring-2 data-[state=open]:ring-[#1b399d]/20"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <span className="text-slate-900 dark:text-white font-bold text-left">{faq.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 dark:text-slate-300 px-6 pb-4 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-[#1b399d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Sẵn sàng nâng cấp ngôi nhà của bạn?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Liên hệ ngay hôm nay để nhận tư vấn miễn phí và ưu đãi giảm giá 10% cho đơn hàng đầu tiên.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${companyInfo.phone}`}>
              <Button className="bg-white text-[#1b399d] px-8 py-6 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
                Gọi hotline: {companyInfo.phone}
              </Button>
            </a>
            <a href={`https://zalo.me/${companyInfo.zalo}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-2 border-white text-white px-8 py-6 rounded-xl font-bold hover:bg-white/10 transition-colors bg-transparent">
                Chat Zalo
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
