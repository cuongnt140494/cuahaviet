"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/contexts";
import { X, Scale, Trash2, ArrowRight, Package } from "lucide-react";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export function CompareBar() {
  const { items, removeItem, clearAll } = useCompare();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
        {/* Mobile Layout */}
        <div className="flex md:hidden flex-col gap-3">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <Scale className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">So sánh ({items.length}/3)</p>
              </div>
            </div>
            <button
              onClick={clearAll}
              className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              aria-label="Xóa tất cả sản phẩm so sánh"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Products Row - Scrollable */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-3 px-3">
            {items.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-2 py-1.5 shrink-0"
              >
                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                  <Package className="h-4 w-4 text-white/50" />
                </div>
                <p className="text-xs font-medium truncate max-w-[80px]">{product.name}</p>
                <button
                  onClick={() => removeItem(product.id)}
                  className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  aria-label={`Xóa ${product.name} khỏi so sánh`}
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <Link href="/so-sanh" className="block">
            <Button
              size="sm"
              disabled={items.length < 2}
              className="w-full h-9 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white gap-1.5 shadow-lg text-sm"
            >
              So sánh ngay
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">So sánh</p>
                <p className="text-xs text-white/60">{items.length}/3 sản phẩm</p>
              </div>
            </div>

            <div className="h-8 w-px bg-white/20 shrink-0" />

            {items.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 shrink-0"
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-white/50" />
                </div>
                <div className="max-w-[140px]">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-primary">
                    {formatPrice(product.wholesalePrice || product.price)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(product.id)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  aria-label={`Xóa ${product.name} khỏi so sánh`}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl gap-2"
              aria-label="Xóa tất cả sản phẩm so sánh"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Xóa tất cả</span>
            </Button>
            <Link href="/so-sanh">
              <Button
                size="sm"
                disabled={items.length < 2}
                className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white gap-2 shadow-lg"
              >
                So sánh ngay
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
