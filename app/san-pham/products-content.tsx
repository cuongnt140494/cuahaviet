"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { products } from "@/data/products";
import { categoryLabels, Category } from "@/types";
import { searchMatch } from "@/lib/utils";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronRight,
  Grid3X3,
  LayoutList,
  Package,
  Filter,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

const categoryIcons: Record<string, string> = {
  "cua-cuon-khe-thoang": "from-emerald-500 to-emerald-600",
  "cua-cuon-tam-lien": "from-blue-500 to-blue-600",
  "cua-cuon-dac-biet": "from-purple-500 to-purple-600",
  "motor": "from-orange-500 to-orange-600",
  "luu-dien": "from-yellow-500 to-yellow-600",
  "phu-kien": "from-pink-500 to-pink-600",
};

export function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as Category | null;
  const searchParam = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    categoryParam
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000000]);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">(
    "default"
  );
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync search query with URL parameter
  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  // Sync category with URL parameter
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (searchQuery) {
      result = result.filter(
        (p) =>
          searchMatch(p.name, searchQuery) ||
          searchMatch(p.description, searchQuery) ||
          searchMatch(categoryLabels[p.category], searchQuery) ||
          searchMatch(p.specifications.model, searchQuery)
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, priceRange, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 15000000]);
    setSearchQuery("");
    setSortBy("default");
  };

  const hasActiveFilters =
    selectedCategory ||
    priceRange[0] > 0 ||
    priceRange[1] < 15000000 ||
    searchQuery;

  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-white/70 mb-6 md:mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors shrink-0">
              Trang chủ
            </Link>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4 shrink-0" aria-hidden="true" />
            <Link href="/san-pham" className={`hover:text-white transition-colors ${selectedCategory ? 'hidden sm:inline' : 'text-white'}`}>
              Sản phẩm
            </Link>
            {selectedCategory && (
              <>
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4 shrink-0 hidden sm:block" aria-hidden="true" />
                <span className="text-white truncate max-w-[150px] sm:max-w-none">{categoryLabels[selectedCategory]}</span>
              </>
            )}
          </nav>

          <div className="max-w-2xl">
            <Badge className="mb-4 bg-white/10 text-white border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              {products.length}+ sản phẩm chính hãng
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {selectedCategory ? categoryLabels[selectedCategory] : "Tất cả sản phẩm"}
            </h1>
            <p className="text-lg text-white/70">
              Khám phá bộ sưu tập cửa cuốn Austdoor chính hãng với đa dạng mẫu mã và giá tốt nhất Hà Nội.
            </p>
          </div>
        </div>
      </section>

      {/* Category Quick Filter */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 py-4 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                !selectedCategory
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-background border hover:border-primary hover:text-primary"
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
              Tất cả
            </button>
            {Object.entries(categoryLabels).map(([slug, label]) => (
              <button
                key={slug}
                onClick={() => setSelectedCategory(selectedCategory === slug ? null : (slug as Category))}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === slug
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-background border hover:border-primary hover:text-primary"
                }`}
              >
                <Package className="h-4 w-4" />
                {label}
                <span className="text-xs opacity-70">({productCounts[slug] || 0})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Search className="h-4 w-4 text-primary" />
                      Tìm kiếm
                    </h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Tìm sản phẩm..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-11 rounded-xl"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Categories */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Filter className="h-4 w-4 text-primary" />
                      Danh mục
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(categoryLabels).map(([slug, label]) => (
                        <button
                          key={slug}
                          onClick={() =>
                            setSelectedCategory(
                              selectedCategory === slug ? null : (slug as Category)
                            )
                          }
                          className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm transition-all ${
                            selectedCategory === slug
                              ? "bg-primary text-white"
                              : "hover:bg-muted"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${categoryIcons[slug]} flex items-center justify-center`}>
                              <Package className="h-4 w-4 text-white" />
                            </div>
                            {label}
                          </span>
                          <Badge variant="secondary" className={`text-xs ${selectedCategory === slug ? "bg-white/20 text-white" : ""}`}>
                            {productCounts[slug] || 0}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Price Range */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4 text-primary" />
                      Khoảng giá
                    </h3>
                    <Slider
                      min={0}
                      max={15000000}
                      step={500000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      formatLabel={formatPrice}
                    />
                    <div className="flex justify-between mt-3 text-sm text-muted-foreground">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    className="w-full rounded-xl h-11"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Xóa bộ lọc
                  </Button>
                )}
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    className="lg:hidden rounded-xl"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Bộ lọc
                  </Button>

                  <p className="text-muted-foreground">
                    Hiển thị <span className="font-semibold text-foreground">{filteredProducts.length}</span> sản phẩm
                  </p>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="px-4 py-2.5 border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="default">Mặc định</option>
                    <option value="price-asc">Giá: Thấp đến cao</option>
                    <option value="price-desc">Giá: Cao đến thấp</option>
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-sm text-muted-foreground">Đang lọc:</span>
                  {selectedCategory && (
                    <Badge className="gap-1 pl-3 pr-2 py-1.5 bg-primary/10 text-primary hover:bg-primary/20">
                      {categoryLabels[selectedCategory]}
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                        aria-label={`Xóa bộ lọc ${categoryLabels[selectedCategory]}`}
                      >
                        <X className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </Badge>
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < 15000000) && (
                    <Badge className="gap-1 pl-3 pr-2 py-1.5 bg-primary/10 text-primary hover:bg-primary/20">
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                      <button
                        onClick={() => setPriceRange([0, 15000000])}
                        className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                        aria-label="Xóa bộ lọc khoảng giá"
                      >
                        <X className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </Badge>
                  )}
                  {searchQuery && (
                    <Badge className="gap-1 pl-3 pr-2 py-1.5 bg-primary/10 text-primary hover:bg-primary/20">
                      "{searchQuery}"
                      <button
                        onClick={() => setSearchQuery("")}
                        className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                        aria-label="Xóa từ khóa tìm kiếm"
                      >
                        <X className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </Badge>
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Xóa tất cả
                  </button>
                </div>
              )}

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <Card className="border-0 shadow-lg">
                  <CardContent className="py-16 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                      <Package className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Không tìm thấy sản phẩm</h3>
                    <p className="text-muted-foreground mb-6">
                      Không có sản phẩm nào phù hợp với bộ lọc của bạn.
                    </p>
                    <Button onClick={clearFilters} className="rounded-full">
                      Xóa bộ lọc
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Bộ lọc</h3>
              <button onClick={() => setShowMobileFilters(false)} aria-label="Đóng bộ lọc">
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Tìm kiếm</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Tìm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
            </div>

            {/* Mobile Categories */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Danh mục</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(categoryLabels).map(([slug, label]) => (
                  <button
                    key={slug}
                    onClick={() => setSelectedCategory(selectedCategory === slug ? null : (slug as Category))}
                    className={`px-4 py-3 rounded-xl text-sm text-left transition-all ${
                      selectedCategory === slug
                        ? "bg-primary text-white"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Khoảng giá</label>
              <Slider
                min={0}
                max={15000000}
                step={500000}
                value={priceRange}
                onValueChange={setPriceRange}
                formatLabel={formatPrice}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={clearFilters}>
                Xóa bộ lọc
              </Button>
              <Button className="flex-1 h-12 rounded-xl" onClick={() => setShowMobileFilters(false)}>
                Áp dụng ({filteredProducts.length})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
