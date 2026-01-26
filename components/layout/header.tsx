"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";
import { useCart } from "@/contexts";
import { categoryLabels } from "@/types";
import {
  Phone,
  Mail,
  ShoppingCart,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Clock,
  Home,
  Package,
  Users,
  FileText,
  MessageCircle,
  Sparkles,
  Shield,
  Truck,
} from "lucide-react";

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [productExpanded, setProductExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems: cartTotal } = useCart();

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const closeDrawer = () => {
    setDrawerOpen(false);
    setProductExpanded(false);
  };

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}>
        {/* Top Bar - Premium look */}
        <div className="bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="flex h-11 items-center justify-between text-sm">
              {/* Left - Contact Info */}
              <div className="hidden md:flex items-center divide-x divide-white/20">
                <a href="tel:0919086272" className="flex items-center gap-2 pr-4 hover:text-white/80 transition-colors">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <Phone className="h-3 w-3" />
                  </div>
                  <span className="font-semibold">0919 086 272</span>
                </a>
                <div className="flex items-center gap-2 px-4">
                  <Clock className="h-4 w-4 opacity-80" />
                  <span>8:00 - 18:00</span>
                </div>
                <a href="mailto:contact@cuahaviet.vn" className="flex items-center gap-2 pl-4 hover:text-white/80 transition-colors">
                  <Mail className="h-4 w-4 opacity-80" />
                  <span>contact@cuahaviet.vn</span>
                </a>
              </div>

              {/* Mobile - Hotline */}
              <a href="tel:0919086272" className="flex md:hidden items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="font-semibold">0919 086 272</span>
              </a>

              {/* Right - Features & Social */}
              <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5" />
                    Bảo hành 5 năm
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5" />
                    Chuyên Hà Nội
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                     className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                     aria-label="Facebook">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://zalo.me/0919086272" target="_blank" rel="noopener noreferrer"
                     className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                     aria-label="Zalo">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm-2.5 26.5h-5v-5h5v5zm0-7h-5v-8h5v8zm9 7h-5v-5h5v5zm0-7h-5v-8h5v8z"/>
                    </svg>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                     className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                     aria-label="YouTube">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className={`bg-background border-b transition-all duration-300 ${scrolled ? "shadow-sm" : ""}`}>
          <div className="container mx-auto px-4">
            <div className="flex h-[72px] items-center gap-4">
              {/* Mobile Menu Toggle */}
              <button
                className="flex xl:hidden h-11 w-11 items-center justify-center rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all"
                onClick={() => setDrawerOpen(true)}
                aria-label="Mở menu"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 shrink-0">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
                    <span className="text-2xl font-bold text-primary-foreground">C</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 shadow-sm">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Cửa Hà Việt
                  </span>
                  <p className="text-[11px] text-muted-foreground font-medium">
                    Đại lý Austdoor chính hãng
                  </p>
                </div>
              </Link>

              {/* Desktop Search */}
              <div className="hidden lg:flex flex-1 justify-center max-w-lg mx-4">
                <SearchBar />
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden xl:flex items-center">
                <Link
                  href="/"
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  Trang chủ
                </Link>
                <div className="relative group">
                  <Link
                    href="/san-pham"
                    className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Sản phẩm
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-background border-2 border-border rounded-2xl shadow-xl p-2 min-w-[240px]">
                      {Object.entries(categoryLabels).map(([slug, label]) => (
                        <Link
                          key={slug}
                          href={`/san-pham?category=${slug}`}
                          className="flex items-center gap-3 px-4 py-3 text-sm rounded-xl hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                            <Package className="h-4 w-4 text-primary" />
                          </div>
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <Link
                  href="/gioi-thieu"
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  Giới thiệu
                </Link>
                <Link
                  href="/bai-viet"
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  Bài viết
                </Link>
                <Link
                  href="/lien-he"
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  Liên hệ
                </Link>
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-2 ml-auto">
                {/* Hotline Button (Desktop) */}
                <a href="tel:0919086272" className="hidden lg:block">
                  <Button className="h-11 px-5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/25 gap-2 text-white">
                    <Phone className="h-4 w-4" />
                    <span className="font-semibold">Gọi ngay</span>
                  </Button>
                </a>

                {/* Mobile Search Toggle */}
                <button
                  className="flex lg:hidden h-11 w-11 items-center justify-center rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all"
                  onClick={() => setSearchOpen(!searchOpen)}
                  aria-label="Tìm kiếm"
                >
                  <Search className="h-5 w-5" />
                </button>

                {/* Cart */}
                <Link href="/gio-hang" aria-label={`Giỏ hàng${cartTotal > 0 ? ` (${cartTotal} sản phẩm)` : ''}`}>
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all">
                    <ShoppingCart className="h-5 w-5" />
                    {cartTotal > 0 && (
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-[10px] font-bold text-white shadow-lg" aria-hidden="true">
                        {cartTotal}
                      </span>
                    )}
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          {/* Search Container */}
          <div className="absolute top-0 left-0 right-0 bg-background p-4 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <SearchBar onClose={() => setSearchOpen(false)} />
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="h-11 w-11 flex items-center justify-center rounded-xl border-2 border-border hover:bg-muted transition-colors shrink-0"
                aria-label="Đóng tìm kiếm"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-all duration-300 xl:hidden ${
          drawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeDrawer}
      />

      {/* Mobile Drawer Menu - Slides from Left */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] max-w-[85vw] bg-background z-[70] transform transition-transform duration-300 ease-out xl:hidden shadow-2xl ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <span className="text-xl font-bold">C</span>
            </div>
            <div>
              <span className="font-bold text-lg">Cửa Hà Việt</span>
              <p className="text-xs opacity-80">Đại lý Austdoor chính hãng</p>
            </div>
          </div>
          <button
            onClick={closeDrawer}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Đóng menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex flex-col h-[calc(100%-84px)] overflow-y-auto">
          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-primary/5 transition-colors group"
              onClick={closeDrawer}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Home className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium">Trang chủ</span>
            </Link>

            {/* Products with Expandable Submenu */}
            <div>
              <button
                className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl hover:bg-primary/5 transition-colors group"
                onClick={() => setProductExpanded(!productExpanded)}
              >
                <span className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">Sản phẩm</span>
                </span>
                <ChevronRight
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                    productExpanded ? "rotate-90" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  productExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-4 pl-6 border-l-2 border-primary/20 space-y-1 py-2">
                  <Link
                    href="/san-pham"
                    className="block px-4 py-2.5 text-sm rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                    onClick={closeDrawer}
                  >
                    Tất cả sản phẩm
                  </Link>
                  {Object.entries(categoryLabels).map(([slug, label]) => (
                    <Link
                      key={slug}
                      href={`/san-pham?category=${slug}`}
                      className="block px-4 py-2.5 text-sm rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                      onClick={closeDrawer}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/gioi-thieu"
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-primary/5 transition-colors group"
              onClick={closeDrawer}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium">Giới thiệu</span>
            </Link>

            <Link
              href="/bai-viet"
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-primary/5 transition-colors group"
              onClick={closeDrawer}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium">Bài viết</span>
            </Link>

            <Link
              href="/lien-he"
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-primary/5 transition-colors group"
              onClick={closeDrawer}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium">Liên hệ</span>
            </Link>

            <Link
              href="/gio-hang"
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-primary/5 transition-colors group"
              onClick={closeDrawer}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <ShoppingCart className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium">Giỏ hàng</span>
              {cartTotal > 0 && (
                <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-xs font-bold text-white">
                  {cartTotal}
                </span>
              )}
            </Link>
          </nav>

          {/* Drawer Footer */}
          <div className="border-t p-4 space-y-4 bg-muted/30">
            {/* CTA Button */}
            <a href="tel:0919086272" className="block">
              <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg gap-2 text-base text-white">
                <Phone className="h-5 w-5" />
                Gọi ngay: 0919 086 272
              </Button>
            </a>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="mailto:contact@cuahaviet.vn"
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-background border-2 border-border hover:border-primary/50 transition-colors"
              >
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground">Email</span>
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-background border-2 border-border hover:border-primary/50 transition-colors"
              >
                <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 48 48">
                  <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm-2.5 26.5h-5v-5h5v5zm0-7h-5v-8h5v8zm9 7h-5v-5h5v5zm0-7h-5v-8h5v8z"/>
                </svg>
                <span className="text-xs text-muted-foreground">Zalo</span>
              </a>
            </div>

            {/* Features */}
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-primary" />
                Bảo hành 5 năm
              </span>
              <span className="flex items-center gap-1">
                <Truck className="h-3.5 w-3.5 text-primary" />
                Chuyên Hà Nội
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
