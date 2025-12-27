import { Suspense } from 'react';
import { Metadata } from 'next';
import { getProducts, getCategories } from '@/lib/data';
import ProductsContent from './ProductsContent';

export const metadata: Metadata = {
    title: 'Sản phẩm - Cửa Cuốn, Cửa Nhôm, Cửa Gỗ Cao Cấp',
    description: 'Khám phá bộ sưu tập cửa cuốn, cửa nhôm kính, cửa gỗ nhựa Composite cao cấp với công nghệ Đức. Giá tốt nhất Hà Nội.',
};

function ProductsLoading() {
    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1b399d]"></div>
        </div>
    );
}

export default async function ProductsPage() {
    const [products, categories] = await Promise.all([
        getProducts(),
        getCategories(),
    ]);

    return (
        <Suspense fallback={<ProductsLoading />}>
            <ProductsContent initialProducts={products} initialCategories={categories} />
        </Suspense>
    );
}
