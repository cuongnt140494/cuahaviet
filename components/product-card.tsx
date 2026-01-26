"use client";

import Link from "next/link";
import { Product, categoryLabels, seriesLabels } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
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

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
          <Package className="h-16 w-16" />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {hasDiscount && (
            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 rounded-full">
              <Sparkles className="h-3 w-3 mr-1" />
              Giảm giá
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="rounded-full">
              Hết hàng
            </Badge>
          )}
        </div>

        {/* Action Buttons - Always visible on mobile */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
          {/* Compare Button */}
          <button
            onClick={handleToggleCompare}
            className={`p-2 md:p-2.5 rounded-xl transition-all duration-200 shadow-lg ${
              inCompare
                ? "bg-primary text-white"
                : "bg-white/90 backdrop-blur-sm hover:bg-white text-slate-600 hover:text-primary"
            }`}
            title={inCompare ? "Bỏ so sánh" : "Thêm so sánh"}
            aria-label={inCompare ? "Bỏ so sánh" : "Thêm so sánh"}
          >
            <BarChart3 className="h-4 w-4" aria-hidden="true" />
          </button>
          {/* Quick View Button */}
          <button
            onClick={handleQuickView}
            className="p-2 md:p-2.5 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white text-slate-600 hover:text-primary transition-all duration-200 shadow-lg"
            title="Xem nhanh"
            aria-label="Xem nhanh"
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-foreground rounded-full text-xs">
            {categoryLabels[product.category]}
          </Badge>
        </div>
      </div>

      <CardContent className="p-3 md:p-5">
        {/* Series */}
        <Badge variant="outline" className="mb-2 md:mb-3 rounded-full text-[10px] md:text-xs">
          {seriesLabels[product.series]}
        </Badge>

        {/* Title */}
        <Link href={`/san-pham/${product.slug}`}>
          <h3 className="font-bold text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors mb-1 md:mb-2 min-h-[2.25rem] md:min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Description - Hidden on mobile */}
        <p className="hidden md:block text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[2.5rem]">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-end justify-between gap-2 md:gap-3">
          <div className="space-y-0.5 md:space-y-1 min-w-0">
            {hasDiscount ? (
              <>
                <p className="text-sm md:text-lg font-bold text-primary truncate">
                  {formatPrice(product.wholesalePrice!)}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground line-through truncate">
                  {formatPrice(product.price)}
                </p>
              </>
            ) : (
              <p className="text-sm md:text-lg font-bold text-primary truncate">
                {formatPrice(product.price)}
              </p>
            )}
            <p className="text-[10px] md:text-xs text-muted-foreground">
              /{product.unit}
            </p>
          </div>

          {/* Mobile: Icon button, Desktop: Full button */}
          <Button
            size="sm"
            variant={inCart ? "secondary" : "default"}
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className={`shrink-0 ${
              inCart
                ? "h-8 w-8 md:h-10 md:w-auto p-0 md:px-4 rounded-full md:rounded-xl"
                : "h-8 w-8 md:h-10 md:w-auto p-0 md:px-4 rounded-full md:rounded-xl"
            }`}
            aria-label={inCart ? "Đã thêm vào giỏ hàng" : "Thêm vào giỏ hàng"}
          >
            {inCart ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                <span className="hidden md:inline md:ml-1.5">Đã thêm</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                <span className="hidden md:inline md:ml-1.5">Thêm</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
