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
  Copy,
  CheckCircle,
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

  const inCart = getItemQuantity(product.id) > 0;
  const inCompare = isInCompare(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
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
    <div className="space-y-6">
      {/* Quantity & Add to Cart */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center">
          <span className="text-sm font-medium text-muted-foreground mr-4">Số lượng:</span>
          <div className="flex items-center bg-muted rounded-full">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-12 w-12 rounded-full flex items-center justify-center hover:bg-muted-foreground/10 transition-colors disabled:opacity-50"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center font-bold text-lg">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="h-12 w-12 rounded-full flex items-center justify-center hover:bg-muted-foreground/10 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          size="lg"
          className={`flex-1 h-14 rounded-full text-base font-semibold transition-all text-white ${
            inCart
              ? "bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25"
              : "shadow-lg shadow-primary/25"
          }`}
        >
          {inCart ? (
            <>
              <Check className="h-5 w-5 mr-2" />
              Thêm tiếp vào giỏ
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Thêm vào giỏ hàng
            </>
          )}
        </Button>
      </div>

      {/* Contact Button */}
      <Link href="/lien-he">
        <Button
          variant="outline"
          size="lg"
          className="w-full h-14 rounded-full text-base font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <Phone className="h-5 w-5 mr-2" />
          Liên hệ báo giá
        </Button>
      </Link>

      {/* Secondary Actions */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          {/* Compare */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCompareToggle}
            className={`rounded-full gap-2 ${inCompare ? "text-primary bg-primary/10" : ""}`}
          >
            <Scale className="h-4 w-4" />
            <span className="hidden sm:inline">{inCompare ? "Đã thêm" : "So sánh"}</span>
          </Button>

          {/* Wishlist */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setWishlisted(!wishlisted)}
            className={`rounded-full gap-2 ${wishlisted ? "text-red-500" : ""}`}
          >
            <Heart className={`h-4 w-4 ${wishlisted ? "fill-red-500" : ""}`} />
            <span className="hidden sm:inline">{wishlisted ? "Đã lưu" : "Yêu thích"}</span>
          </Button>

          {/* Share */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyLink}
            className="rounded-full gap-2"
          >
            {copied ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="hidden sm:inline text-green-500">Đã sao chép</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Chia sẻ</span>
              </>
            )}
          </Button>
        </div>

        {/* Quick Info */}
        <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Giao Hà Nội</span>
          </div>
        </div>
      </div>

      {/* Promotion Strip */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
          <span className="text-lg">🎁</span>
        </div>
        <div>
          <p className="font-semibold text-amber-900">Cam kết chất lượng</p>
          <p className="text-sm text-amber-700">Sản phẩm chính hãng + Bảo hành 5 năm</p>
        </div>
      </div>
    </div>
  );
}
