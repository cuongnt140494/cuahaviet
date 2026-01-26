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
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
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
                >
                  <X className="h-4 w-4" />
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
            >
              <Trash2 className="h-4 w-4" />
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
