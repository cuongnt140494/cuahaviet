'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/lib/data';
import { RollingDoorConfig, QuoteResult, LABOR_COST } from '@/lib/quote-constants';
import { QuoteSubmissionForm } from './QuoteSubmissionForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RollingDoorCalculatorProps {
    products: Product[]; // List of rolling door products (nan)
    accessories: Product[]; // Not used anymore but kept for interface compatibility
}

export function RollingDoorCalculator({ products }: RollingDoorCalculatorProps) {
    const [config, setConfig] = useState<RollingDoorConfig>({
        width: 0,
        height: 0,
        area: 0,
        id: products[0]?.id || '',
        motorId: '', // Kept for interface but not used
        upsId: '',   // Kept for interface but not used
    });

    // Calculate area reactively
    const calculatedArea = useMemo(() => {
        return parseFloat(((config.width * config.height) / 1000000).toFixed(2)); // mm² -> m²
    }, [config.width, config.height]);

    // Calculate Quote - Only door + labor, no motor
    const quote = useMemo<QuoteResult>(() => {
        const selectedDoor = products.find(p => p.id === config.id);

        if (!selectedDoor) return { totalArea: 0, basePrice: 0, accessoryPrice: 0, laborCost: 0, total: 0, items: [] };

        const doorPrice = calculatedArea * selectedDoor.priceFrom;
        const labor = calculatedArea * LABOR_COST.rolling;

        const total = doorPrice + labor;

        return {
            totalArea: calculatedArea,
            basePrice: doorPrice,
            accessoryPrice: 0,
            laborCost: labor,
            total: total,
            items: [
                { name: selectedDoor.name, quantity: calculatedArea, unit: 'm²', unitPrice: selectedDoor.priceFrom, total: doorPrice },
                { name: 'Nhân công lắp đặt & Vận chuyển', quantity: calculatedArea, unit: 'm²', unitPrice: LABOR_COST.rolling, total: labor },
            ]
        };
    }, [calculatedArea, config.id, products]);

    const handleExportPDF = async () => {
        // Dynamic import to avoid SSR issues
        const { jsPDF } = await import('jspdf');
        const autoTable = (await import('jspdf-autotable')).default;

        const doc = new jsPDF();

        // Add fonts if needed, or use default
        doc.setFontSize(20);
        doc.text("BÁO GIÁ CỬA CUỐN", 105, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.text(`Ngày: ${new Date().toLocaleDateString('vi-VN')}`, 20, 30);

        const tableBody = quote.items.map(item => [
            item.name,
            item.quantity.toString(),
            item.unit,
            item.unitPrice.toLocaleString('vi-VN'),
            item.total.toLocaleString('vi-VN')
        ]);

        // @ts-ignore
        autoTable(doc, {
            head: [['Hạng mục', 'Số lượng', 'ĐVT', 'Đơn giá', 'Thành tiền']],
            body: tableBody,
            startY: 40,
            theme: 'grid',
            styles: { font: 'helvetica', fontSize: 10 },
            headStyles: { fillColor: [27, 57, 157] }
        });

        // @ts-ignore
        const finalY = doc.lastAutoTable.finalY || 50;

        doc.setFontSize(14);
        doc.text(`TỔNG CỘNG: ${quote.total.toLocaleString('vi-VN')} VNĐ`, 140, finalY + 20, { align: 'right' });

        // Note about motor
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("* Giá chưa bao gồm bộ tời (motor). Liên hệ để được tư vấn motor phù hợp.", 20, finalY + 35);

        doc.save('Bao_Gia_Cua_Cuon.pdf');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-7 space-y-6">
                <Card className="border-0 shadow-lg bg-white dark:bg-[#1e2330]">
                    <CardContent className="p-6 space-y-4">
                        <h3 className="text-lg font-bold text-[#1b399d] flex items-center gap-2">
                            <span className="material-symbols-outlined">settings</span>
                            Cấu hình cửa
                        </h3>

                        {/* Chọn loại nan */}
                        <div className="space-y-2">
                            <Label>Chọn mẫu nan cửa</Label>
                            <Select
                                value={config.id}
                                onValueChange={(val) => setConfig(prev => ({ ...prev, id: val }))}
                            >
                                <SelectTrigger className="h-12 text-base">
                                    <SelectValue placeholder="Chọn mẫu cửa" />
                                </SelectTrigger>
                                <SelectContent>
                                    {products.map(p => (
                                        <SelectItem key={p.id} value={p.id}>
                                            {p.name} - {(p.priceFrom / 1000).toFixed(0)}k/m²
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Kích thước */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Chiều rộng (mm)</Label>
                                <Input
                                    type="number"
                                    placeholder="Ví dụ: 3000"
                                    value={config.width || ''}
                                    onChange={(e) => setConfig(prev => ({ ...prev, width: Number(e.target.value) }))}
                                    className="h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Chiều cao (mm)</Label>
                                <Input
                                    type="number"
                                    placeholder="Ví dụ: 3500"
                                    value={config.height || ''}
                                    onChange={(e) => setConfig(prev => ({ ...prev, height: Number(e.target.value) }))}
                                    className="h-12"
                                />
                            </div>
                        </div>

                        {/* Diện tích Result */}
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex justify-between items-center text-sm">
                            <span className="text-slate-600 dark:text-slate-300">Diện tích tạm tính:</span>
                            <span className="font-bold text-[#1b399d] text-base">{calculatedArea} m²</span>
                        </div>

                        {/* Note about motor */}
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-sm">
                            <div className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-amber-600 text-base mt-0.5">info</span>
                                <div>
                                    <span className="font-medium text-amber-700 dark:text-amber-400">Lưu ý:</span>
                                    <span className="text-amber-600 dark:text-amber-300 ml-1">
                                        Giá chưa bao gồm bộ tời (motor). Liên hệ hotline để được tư vấn motor phù hợp với cửa của bạn.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quote Summary */}
            <div className="lg:col-span-5">
                <div className="sticky top-24 bg-white dark:bg-[#1e2330] rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="bg-[#1b399d] p-4 text-white font-bold text-center">
                        DỰ TOÁN CHI PHÍ
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="space-y-3 text-sm">
                            {quote.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-start pb-2 border-b border-dashed border-gray-200 dark:border-gray-700">
                                    <div className="flex-1">
                                        <div className="font-medium text-slate-900 dark:text-white">{item.name}</div>
                                        <div className="text-xs text-slate-500">
                                            {item.quantity} {item.unit} x {(item.unitPrice / 1000).toLocaleString()}k
                                        </div>
                                    </div>
                                    <div className="font-bold text-slate-700 dark:text-gray-300">
                                        {(item.total / 1000000).toFixed(2)} tr
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 flex justify-between items-center">
                            <span className="text-lg font-bold text-slate-900 dark:text-white">TỔNG CỘNG:</span>
                            <span className="text-2xl font-black text-[#1b399d]">
                                {(quote.total / 1000000).toFixed(2)} <span className="text-sm font-normal text-slate-500">triệu</span>
                            </span>
                        </div>

                        <p className="text-xs text-gray-500 italic text-center">
                            * Chưa bao gồm bộ tời (motor)
                        </p>

                        <Button
                            onClick={handleExportPDF}
                            className="w-full h-12 bg-[#1b399d] hover:bg-[#132a75] text-white font-bold rounded-xl mt-4"
                        >
                            <span className="material-symbols-outlined mr-2">download</span>
                            Tải báo giá PDF
                        </Button>

                        <QuoteSubmissionForm
                            onSuccess={() => { }}
                            quoteData={quote}
                            productName={products.find(p => p.id === config.id)?.name || 'Cửa cuốn'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
