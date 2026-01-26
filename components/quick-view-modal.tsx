"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Product, categoryLabels, seriesLabels } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useCart, useToast } from "@/contexts";
import {
  X,
  ShoppingCart,
  Plus,
  Minus,
  CheckCircle,
  ArrowRight,
  Package,
  Sparkles,
  Tag,
} from "lucide-react";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { addToast } = useToast();

  // Reset quantity when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    addToast(`Đã thêm ${quantity} "${product.name}" vào giỏ hàng`);
    onClose();
  };

  const hasDiscount = product.wholesalePrice && product.wholesalePrice < product.price;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 md:w-full md:max-w-4xl"
          >
            <Card className="bg-background rounded-2xl shadow-2xl overflow-hidden border-0">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid md:grid-cols-2 max-h-[calc(100vh-2rem)] md:max-h-[80vh] overflow-y-auto">
                {/* Image */}
                <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="h-24 w-24 text-slate-300" />
                  </div>
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {hasDiscount && (
                      <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 rounded-full">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Giảm giá
                      </Badge>
                    )}
                    {!product.inStock && (
                      <Badge variant="secondary" className="rounded-full text-base py-1.5 px-4">
                        Hết hàng
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8 space-y-5">
                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="rounded-full">
                      {categoryLabels[product.category]}
                    </Badge>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/10 rounded-full">
                      {seriesLabels[product.series]}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold">{product.name}</h2>

                  {/* Price */}
                  <div className="space-y-2">
                    {hasDiscount ? (
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-primary">
                          {formatPrice(product.wholesalePrice!)}
                        </span>
                        <span className="text-lg text-muted-foreground line-through">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-3xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                    )}
                    <p className="text-sm text-muted-foreground">/{product.unit}</p>
                    {product.inStock ? (
                      <p className="text-sm text-green-600 flex items-center gap-1.5">
                        <CheckCircle className="h-4 w-4" />
                        Còn hàng
                      </p>
                    ) : (
                      <p className="text-sm text-destructive">Hết hàng</p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground">{product.description}</p>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Tag className="h-4 w-4 text-primary" />
                      Đặc điểm nổi bật
                    </h4>
                    <ul className="space-y-2">
                      {product.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quantity */}
                  {product.inStock && (
                    <div className="flex items-center gap-4">
                      <span className="font-medium">Số lượng:</span>
                      <div className="flex items-center border rounded-xl overflow-hidden">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-4 py-2.5 hover:bg-muted transition-colors"
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-6 py-2.5 border-x font-medium min-w-[60px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-4 py-2.5 hover:bg-muted transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-2 space-y-3">
                    <Button
                      className="w-full h-12 rounded-xl gap-2 text-base"
                      disabled={!product.inStock}
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Thêm vào giỏ hàng
                    </Button>

                    {/* View Details Link */}
                    <Link
                      href={`/san-pham/${product.slug}`}
                      className="flex items-center justify-center gap-2 text-primary hover:underline py-2"
                      onClick={onClose}
                    >
                      Xem chi tiết sản phẩm
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
