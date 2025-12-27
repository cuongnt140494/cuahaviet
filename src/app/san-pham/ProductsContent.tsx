'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

import { Category, Product } from '@/lib/data';

interface ProductsContentProps {
    initialProducts: Product[];
    initialCategories: Category[];
}

export default function ProductsContent({ initialProducts, initialCategories }: ProductsContentProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const products = initialProducts;
    const categories = initialCategories;
    const loading = false;

    // Get URL params
    const categorySlug = searchParams.get('danh-muc') || '';
    const sortBy = searchParams.get('sap-xep') || 'newest';
    const minPrice = searchParams.get('gia-tu') || '';
    const maxPrice = searchParams.get('gia-den') || '';


    // Get current category
    const currentCategory = categories.find(c => c.slug === categorySlug);

    // Filter and sort products
    const filteredProducts = products
        .filter(p => {
            // Filter by category
            if (categorySlug) {
                const cat = categories.find(c => c.slug === categorySlug);
                if (cat && p.categoryId !== cat.id) return false;
            }
            // Filter by price
            if (minPrice && p.priceFrom < parseInt(minPrice) * 1000000) return false;
            if (maxPrice && p.priceFrom > parseInt(maxPrice) * 1000000) return false;
            return true;
        })
        .sort((a, b) => {
            if (sortBy === 'price-asc') return a.priceFrom - b.priceFrom;
            if (sortBy === 'price-desc') return b.priceFrom - a.priceFrom;
            return 0; // newest - default order
        });

    // Update URL params
    function updateParams(key: string, value: string) {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/san-pham?${params.toString()}`, { scroll: false });
    }

    // Apply price filter
    const [tempMinPrice, setTempMinPrice] = useState(minPrice);
    const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);

    function applyPriceFilter() {
        const params = new URLSearchParams(searchParams.toString());
        if (tempMinPrice) params.set('gia-tu', tempMinPrice);
        else params.delete('gia-tu');
        if (tempMaxPrice) params.set('gia-den', tempMaxPrice);
        else params.delete('gia-den');
        router.push(`/san-pham?${params.toString()}`, { scroll: false });
    }

    return (
        <>
            {/* Hero Section */}
            <div className="relative w-full overflow-hidden bg-[#111521]">
                {/* Animated Gradient Background */}
                <div
                    className="absolute inset-0 z-0 opacity-40 bg-[length:200%_200%]"
                    style={{
                        backgroundImage: 'linear-gradient(45deg, #111521 0%, #1737a1 50%, #111521 100%)',
                        animation: 'slow-pan 15s ease infinite'
                    }}
                />

                {/* Background Image */}
                <div
                    className="absolute inset-0 z-[1] opacity-30 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApK82c5r-ggKNOlvYkiLC5gL0oBQDRqnhSS8GwtZYFfazGoAq4FiP1KE7CES7QXQChuai6gWXLeijEL3ruujIIXNOb2uVcWDJ90qhG1FBeTTX5wXrrU6oc7ITU8fWJiqd2vXTis7ao0yafCJkwGNTxSXaP-iJGygklCiYwt4cSf2tBN3Bu47kqxfpenihIIgxd2FDsbiPcPh5GplTSBJRk5H9ZO6MIXFi522wB-CABiW7jd3wTVnuNk9hP6PuacERI6FJNhtU8Xs6d')" }}
                />

                {/* Hero Content */}
                <div className="relative z-10 flex min-h-[320px] flex-col items-center justify-center px-4 py-16 text-center md:min-h-[400px]">
                    <span className="mb-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm border border-white/20 animate-fade-in">
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-400"></span>
                        Sản phẩm chính hãng 100%
                    </span>
                    <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                        {currentCategory ? currentCategory.name : (
                            <>Kiến tạo không gian <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Sang Trọng &amp; An Toàn</span></>
                        )}
                    </h1>
                    <p className="mt-6 max-w-2xl text-base text-gray-300 md:text-lg">
                        {currentCategory
                            ? `Khám phá bộ sưu tập ${currentCategory.name.toLowerCase()} cao cấp với công nghệ hiện đại`
                            : 'Bộ sưu tập cửa cuốn, cửa nhôm kính cao cấp với công nghệ Đức, mang lại sự bền vững và thẩm mỹ đỉnh cao cho ngôi nhà của bạn.'
                        }
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Button className="h-12 px-6 bg-white text-[#1b399d] font-bold rounded-xl hover:bg-gray-50 transition-transform hover:scale-105">
                            Xem Catalogue 2026
                        </Button>
                        <Button variant="outline" className="h-12 px-6 border-white/20 bg-white/10 text-white font-bold rounded-xl backdrop-blur-md hover:bg-white/20">
                            Tư vấn trực tiếp
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-8 px-4 py-8 md:flex-row md:px-10">
                {/* Sidebar Navigation */}
                <aside className="w-full shrink-0 md:w-64 lg:w-72">
                    <div className="sticky top-24 flex flex-col gap-6 rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                        {/* Categories */}
                        <div>
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-base font-bold text-slate-900">Danh mục</h3>
                                <span className="material-symbols-outlined text-gray-400 text-sm">expand_more</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <button
                                    onClick={() => updateParams('danh-muc', '')}
                                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-left ${!categorySlug
                                        ? 'bg-[#1b399d]/10 font-bold text-[#1b399d]'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#1b399d]'
                                        }`}
                                >
                                    <span>Tất cả sản phẩm</span>
                                    <span className="text-xs font-normal opacity-70">{products.length}</span>
                                </button>
                                {categories.map((cat) => {
                                    const count = products.filter(p => p.categoryId === cat.id).length;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => updateParams('danh-muc', cat.slug)}
                                            className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-left ${categorySlug === cat.slug
                                                ? 'bg-[#1b399d]/10 font-bold text-[#1b399d]'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-[#1b399d]'
                                                }`}
                                        >
                                            <span>{cat.name}</span>
                                            <span className="text-xs font-normal opacity-70">{count}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="h-px bg-gray-100"></div>

                        {/* Price Filter */}
                        <div>
                            <h3 className="mb-4 text-base font-bold text-slate-900">Khoảng giá (triệu)</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <Input
                                    type="number"
                                    placeholder="Từ"
                                    value={tempMinPrice}
                                    onChange={(e) => setTempMinPrice(e.target.value)}
                                    className="w-full rounded-lg border-gray-200 bg-gray-50 px-3 py-2 text-xs"
                                />
                                <span className="text-gray-400">-</span>
                                <Input
                                    type="number"
                                    placeholder="Đến"
                                    value={tempMaxPrice}
                                    onChange={(e) => setTempMaxPrice(e.target.value)}
                                    className="w-full rounded-lg border-gray-200 bg-gray-50 px-3 py-2 text-xs"
                                />
                            </div>
                            <Button
                                variant="secondary"
                                onClick={applyPriceFilter}
                                className="w-full rounded-lg bg-gray-100 py-2 text-xs font-bold text-gray-700 hover:bg-gray-200"
                            >
                                Áp dụng
                            </Button>
                        </div>
                    </div>
                </aside>

                {/* Product Grid Area */}
                <main className="flex-1">
                    {/* Quick Filter Row */}
                    <div className="mb-6 flex flex-col justify-between gap-4 rounded-xl bg-white p-3 shadow-sm border border-gray-100 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-sm font-medium text-gray-500">Sắp xếp:</span>
                            <div className="flex gap-1">
                                <Button
                                    variant="ghost"
                                    onClick={() => updateParams('sap-xep', 'newest')}
                                    className={`rounded-lg px-3 py-1.5 text-sm font-medium ${sortBy === 'newest'
                                        ? 'bg-[#1b399d]/10 font-bold text-[#1b399d]'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#1b399d]'
                                        }`}
                                >
                                    Mới nhất
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => updateParams('sap-xep', 'price-asc')}
                                    className={`rounded-lg px-3 py-1.5 text-sm font-medium ${sortBy === 'price-asc'
                                        ? 'bg-[#1b399d]/10 font-bold text-[#1b399d]'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#1b399d]'
                                        }`}
                                >
                                    Giá tăng dần
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => updateParams('sap-xep', 'price-desc')}
                                    className={`rounded-lg px-3 py-1.5 text-sm font-medium ${sortBy === 'price-desc'
                                        ? 'bg-[#1b399d]/10 font-bold text-[#1b399d]'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#1b399d]'
                                        }`}
                                >
                                    Giá giảm dần
                                </Button>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            Hiển thị <span className="font-bold text-slate-900">{filteredProducts.length}</span> sản phẩm
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1b399d]"></div>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">inventory_2</span>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Không tìm thấy sản phẩm</h3>
                            <p className="text-gray-500">Thử thay đổi bộ lọc hoặc danh mục khác</p>
                        </div>
                    ) : (
                        /* Products Grid */
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredProducts.map((product) => (
                                <Link key={product.id} href={`/san-pham/${product.slug}`}>
                                    <Card className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-100 h-full">
                                        {/* Image Container */}
                                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                                            <Image
                                                src={product.thumbnail || '/images/placeholder.jpg'}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            />

                                            {/* Badges */}
                                            <div className="absolute left-3 top-3 flex gap-2">
                                                {product.isFeatured && (
                                                    <Badge className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">Hot</Badge>
                                                )}
                                            </div>

                                            {/* Hover Button */}
                                            <div className="absolute inset-x-0 bottom-0 flex justify-center p-4 opacity-0 transition-all duration-300 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 bg-gradient-to-t from-black/50 to-transparent pt-12">
                                                <Button className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1b399d] py-3 text-sm font-bold text-white shadow-lg hover:bg-[#132a75]">
                                                    <span className="material-symbols-outlined text-[18px]">request_quote</span>
                                                    Yêu cầu báo giá
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <CardContent className="flex flex-1 flex-col p-4">
                                            <div className="mb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                                {categories.find(c => c.id === product.categoryId)?.name || 'Sản phẩm'}
                                            </div>
                                            <h3 className="mb-2 text-lg font-bold leading-tight text-slate-900 group-hover:text-[#1b399d] transition-colors line-clamp-2">
                                                {product.name}
                                            </h3>
                                            <div className="mt-auto flex items-end justify-between border-t border-gray-50 pt-3">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-500">Đơn giá tham khảo</span>
                                                    <span className="text-base font-bold text-[#1b399d]">
                                                        {product.priceFrom >= 1000000
                                                            ? `${(product.priceFrom / 1000000).toFixed(1)}tr`
                                                            : `${(product.priceFrom / 1000).toFixed(0)}k`
                                                        }
                                                        <span className="text-xs font-normal text-gray-500">/{product.unit.replace('VNĐ/', '')}</span>
                                                    </span>
                                                </div>
                                                <button className="rounded-full bg-gray-50 p-2 text-gray-400 transition-colors hover:bg-[#1b399d]/10 hover:text-[#1b399d]">
                                                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                                                </button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
