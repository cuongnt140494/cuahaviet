import { Suspense } from 'react';
import { getProducts } from '@/lib/data';
import AdvancedCalculator from './AdvancedCalculator';

export const metadata = {
    title: 'Dự toán chi phí - Cửa Hà Việt',
    description: 'Công cụ tính giá cửa cuốn, cửa nhôm, cửa gỗ tự động, chính xác. Nhận báo giá ngay lập tức.',
};

export default async function PricingPage() {
    const products = await getProducts();

    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Đang tải dữ liệu...</div>}>
            <AdvancedCalculator products={products} />
        </Suspense>
    );
}
