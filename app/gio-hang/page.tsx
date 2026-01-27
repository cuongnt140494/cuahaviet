"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts";
import { categoryLabels } from "@/types";
import { PromoCodeForm } from "@/components/promo-code-form";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Truck,
  Shield,
  CreditCard,
  ChevronRight,
  Package,
  CheckCircle,
  BadgeCheck,
  Clock,
  Headphones,
  Gift,
  Sparkles,
  Phone,
  X,
} from "lucide-react";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  // Calculate savings if wholesale prices exist
  const totalSavings = items.reduce((sum, item) => {
    if (item.product.wholesalePrice) {
      return sum + (item.product.price - item.product.wholesalePrice) * item.quantity;
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <nav className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" aria-hidden="true" />
            <span className="text-foreground font-medium">Giỏ hàng</span>
          </nav>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {[
              { step: 1, label: "Giỏ hàng", active: true, completed: false },
              { step: 2, label: "Thông tin", active: false, completed: false },
              { step: 3, label: "Thanh toán", active: false, completed: false },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                      item.active
                        ? "bg-primary text-primary-foreground"
                        : item.completed
                        ? "bg-green-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.completed ? <CheckCircle className="h-5 w-5" /> : item.step}
                  </div>
                  <span
                    className={`hidden sm:inline font-medium ${
                      item.active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className="w-8 md:w-16 h-0.5 bg-muted" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {items.length === 0 ? (
            /* Empty Cart State */
            <div className="max-w-2xl mx-auto">
              <Card className="border-0 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-br from-slate-100 to-slate-50 p-12 text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white shadow-lg mb-8">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Giỏ hàng trống</h2>
                  <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                    Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm cửa cuốn chất lượng của chúng tôi!
                  </p>
                  <Link href="/san-pham">
                    <Button size="lg" className="rounded-full gap-2 px-8 h-14 text-base">
                      <Sparkles className="h-5 w-5" />
                      Khám phá sản phẩm
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>

                {/* Features */}
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { icon: BadgeCheck, label: "Chính hãng 100%" },
                      { icon: Truck, label: "Giao hàng Hà Nội" },
                      { icon: Shield, label: "Bảo hành 5 năm" },
                      { icon: Headphones, label: "Hỗ trợ 24/7" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center">
                        <item.icon className="h-8 w-8 text-primary mb-2" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Cart with Items */
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">Giỏ hàng của bạn</h1>
                      <p className="text-muted-foreground">{totalItems} sản phẩm</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa tất cả
                  </Button>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <Card key={item.product.id} className="border-0 shadow-lg overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          {/* Product Image */}
                          <div className="sm:w-40 h-40 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center shrink-0">
                            <Package className="h-16 w-16 text-muted-foreground/30" />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 p-5">
                            <div className="flex justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <Badge variant="outline" className="mb-2 text-xs">
                                  {categoryLabels[item.product.category]}
                                </Badge>
                                <Link
                                  href={`/san-pham/${item.product.slug}`}
                                  className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2 block"
                                >
                                  {item.product.name}
                                </Link>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Đơn giá: {formatPrice(item.product.wholesalePrice || item.product.price)}/{item.product.unit}
                                </p>
                              </div>

                              {/* Remove Button */}
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                                aria-label={`Xóa ${item.product.name} khỏi giỏ hàng`}
                              >
                                <X className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>

                            {/* Quantity & Price */}
                            <div className="flex items-center justify-between mt-4">
                              {/* Quantity Selector */}
                              <div className="flex items-center bg-muted rounded-full" role="group" aria-label={`Số lượng ${item.product.name}`}>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-muted-foreground/10 transition-colors disabled:opacity-50"
                                  disabled={item.quantity <= 1}
                                  aria-label="Giảm số lượng"
                                >
                                  <Minus className="h-4 w-4" aria-hidden="true" />
                                </button>
                                <span className="w-10 text-center font-bold" aria-live="polite">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-muted-foreground/10 transition-colors"
                                  aria-label="Tăng số lượng"
                                >
                                  <Plus className="h-4 w-4" aria-hidden="true" />
                                </button>
                              </div>

                              {/* Subtotal */}
                              <div className="text-right">
                                <p className="text-2xl font-bold text-primary">
                                  {formatPrice((item.product.wholesalePrice || item.product.price) * item.quantity)}
                                </p>
                                {item.product.wholesalePrice && (
                                  <p className="text-sm text-muted-foreground line-through">
                                    {formatPrice(item.product.price * item.quantity)}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Continue Shopping */}
                <div className="pt-4">
                  <Link href="/san-pham">
                    <Button variant="outline" className="rounded-full gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Tiếp tục mua sắm
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="space-y-6">
                {/* Promo Code */}
                <Card className="border-0 shadow-lg">
                  <PromoCodeForm />
                </Card>

                {/* Order Summary */}
                <Card className="border-0 shadow-lg sticky top-24">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      Tóm tắt đơn hàng
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Tạm tính ({totalItems} sản phẩm)</span>
                      <span className="font-medium">{formatPrice(totalPrice + totalSavings)}</span>
                    </div>

                    {totalSavings > 0 && (
                      <div className="flex justify-between items-center py-2 text-green-600">
                        <span className="flex items-center gap-2">
                          <Gift className="h-4 w-4" />
                          Tiết kiệm
                        </span>
                        <span className="font-medium">-{formatPrice(totalSavings)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Phí vận chuyển</span>
                      <span className="text-sm text-muted-foreground">Tính theo khu vực</span>
                    </div>

                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Khu vực</span>
                      <span className="font-medium">Hà Nội</span>
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Tổng cộng</span>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-primary">
                            {formatPrice(totalPrice)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            (Đã bao gồm VAT)
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4 pt-0">
                    <Link href="/lien-he" className="w-full">
                      <Button size="lg" className="w-full h-14 rounded-xl text-base font-semibold shadow-lg shadow-primary/25">
                        Tiến hành đặt hàng
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </Link>

                    <div className="w-full p-4 rounded-xl bg-muted/50">
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <p className="text-muted-foreground">Cần hỗ trợ? Gọi ngay</p>
                          <p className="font-bold">0919 086 272</p>
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>

                {/* Trust Badges */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-4">Cam kết của chúng tôi</h3>
                    <div className="space-y-3">
                      {[
                        { icon: BadgeCheck, text: "Sản phẩm chính hãng 100%" },
                        { icon: Truck, text: "Giao hàng khu vực Hà Nội" },
                        { icon: Shield, text: "Bảo hành chính hãng 5 năm" },
                        { icon: Clock, text: "Lắp đặt chuyên nghiệp" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 text-primary shrink-0" />
                          <span className="text-sm text-white/90">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Methods */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">Phương thức thanh toán</p>
                  <div className="flex items-center justify-center gap-3">
                    {["COD", "Chuyển khoản", "MoMo", "VNPay"].map((method) => (
                      <div
                        key={method}
                        className="px-4 py-2 bg-muted rounded-lg text-xs font-medium"
                      >
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA - Only show when cart has items */}
      {items.length > 0 && (
        <section className="py-12 bg-muted/30 border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Cần tư vấn thêm về sản phẩm?</h2>
              <p className="text-muted-foreground mb-6">
                Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn 24/7
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:0919086272">
                  <Button size="lg" variant="outline" className="rounded-full gap-2 px-8">
                    <Phone className="h-5 w-5" />
                    Gọi ngay: 0919 086 272
                  </Button>
                </a>
                <Link href="/lien-he">
                  <Button size="lg" className="rounded-full gap-2 px-8">
                    Gửi yêu cầu tư vấn
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
