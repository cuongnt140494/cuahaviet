import Link from "next/link";
import { categoryLabels } from "@/types";
import { Phone, Mail, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-primary mb-2">
                <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
                <span className="text-xs md:text-sm font-medium">Đăng ký nhận tin</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">
                Nhận thông tin khuyến mãi
              </h3>
              <p className="text-slate-400 text-sm md:text-base">
                Nhận ngay ưu đãi 5% cho đơn hàng đầu tiên
              </p>
            </div>
            <div className="flex flex-col sm:flex-row w-full max-w-md gap-2 md:gap-3">
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                className="h-11 md:h-12 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-xl focus:border-primary flex-1"
              />
              <Button className="h-11 md:h-12 px-4 md:px-6 rounded-xl gap-2 shrink-0">
                Đăng ký
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4 md:space-y-6 col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="flex h-11 w-11 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
                <span className="text-xl md:text-2xl font-bold text-primary-foreground">C</span>
              </div>
              <div>
                <span className="text-lg md:text-xl font-bold text-white">Cửa Hà Việt</span>
                <p className="text-[10px] md:text-xs text-slate-400">Đại lý Austdoor chính hãng</p>
              </div>
            </div>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              Chuyên cung cấp cửa cuốn Austdoor chính hãng tại Hà Nội:
              cửa cuốn khe thoáng, tấm liền, motor, lưu điện và phụ kiện.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2 md:gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-lg md:rounded-xl bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://zalo.me/0919086272"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-lg md:rounded-xl bg-slate-800 text-slate-400 hover:bg-blue-500 hover:text-white transition-all"
                aria-label="Zalo"
              >
                <svg className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm-2.5 26.5h-5v-5h5v5zm0-7h-5v-8h5v8zm9 7h-5v-5h5v5zm0-7h-5v-8h5v8z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-lg md:rounded-xl bg-slate-800 text-slate-400 hover:bg-red-600 hover:text-white transition-all"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-3 md:space-y-6">
            <h3 className="text-sm md:text-lg font-bold text-white">Sản phẩm</h3>
            <ul className="space-y-2 md:space-y-3">
              {Object.entries(categoryLabels).map(([slug, label]) => (
                <li key={slug}>
                  <Link
                    href={`/san-pham?category=${slug}`}
                    className="text-xs md:text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-slate-600 group-hover:bg-primary transition-colors shrink-0" />
                    <span className="truncate">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 md:space-y-6">
            <h3 className="text-sm md:text-lg font-bold text-white">Liên kết nhanh</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link
                  href="/gioi-thieu"
                  className="text-xs md:text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-slate-600 group-hover:bg-primary transition-colors shrink-0" />
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/san-pham"
                  className="text-xs md:text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-slate-600 group-hover:bg-primary transition-colors shrink-0" />
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  href="/bai-viet"
                  className="text-xs md:text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-slate-600 group-hover:bg-primary transition-colors shrink-0" />
                  Tin tức & Bài viết
                </Link>
              </li>
              <li>
                <Link
                  href="/lien-he"
                  className="text-xs md:text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-slate-600 group-hover:bg-primary transition-colors shrink-0" />
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 md:space-y-6 col-span-2 md:col-span-1">
            <h3 className="text-sm md:text-lg font-bold text-white">Liên hệ</h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-2 md:gap-3">
                <div className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg md:rounded-xl bg-slate-800">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] md:text-xs text-slate-500">Địa chỉ:</p>
                  <p className="text-xs md:text-sm text-white truncate">123 Đường ABC, Cầu Giấy, HN</p>
                </div>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <div className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg md:rounded-xl bg-slate-800">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-slate-500">Hotline:</p>
                  <a href="tel:0919086272" className="text-sm md:text-lg font-bold text-white hover:text-primary transition-colors">
                    0919 086 272
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <div className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg md:rounded-xl bg-slate-800">
                  <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-slate-500">Giờ làm việc:</p>
                  <p className="text-xs md:text-sm text-white">8:00 - 18:00 (T2-CN)</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <p className="text-xs md:text-sm text-slate-500 text-center md:text-left">
              &copy; 2024 Cửa Hà Việt. All rights reserved.
            </p>
            <div className="flex items-center gap-3 md:gap-6">
              <span className="text-[10px] md:text-xs text-slate-600 hidden sm:inline">Thanh toán:</span>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex h-7 md:h-8 px-2 md:px-3 items-center justify-center rounded-md md:rounded-lg bg-slate-800 text-[10px] md:text-xs text-slate-400">
                  COD
                </div>
                <div className="flex h-7 md:h-8 px-2 md:px-3 items-center justify-center rounded-md md:rounded-lg bg-slate-800 text-[10px] md:text-xs text-slate-400">
                  Bank
                </div>
                <div className="flex h-7 md:h-8 px-2 md:px-3 items-center justify-center rounded-md md:rounded-lg bg-slate-800 text-[10px] md:text-xs text-slate-400">
                  MoMo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
