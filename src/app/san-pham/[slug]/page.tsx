import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProductBySlug, getProducts, getCategoryById, getProductsByCategory } from '@/lib/data';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return { title: 'Sản phẩm không tồn tại' };
    }

    return {
        title: product.metaTitle || product.name,
        description: product.metaDescription || product.description,
        keywords: product.keywords,
        openGraph: {
            title: product.metaTitle || product.name,
            description: product.metaDescription || product.description,
            images: product.images.length > 0 ? [{ url: product.images[0] }] : [],
        },
    };
}

export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((p) => ({ slug: p.slug }));
}

export const revalidate = 3600;

export default async function ProductDetailPage({ params }: Props) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const category = await getCategoryById(product.categoryId);
    const relatedProducts = (await getProductsByCategory(product.categoryId)).filter(p => p.id !== product.id).slice(0, 4);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex mb-8 text-sm font-medium text-slate-500 dark:text-gray-400">
                <ol className="inline-flex items-center space-x-2">
                    <li><Link href="/" className="hover:text-[#1b399d] transition-colors">Trang chủ</Link></li>
                    <li><span className="text-gray-300 dark:text-gray-600">/</span></li>
                    <li><Link href="/san-pham" className="hover:text-[#1b399d] transition-colors">Sản phẩm</Link></li>
                    {category && (
                        <>
                            <li><span className="text-gray-300 dark:text-gray-600">/</span></li>
                            <li><Link href={`/danh-muc/${category.slug}`} className="hover:text-[#1b399d] transition-colors">{category.name}</Link></li>
                        </>
                    )}
                    <li><span className="text-gray-300 dark:text-gray-600">/</span></li>
                    <li aria-current="page" className="text-slate-900 dark:text-white">{product.name}</li>
                </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                {/* Left Column - Gallery */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    {/* Main Image */}
                    <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm group">
                        <Image
                            src={product.images[0] || product.thumbnail || '/images/placeholder.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        {product.isFeatured && (
                            <div className="absolute top-6 left-6 bg-white/90 dark:bg-black/80 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#1b399d] shadow-sm">
                                Best Seller
                            </div>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.slice(0, 4).map((img, i) => (
                                <button
                                    key={i}
                                    className={`relative aspect-square rounded-xl overflow-hidden ${i === 0 ? 'ring-2 ring-[#1b399d] ring-offset-2' : 'opacity-70 hover:opacity-100'} transition-opacity`}
                                >
                                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Product Description */}
                    <div className="mt-8 prose prose-lg prose-neutral dark:prose-invert max-w-none">
                        <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Mô tả sản phẩm</h3>
                        <p className="text-slate-500 dark:text-gray-400 leading-relaxed">
                            {product.description}
                        </p>
                        {product.features.length > 0 && (
                            <div className="mt-6">
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Đặc điểm nổi bật:</h4>
                                <ul className="space-y-2">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-gray-300">
                                            <span className="material-symbols-outlined text-emerald-500 text-[18px] mt-0.5">check_circle</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Product Info */}
                <div className="lg:col-span-5 relative">
                    <div className="sticky top-28 flex flex-col gap-8">
                        {/* Header */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-[#1b399d] text-sm font-bold tracking-wider uppercase">{category?.name || 'Sản phẩm'}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <div className="flex items-center text-yellow-500 text-sm">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    ))}
                                    <span className="text-slate-500 ml-2 text-xs font-medium">({product.viewCount} lượt xem)</span>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-4">
                                {product.name}
                            </h1>
                            <p className="text-slate-500 dark:text-gray-400 text-base font-normal">
                                SKU: <span className="font-medium text-slate-900 dark:text-white">{product.id.toUpperCase()}</span>
                            </p>
                        </div>

                        {/* Price Card */}
                        <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 lg:p-8 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1b399d]/5 rounded-full blur-3xl"></div>

                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-3xl font-bold text-[#1b399d]">
                                    {product.priceFrom >= 1000000
                                        ? `${(product.priceFrom / 1000000).toFixed(1)} - ${(product.priceTo / 1000000).toFixed(1)} triệu`
                                        : `${(product.priceFrom / 1000).toFixed(0)}k - ${(product.priceTo / 1000).toFixed(0)}k`
                                    }
                                </span>
                                <span className="text-sm text-slate-500 font-medium">/ {product.unit.replace('VNĐ/', '')}</span>
                            </div>

                            {/* Conditional UI based on category */}
                            {product.categoryId === 'cat_phu_kien' ? (
                                /* PHỤ KIỆN: Số lượng + Thêm vào giỏ + Tương thích */
                                <>
                                    {/* Compatibility Info */}
                                    {category?.relatedCategories && category.relatedCategories.length > 0 && (
                                        <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                            <div className="flex items-center gap-2 text-sm text-[#1b399d] font-medium">
                                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                                <span>Tương thích với: Cửa cuốn, Cửa nhôm, Cửa gỗ</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Quantity Selector */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-slate-900 dark:text-white mb-3">Số lượng</label>
                                        <div className="flex items-center gap-3">
                                            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                                                <span className="material-symbols-outlined text-gray-600">remove</span>
                                            </button>
                                            <span className="w-12 text-center font-bold text-lg">1</span>
                                            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                                                <span className="material-symbols-outlined text-gray-600">add</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* CTA Buttons for Accessories */}
                                    <div className="flex flex-col gap-3">
                                        <Button className="w-full h-14 bg-[#1b399d] hover:bg-[#132a75] text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-[#1b399d]/20 flex items-center justify-center gap-3 text-lg">
                                            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
                                            Thêm vào giỏ hàng
                                        </Button>
                                        <Button variant="outline" className="w-full h-12 border-gray-200 dark:border-gray-600 hover:border-[#1b399d] hover:text-[#1b399d] font-bold rounded-xl flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined text-xl">phone</span>
                                            Gọi ngay: 0919.086.272
                                        </Button>
                                    </div>

                                    <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
                                        <span className="material-symbols-outlined text-green-600 text-sm">local_shipping</span>
                                        <span>Giao hàng toàn quốc - Đổi trả 7 ngày</span>
                                    </div>
                                </>
                            ) : (
                                /* CỬA: Chọn màu + Yêu cầu báo giá + Tư vấn */
                                <>
                                    {/* Color Selection */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-slate-900 dark:text-white mb-3">Màu sắc</label>
                                        <div className="flex gap-3">
                                            <button aria-label="Ghi sáng" className="w-10 h-10 rounded-full bg-[#E5E5E5] ring-2 ring-[#1b399d] ring-offset-2 shadow-sm"></button>
                                            <button aria-label="Café cháy" className="w-10 h-10 rounded-full bg-[#8B5E3C] hover:ring-2 ring-gray-300 ring-offset-2 transition-all shadow-sm"></button>
                                            <button aria-label="Ghi đậm" className="w-10 h-10 rounded-full bg-[#2D3748] hover:ring-2 ring-gray-300 ring-offset-2 transition-all shadow-sm"></button>
                                            <button aria-label="Trắng" className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 hover:ring-2 ring-gray-300 ring-offset-2 transition-all shadow-sm"></button>
                                        </div>
                                    </div>

                                    {/* CTA Buttons for Doors */}
                                    <div className="flex flex-col gap-3">
                                        {/* Primary: Auto Quote Calculator */}
                                        <Link href="/tinh-gia">
                                            <Button className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3 text-lg">
                                                <span className="material-symbols-outlined text-2xl">calculate</span>
                                                Tự tính báo giá
                                            </Button>
                                        </Link>
                                        {/* Secondary: Contact for Quote */}
                                        <Link href="/bao-gia">
                                            <Button variant="outline" className="w-full h-12 border-[#1b399d] text-[#1b399d] hover:bg-[#1b399d] hover:text-white font-bold rounded-xl flex items-center justify-center gap-2">
                                                <span className="material-symbols-outlined text-xl">request_quote</span>
                                                Yêu cầu báo giá chi tiết
                                            </Button>
                                        </Link>
                                        <div className="grid grid-cols-2 gap-3 mt-1">
                                            <a href="tel:0919086272">
                                                <Button variant="outline" className="w-full h-12 border-gray-200 dark:border-gray-600 hover:border-[#1b399d] hover:text-[#1b399d] font-bold rounded-xl flex items-center justify-center gap-2 text-sm">
                                                    <span className="material-symbols-outlined text-xl">call</span>
                                                    0919.086.272
                                                </Button>
                                            </a>
                                            <a href="https://zalo.me/0919086272" target="_blank" rel="noopener noreferrer">
                                                <Button variant="outline" className="w-full h-12 border-gray-200 dark:border-gray-600 hover:border-[#1b399d] hover:text-[#1b399d] font-bold rounded-xl flex items-center justify-center gap-2 text-sm">
                                                    <span className="material-symbols-outlined text-xl">support_agent</span>
                                                    Zalo tư vấn
                                                </Button>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
                                        <span className="material-symbols-outlined text-green-600 text-sm">verified</span>
                                        <span>Khảo sát miễn phí - Lắp đặt tận nơi</span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Specifications Accordion */}
                        <div className="divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-100 dark:border-gray-800">
                            {/* Specs */}
                            <details className="group py-4" open>
                                <summary className="flex justify-between items-center font-bold cursor-pointer list-none text-slate-900 dark:text-white hover:text-[#1b399d] transition-colors">
                                    <span>Thông số kỹ thuật</span>
                                    <span className="transition group-open:rotate-180 material-symbols-outlined text-gray-400">expand_more</span>
                                </summary>
                                <div className="text-slate-500 dark:text-gray-400 mt-3 text-sm space-y-2 pl-1">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <div key={key} className="flex justify-between border-b border-gray-50 dark:border-gray-800 pb-2">
                                            <span>{key}</span>
                                            <span className="font-medium text-slate-900 dark:text-white text-right">
                                                {Array.isArray(value) ? value.join(', ') : value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </details>

                            {/* Warranty Policy */}
                            <details className="group py-4">
                                <summary className="flex justify-between items-center font-bold cursor-pointer list-none text-slate-900 dark:text-white hover:text-[#1b399d] transition-colors">
                                    <span>Chính sách bảo hành</span>
                                    <span className="transition group-open:rotate-180 material-symbols-outlined text-gray-400">expand_more</span>
                                </summary>
                                <div className="text-slate-500 dark:text-gray-400 mt-3 text-sm pl-1">
                                    <p>{category?.warrantyPolicy || 'Vui lòng liên hệ để biết chính sách bảo hành chi tiết. Hỗ trợ kỹ thuật 24/7.'}</p>
                                </div>
                            </details>

                            {/* Shipping */}
                            <details className="group py-4">
                                <summary className="flex justify-between items-center font-bold cursor-pointer list-none text-slate-900 dark:text-white hover:text-[#1b399d] transition-colors">
                                    <span>Vận chuyển & Lắp đặt</span>
                                    <span className="transition group-open:rotate-180 material-symbols-outlined text-gray-400">expand_more</span>
                                </summary>
                                <div className="text-slate-500 dark:text-gray-400 mt-3 text-sm pl-1">
                                    <p>Miễn phí vận chuyển và lắp đặt trong nội thành Hà Nội. Hỗ trợ chi phí vận chuyển các tỉnh lân cận. Thời gian sản xuất: 3-5 ngày làm việc.</p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-24 lg:mt-32">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Sản phẩm tương tự</h2>
                        <Link href="/san-pham" className="text-[#1b399d] font-semibold hover:underline flex items-center gap-1">
                            Xem tất cả
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((p) => (
                            <Link key={p.id} href={`/san-pham/${p.slug}`} className="group">
                                <Card className="flex flex-col gap-4 border-0 shadow-none bg-transparent">
                                    <div className="relative aspect-[4/5] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                                        <Image
                                            src={p.thumbnail || '/images/placeholder.jpg'}
                                            alt={p.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                        <button className="absolute bottom-4 right-4 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                            <span className="material-symbols-outlined text-[#1b399d]">add</span>
                                        </button>
                                    </div>
                                    <CardContent className="p-0">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#1b399d] transition-colors line-clamp-2">
                                            {p.name}
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-1 line-clamp-1">{p.description}</p>
                                        <p className="text-base font-semibold text-[#1b399d] mt-2">
                                            {(p.priceFrom / 1000000).toFixed(1)}tr / {p.unit.replace('VNĐ/', '')}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}
