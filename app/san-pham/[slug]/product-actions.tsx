"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart, useCompare } from "@/contexts";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Phone,
  Minus,
  Plus,
  Check,
  Scale,
  Heart,
  Share2,
  CheckCircle,
  Gift,
  Sparkles,
} from "lucide-react";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addItem, getItemQuantity } = useCart();
  const { addItem: addToCompare, removeItem: removeFromCompare, isInCompare } = useCompare();
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const inCart = getItemQuantity(product.id) > 0;
  const inCompare = isInCompare(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleCompareToggle = () => {
    if (inCompare) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Quantity & Add to Cart */}
      <div className="flex items-center gap-3">
        {/* Quantity Selector */}
        <div className="flex items-center bg-slate-100 rounded-2xl p-1 shrink-0" role="group" aria-label="Số lượng">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-11 w-11 rounded-xl flex items-center justify-center hover:bg-white hover:shadow-sm transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:shadow-none"
            disabled={quantity <= 1}
            aria-label="Giảm số lượng"
          >
            <Minus className="h-4 w-4 text-slate-600" aria-hidden="true" />
          </button>
          <span className="w-12 text-center font-bold text-lg text-slate-900" aria-live="polite">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="h-11 w-11 rounded-xl flex items-center justify-center hover:bg-white hover:shadow-sm transition-all"
            aria-label="Tăng số lượng"
          >
            <Plus className="h-4 w-4 text-slate-600" aria-hidden="true" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          size="lg"
          className={`flex-1 h-12 md:h-14 rounded-2xl text-sm md:text-base font-semibold transition-all duration-300 ${
            inCart || justAdded
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25"
              : "bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg shadow-primary/25"
          }`}
        >
          {justAdded ? (
            <>
              <Sparkles className="h-5 w-5 mr-2 animate-pulse" />
              <span>Đã thêm thành công!</span>
            </>
          ) : inCart ? (
            <>
              <Check className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Thêm tiếp vào giỏ</span>
              <span className="sm:hidden">Đã thêm</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Thêm vào giỏ hàng</span>
              <span className="sm:hidden">Thêm giỏ hàng</span>
            </>
          )}
        </Button>
      </div>

      {/* Contact Button */}
      <Link href="/lien-he" className="block">
        <Button
          variant="outline"
          size="lg"
          className="w-full h-12 md:h-14 rounded-2xl text-sm md:text-base font-semibold border-2 border-slate-200 hover:border-primary hover:bg-primary/5 transition-all group"
        >
          <Phone className="h-5 w-5 mr-2 text-primary group-hover:animate-pulse" />
          <span>Liên hệ báo giá</span>
        </Button>
      </Link>

      {/* Secondary Actions */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1">
          {/* Compare */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCompareToggle}
            className={`rounded-xl h-10 px-3 gap-2 transition-all ${
              inCompare
                ? "text-primary bg-primary/10 hover:bg-primary/15"
                : "hover:bg-slate-100"
            }`}
          >
            <Scale className={`h-4 w-4 ${inCompare ? "text-primary" : "text-slate-500"}`} />
            <span className="hidden sm:inline text-sm">{inCompare ? "Đã thêm" : "So sánh"}</span>
          </Button>

          {/* Wishlist */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setWishlisted(!wishlisted)}
            className={`rounded-xl h-10 px-3 gap-2 transition-all ${
              wishlisted
                ? "text-red-500 bg-red-50 hover:bg-red-100"
                : "hover:bg-slate-100"
            }`}
          >
            <Heart className={`h-4 w-4 transition-all ${wishlisted ? "fill-red-500 text-red-500 scale-110" : "text-slate-500"}`} />
            <span className="hidden sm:inline text-sm">{wishlisted ? "Đã lưu" : "Yêu thích"}</span>
          </Button>

          {/* Share */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyLink}
            className={`rounded-xl h-10 px-3 gap-2 transition-all ${
              copied
                ? "text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                : "hover:bg-slate-100"
            }`}
          >
            {copied ? (
              <>
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span className="hidden sm:inline text-sm text-emerald-600">Đã sao chép</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 text-slate-500" />
                <span className="hidden sm:inline text-sm">Chia sẻ</span>
              </>
            )}
          </Button>
        </div>

        {/* Quick Info */}
        <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            <span className="text-emerald-700 font-medium">Giao Hà Nội</span>
          </div>
        </div>
      </div>

      {/* Promotion Strip */}
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200/50">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/25">
          <Gift className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="font-bold text-amber-900">Cam kết chất lượng</p>
          <p className="text-sm text-amber-700">Sản phẩm chính hãng Austdoor + Bảo hành chính hãng</p>
        </div>
      </div>
    </div>
  );
}
