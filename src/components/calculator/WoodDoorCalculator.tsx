'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/lib/data';
import { QuoteResult, LABOR_COST } from '@/lib/quote-constants';
import { QuoteSubmissionForm } from './QuoteSubmissionForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Props {
    products: Product[];
    accessories: Product[];
}

export function WoodDoorCalculator({ products }: Props) {
    const [config, setConfig] = useState({
        id: products[0]?.id || '',
        quantity: 1,
        wallThickness: '100', // 100mm standard
    });

    const quote = useMemo<QuoteResult>(() => {
        const selectedProd = products.find(p => p.id === config.id);
        if (!selectedProd) return { totalArea: 0, basePrice: 0, accessoryPrice: 0, laborCost: 0, total: 0, items: [] };

        const unitPrice = selectedProd.priceFrom;
        // Phụ phí tường dày 200mm
        const surchargeConfig = config.wallThickness === '200' ? 300000 : 0;

        const doorPrice = (unitPrice + surchargeConfig) * config.quantity;
        const labor = LABOR_COST.wood * config.quantity;
        const total = doorPrice + labor;

        return {
            totalArea: 0,
            basePrice: doorPrice,
            accessoryPrice: 0,
            laborCost: labor,
            total,
            items: [
                { name: selectedProd.name, quantity: config.quantity, unit: 'Bộ', unitPrice: unitPrice, total: unitPrice * config.quantity },
                config.wallThickness === '200' ? { name: 'Phụ phí khuôn tường 200mm', quantity: config.quantity, unit: 'Bộ', unitPrice: 300000, total: 300000 * config.quantity } : null,
                { name: 'Nhân công lắp đặt', quantity: config.quantity, unit: 'Bộ', unitPrice: LABOR_COST.wood, total: labor },
            ].filter((x): x is NonNullable<typeof x> => x !== null)
        };
    }, [config, products]);

    const handleExportPDF = async () => {
        const { jsPDF } = await import('jspdf');
        const autoTable = (await import('jspdf-autotable')).default;
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("BÁO GIÁ CỬA GỖ COMPOSITE", 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.text(`Ngày: ${new Date().toLocaleDateString('vi-VN')}`, 20, 30);

        const tableBody = quote.items.map(item => [item.name, item.quantity.toString(), item.unit, item.unitPrice.toLocaleString('vi-VN'), item.total.toLocaleString('vi-VN')]);

        // @ts-ignore
        autoTable(doc, {
            head: [['Hạng mục', 'Số lượng', 'ĐVT', 'Đơn giá', 'Thành tiền']],
            body: tableBody,
            startY: 40,
            headStyles: { fillColor: [27, 57, 157] }
        });

        // @ts-ignore
        const finalY = doc.lastAutoTable.finalY || 50;
        doc.text(`TỔNG CỘNG: ${quote.total.toLocaleString('vi-VN')} VNĐ`, 140, finalY + 20, { align: 'right' });
        doc.save('Bao_Gia_Cua_Go.pdf');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
                <Card className="border-0 shadow-lg bg-white dark:bg-[#1e2330]">
                    <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                            <Label>Chọn mẫu cửa</Label>
                            <Select value={config.id} onValueChange={(val) => setConfig(prev => ({ ...prev, id: val }))}>
                                <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                                <SelectContent>{products.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Số lượng (Bộ)</Label>
                                <Input type="number" value={config.quantity} onChange={(e) => setConfig(prev => ({ ...prev, quantity: Number(e.target.value) }))} />
                            </div>
                            <div className="space-y-2">
                                <Label>Độ dày tường</Label>
                                <Select value={config.wallThickness} onValueChange={(val) => setConfig(prev => ({ ...prev, wallThickness: val }))}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="100">Tường 100mm (Tiêu chuẩn)</SelectItem>
                                        <SelectItem value="200">Tường 200mm (+300k/bộ)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-5">
                <div className="bg-white dark:bg-[#1e2330] rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold text-[#1b399d] mb-4 text-center">CHI TIẾT BÁO GIÁ</h3>
                    <div className="space-y-3 text-sm">
                        {quote.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between border-b pb-2 dark:border-slate-700">
                                <div><div className="font-medium">{item.name}</div><div className="text-xs text-slate-500">{item.quantity} {item.unit}</div></div>
                                <div className="font-bold">{(item.total / 1000000).toFixed(2)} tr</div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-4 mt-2 font-black text-xl text-center text-[#1b399d]">{quote.total.toLocaleString('vi-VN')} ₫</div>
                    <Button onClick={handleExportPDF} className="w-full mt-4 bg-[#1b399d]">Tải Báo Giá PDF</Button>

                    <QuoteSubmissionForm
                        onSuccess={() => { }}
                        quoteData={quote}
                        productName={products.find(p => p.id === config.id)?.name || 'Cửa gỗ'}
                    />
                </div>
            </div>
        </div>
    );
}
