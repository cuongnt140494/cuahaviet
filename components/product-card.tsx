"use client";

import Link from "next/link";
import { Product, categoryLabels, seriesLabels } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart, useToast, useCompare, useQuickView } from "@/contexts";
import {
  ShoppingCart,
  Check,
  Eye,
  BarChart3,
  Package,
  Sparkles,
  Star,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

function calculateDiscount(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100);
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, getItemQuantity } = useCart();
  const { addItem: addToCompare, isInCompare, canAdd } = useCompare();
  const { addToast } = useToast();
  const { openQuickView } = useQuickView();

  const inCart = getItemQuantity(product.id) > 0;
  const inCompare = isInCompare(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    addToast(`Đã thêm "${product.name}" vào giỏ hàng`);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      addToast(`Đã xóa "${product.name}" khỏi so sánh`, "info");
    } else if (canAdd) {
      const added = addToCompare(product);
      if (added) {
        addToast(`Đã thêm "${product.name}" vào so sánh`);
      }
    } else {
      addToast("Chỉ có thể so sánh tối đa 3 sản phẩm", "error");
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const hasDiscount = product.wholesalePrice && product.wholesalePrice < product.price;
  const discountPercent = hasDiscount ? calculateDiscount(product.price, product.wholesalePrice!) : 0;

  return (
    <div className="group relative bg-card rounded-2xl md:rounded-3xl overflow-hidden border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-500">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/80 via-muted/50 to-muted/30">
        {/* Product Image Placeholder with hover zoom */}
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-110">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-150" />
            <Package className="h-16 w-16 md:h-24 md:w-24 text-muted-foreground/40 relative z-10" />
          </div>
        </div>

        {/* Top Left Badges */}
        <div className="absolute top-2.5 left-2.5 md:top-4 md:left-4 flex flex-col gap-1.5 md:gap-2 z-10">
          {hasDiscount && (
            <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0 rounded-lg px-2 py-0.5 md:px-2.5 md:py-1 text-[10px] md:text-xs font-semibold shadow-lg shadow-rose-500/25">
              -{discountPercent}%
            </Badge>
          )}
          {product.inStock ? (
            <Badge className="bg-emerald-500/90 text-white border-0 rounded-lg px-2 py-0.5 md:px-2.5 md:py-1 text-[10px] md:text-xs font-medium backdrop-blur-sm">
              Còn hàng
            </Badge>
          ) : (
            <Badge variant="secondary" className="rounded-lg px-2 py-0.5 md:px-2.5 md:py-1 text-[10px] md:text-xs bg-muted/90 backdrop-blur-sm">
              Hết hàng
            </Badge>
          )}
        </div>

        {/* Top Right Action Buttons */}
        <div className="absolute top-2.5 right-2.5 md:top-4 md:right-4 flex flex-col gap-1.5 md:gap-2 z-10">
          {/* Compare Button */}
          <button
            onClick={handleToggleCompare}
            className={`h-8 w-8 md:h-10 md:w-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-sm ${
              inCompare
                ? "bg-primary text-primary-foreground scale-110"
                : "bg-white/80 dark:bg-slate-800/80 text-muted-foreground hover:bg-white dark:hover:bg-slate-800 hover:text-primary hover:scale-110"
            }`}
            title={inCompare ? "Bỏ so sánh" : "So sánh"}
            aria-label={inCompare ? "Bỏ so sánh" : "So sánh"}
          >
            <BarChart3 className="h-4 w-4" aria-hidden="true" />
          </button>
          {/* Quick View Button */}
          <button
            onClick={handleQuickView}
            className="h-8 w-8 md:h-10 md:w-10 rounded-xl flex items-center justify-center bg-white/80 dark:bg-slate-800/80 text-muted-foreground hover:bg-white dark:hover:bg-slate-800 hover:text-primary hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-sm"
            title="Xem nhanh"
            aria-label="Xem nhanh"
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Bottom Overlay - Quick Add */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <Button
            size="sm"
            variant={inCart ? "secondary" : "default"}
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className="w-full h-9 md:h-11 rounded-xl font-semibold text-xs md:text-sm gap-2 shadow-lg"
            aria-label={inCart ? "Đã thêm vào giỏ hàng" : "Thêm vào giỏ hàng"}
          >
            {inCart ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Đã thêm</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                <span>Thêm vào giỏ</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 md:p-5 space-y-2 md:space-y-3">
        {/* Category & Series */}
        <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
          <Badge variant="outline" className="rounded-md px-1.5 py-0 md:px-2 md:py-0.5 text-[9px] md:text-[11px] font-medium border-primary/30 text-primary bg-primary/5">
            {categoryLabels[product.category]}
          </Badge>
          <span className="text-[9px] md:text-[11px] text-muted-foreground">
            {seriesLabels[product.series]}
          </span>
        </div>

        {/* Title */}
        <Link href={`/san-pham/${product.slug}`} className="block">
          <h3 className="font-bold text-sm md:text-base leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300 min-h-[2.5rem] md:min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        {/* Rating - Simulated */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 md:h-3.5 md:w-3.5 ${
                  star <= 5 ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] md:text-xs text-muted-foreground">(5.0)</span>
        </div>

        {/* Price */}
        <div className="pt-1 md:pt-2 border-t border-border/50">
          <div className="flex items-end justify-between gap-2">
            <div className="space-y-0.5">
              {hasDiscount ? (
                <>
                  <p className="text-base md:text-xl font-bold text-primary">
                    {formatPrice(product.wholesalePrice!)}
                  </p>
                  <p className="text-[10px] md:text-sm text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </p>
                </>
              ) : (
                <p className="text-base md:text-xl font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
              )}
              <p className="text-[9px] md:text-xs text-muted-foreground">
                Đơn giá / {product.unit}
              </p>
            </div>

            {/* Mobile Add to Cart Button */}
            <Button
              size="icon"
              variant={inCart ? "secondary" : "default"}
              disabled={!product.inStock}
              onClick={handleAddToCart}
              className="h-9 w-9 md:hidden rounded-xl shrink-0 shadow-md"
              aria-label={inCart ? "Đã thêm vào giỏ hàng" : "Thêm vào giỏ hàng"}
            >
              {inCart ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl md:rounded-3xl ring-1 ring-inset ring-black/5 dark:ring-white/5 group-hover:ring-primary/20 transition-all duration-500 pointer-events-none" />
    </div>
  );
}
