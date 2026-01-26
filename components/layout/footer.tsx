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
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-primary mb-2">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium">Đăng ký nhận tin</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Nhận thông tin khuyến mãi
              </h3>
              <p className="text-slate-400">
                Nhận ngay ưu đãi 5% cho đơn hàng đầu tiên
              </p>
            </div>
            <div className="flex w-full max-w-md gap-3">
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                className="h-12 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-xl focus:border-primary"
              />
              <Button className="h-12 px-6 rounded-xl gap-2">
                Đăng ký
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
                <span className="text-2xl font-bold text-primary-foreground">C</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white">Cửa Hà Việt</span>
                <p className="text-xs text-slate-400">Đại lý Austdoor chính hãng</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Chuyên cung cấp cửa cuốn Austdoor chính hãng với đầy đủ các dòng sản phẩm:
              cửa cuốn khe thoáng, cửa cuốn tấm liền, motor, bộ lưu điện và phụ kiện.
              Giao hàng và lắp đặt tận nơi tại Hà Nội.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-blue-500 hover:text-white transition-all"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 48 48">
                  <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm-2.5 26.5h-5v-5h5v5zm0-7h-5v-8h5v8zm9 7h-5v-5h5v5zm0-7h-5v-8h5v8z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-red-600 hover:text-white transition-all"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Sản phẩm</h3>
            <ul className="space-y-3">
              {Object.entries(categoryLabels).map(([slug, label]) => (
                <li key={slug}>
                  <Link
                    href={`/san-pham?category=${slug}`}
                    className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-primary transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Liên kết nhanh</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/gioi-thieu"
                  className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-primary transition-colors" />
                  Giới thiệu công ty
                </Link>
              </li>
              <li>
                <Link
                  href="/san-pham"
                  className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-primary transition-colors" />
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  href="/bai-viet"
                  className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-primary transition-colors" />
                  Tin tức & Bài viết
                </Link>
              </li>
              <li>
                <Link
                  href="/lien-he"
                  className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-primary transition-colors" />
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach-bao-hanh"
                  className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-primary transition-colors" />
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach-doi-tra"
                  className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-primary transition-colors" />
                  Chính sách đổi trả
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Thông tin liên hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Địa chỉ:</p>
                  <p className="text-sm text-white">123 Đường ABC, Quận Cầu Giấy, Hà Nội</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Hotline:</p>
                  <a href="tel:0919086272" className="text-lg font-bold text-white hover:text-primary transition-colors">
                    0919 086 272
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Email:</p>
                  <a href="mailto:contact@cuahaviet.vn" className="text-sm text-white hover:text-primary transition-colors">
                    contact@cuahaviet.vn
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Giờ làm việc:</p>
                  <p className="text-sm text-white">8:00 - 18:00 (Thứ 2 - Chủ nhật)</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              &copy; 2024 Cửa Hà Việt. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-slate-600">Phương thức thanh toán:</span>
              <div className="flex items-center gap-3">
                <div className="flex h-8 px-3 items-center justify-center rounded-lg bg-slate-800 text-xs text-slate-400">
                  COD
                </div>
                <div className="flex h-8 px-3 items-center justify-center rounded-lg bg-slate-800 text-xs text-slate-400">
                  Bank
                </div>
                <div className="flex h-8 px-3 items-center justify-center rounded-lg bg-slate-800 text-xs text-slate-400">
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
