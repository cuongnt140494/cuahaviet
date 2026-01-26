"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCompare, useCart, useToast } from "@/contexts";
import {
  categoryLabels,
  seriesLabels,
  Product,
  DoorSpecifications,
  MotorSpecifications,
  UPSSpecifications,
  AccessorySpecifications,
  austdoorColors,
} from "@/types";
import {
  ChevronRight,
  X,
  ShoppingCart,
  Scale,
  Trash2,
  Package,
  CheckCircle,
  XCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

function getSpecValue(product: Product, key: string): string {
  const specs = product.specifications;
  const category = product.category;

  if (
    category === "cua-cuon-tam-lien" ||
    category === "cua-cuon-khe-thoang" ||
    category === "cua-cuon-dac-biet"
  ) {
    const doorSpecs = specs as DoorSpecifications;
    switch (key) {
      case "thickness":
        return doorSpecs.thickness || "-";
      case "maxSize":
        return doorSpecs.maxSize || "-";
      case "material":
        return doorSpecs.material || "-";
      case "colors":
        return doorSpecs.colors
          .map((c) => austdoorColors[c]?.name || c)
          .join(", ") || "-";
      case "includedItems":
        return doorSpecs.includedItems || "-";
    }
  }

  if (category === "motor") {
    const motorSpecs = specs as MotorSpecifications;
    switch (key) {
      case "voltage":
        return motorSpecs.voltage || "-";
      case "power":
        return motorSpecs.power || "-";
      case "torque":
        return motorSpecs.torque || "-";
      case "maxHeight":
        return motorSpecs.maxHeight || "-";
      case "warranty":
        return motorSpecs.warranty || "-";
    }
  }

  if (category === "luu-dien") {
    const upsSpecs = specs as UPSSpecifications;
    switch (key) {
      case "capacity":
        return upsSpecs.capacity || "-";
      case "voltage":
        return upsSpecs.voltage || "-";
      case "compatibility":
        return upsSpecs.compatibility || "-";
    }
  }

  if (category === "phu-kien") {
    const accSpecs = specs as AccessorySpecifications;
    switch (key) {
      case "type":
        return accSpecs.type || "-";
      case "compatibility":
        return accSpecs.compatibility || "-";
    }
  }

  return "-";
}

export default function ComparePage() {
  const { items, removeItem, clearAll } = useCompare();
  const { addItem: addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (product: (typeof items)[0]) => {
    addToCart(product);
    addToast(`Đã thêm "${product.name}" vào giỏ hàng`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 py-16 relative z-10">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">So sánh sản phẩm</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold">So sánh sản phẩm</h1>
          </div>
        </section>

        {/* Empty State */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="max-w-lg mx-auto border-0 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-slate-100 to-slate-50 p-12 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg mb-6">
                  <Scale className="h-12 w-12 text-muted-foreground/50" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Chưa có sản phẩm để so sánh</h2>
                <p className="text-muted-foreground mb-8">
                  Thêm sản phẩm vào danh sách so sánh để xem chi tiết các thông số kỹ thuật
                </p>
                <Link href="/san-pham">
                  <Button size="lg" className="rounded-full gap-2 px-8">
                    <Sparkles className="h-5 w-5" />
                    Khám phá sản phẩm
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  const specRows = [
    { label: "Giá bán", key: "price", type: "price" },
    { label: "Giá ưu đãi", key: "wholesalePrice", type: "wholesalePrice" },
    { label: "Danh mục", key: "category", type: "category" },
    { label: "Dòng sản phẩm", key: "series", type: "series" },
    { label: "Model", key: "model", type: "model" },
    { label: "Đơn vị", key: "unit", type: "unit" },
    { label: "Độ dày nan", key: "thickness", type: "spec" },
    { label: "Kích thước tối đa", key: "maxSize", type: "spec" },
    { label: "Chất liệu", key: "material", type: "spec" },
    { label: "Màu sắc", key: "colors", type: "spec" },
    { label: "Điện áp", key: "voltage", type: "spec" },
    { label: "Công suất", key: "power", type: "spec" },
    { label: "Mô-men", key: "torque", type: "spec" },
    { label: "Chiều cao nâng", key: "maxHeight", type: "spec" },
    { label: "Dung lượng", key: "capacity", type: "spec" },
    { label: "Tương thích", key: "compatibility", type: "spec" },
    { label: "Bảo hành", key: "warranty", type: "spec" },
    { label: "Tình trạng", key: "inStock", type: "stock" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">So sánh sản phẩm</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Badge className="mb-3 bg-white/10 text-white border-0">
                <Scale className="h-3 w-3 mr-1" />
                {items.length} sản phẩm
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold">So sánh sản phẩm</h1>
            </div>
            <Button
              variant="outline"
              onClick={clearAll}
              className="border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Xóa tất cả
            </Button>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="inline-block min-w-full align-middle">
              {/* Product Headers */}
              <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${items.length}, minmax(250px, 1fr))` }}>
                <div className="hidden lg:block" />
                {items.map((product) => (
                  <Card key={product.id} className="border-0 shadow-lg overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        {/* Product Image Placeholder */}
                        <div className="w-full aspect-square bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center mb-4">
                          <Package className="h-16 w-16 text-muted-foreground/30" />
                        </div>

                        {/* Product Info */}
                        <Badge variant="outline" className="mb-2">
                          {categoryLabels[product.category]}
                        </Badge>
                        <Link
                          href={`/san-pham/${product.slug}`}
                          className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2 mb-4"
                        >
                          {product.name}
                        </Link>

                        {/* Price */}
                        <div className="mb-4">
                          <p className="text-2xl font-bold text-primary">
                            {formatPrice(product.wholesalePrice || product.price)}
                          </p>
                          {product.wholesalePrice && (
                            <p className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.price)}
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 w-full">
                          <Button
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                            className="flex-1 rounded-xl"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Thêm giỏ
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removeItem(product.id)}
                            className="rounded-xl text-muted-foreground hover:text-destructive hover:border-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Specs Table */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="divide-y">
                  {specRows.map((row, idx) => {
                    // Check if any product has this spec
                    const hasData = items.some((product) => {
                      if (row.type === "spec") {
                        return getSpecValue(product, row.key) !== "-";
                      }
                      return true;
                    });

                    if (!hasData && row.type === "spec") return null;

                    return (
                      <div
                        key={row.key}
                        className={`grid items-center ${idx % 2 === 0 ? "bg-muted/30" : ""}`}
                        style={{ gridTemplateColumns: `200px repeat(${items.length}, minmax(250px, 1fr))` }}
                      >
                        <div className="p-4 font-medium text-muted-foreground">
                          {row.label}
                        </div>
                        {items.map((product) => (
                          <div key={product.id} className="p-4 text-center">
                            {row.type === "price" && (
                              <span className="text-lg font-bold text-primary">
                                {formatPrice(product.price)}
                              </span>
                            )}
                            {row.type === "wholesalePrice" && (
                              product.wholesalePrice ? (
                                <span className="text-lg font-semibold text-green-600">
                                  {formatPrice(product.wholesalePrice)}
                                </span>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )
                            )}
                            {row.type === "category" && (
                              <Badge variant="outline">{categoryLabels[product.category]}</Badge>
                            )}
                            {row.type === "series" && (
                              <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                                {seriesLabels[product.series]}
                              </Badge>
                            )}
                            {row.type === "model" && (
                              <span className="font-mono text-sm">{product.specifications.model}</span>
                            )}
                            {row.type === "unit" && (
                              <span>{product.unit}</span>
                            )}
                            {row.type === "spec" && (
                              <span className="text-sm">{getSpecValue(product, row.key)}</span>
                            )}
                            {row.type === "stock" && (
                              product.inStock ? (
                                <span className="inline-flex items-center gap-1 text-green-600">
                                  <CheckCircle className="h-4 w-4" />
                                  Còn hàng
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-red-600">
                                  <XCircle className="h-4 w-4" />
                                  Hết hàng
                                </span>
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}

                  {/* Features Row */}
                  <div
                    className="grid"
                    style={{ gridTemplateColumns: `200px repeat(${items.length}, minmax(250px, 1fr))` }}
                  >
                    <div className="p-4 font-medium text-muted-foreground">
                      Đặc điểm nổi bật
                    </div>
                    {items.map((product) => (
                      <div key={product.id} className="p-4">
                        <ul className="space-y-2">
                          {product.features.slice(0, 5).map((feature, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Cần thêm sản phẩm để so sánh?
            </p>
            <Link href="/san-pham">
              <Button variant="outline" className="rounded-full gap-2">
                <Package className="h-4 w-4" />
                Xem thêm sản phẩm
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
