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

export function AluminumDoorCalculator({ products }: Props) {
    const [config, setConfig] = useState({
        id: products[0]?.id || '',
        width: 0,
        height: 0,
        area: 0,
        wings: '2', // Số cánh
        type: 'opening', // opening | sliding
    });

    // Calculate Quote
    const quote = useMemo<QuoteResult>(() => {
        const selectedProd = products.find(p => p.id === config.id);
        if (!selectedProd) return { totalArea: 0, basePrice: 0, accessoryPrice: 0, laborCost: 0, total: 0, items: [] };

        const area = (config.width * config.height) / 1000000;
        const doorPrice = area * selectedProd.priceFrom;

        // Phụ kiện giả định (Cần schema chi tiết hơn cho SX thật)
        let accPrice = 0;
        if (config.wings === '1') accPrice = 800000;
        if (config.wings === '2') accPrice = 1500000;
        if (config.wings === '4') accPrice = 2800000;

        const labor = area * LABOR_COST.aluminum;
        const total = doorPrice + accPrice + labor;

        return {
            totalArea: parseFloat(area.toFixed(2)),
            basePrice: doorPrice,
            accessoryPrice: accPrice,
            laborCost: labor,
            total,
            items: [
                { name: selectedProd.name, quantity: parseFloat(area.toFixed(2)), unit: 'm²', unitPrice: selectedProd.priceFrom, total: doorPrice },
                { name: `Bộ phụ kiện ${config.wings} cánh (${config.type === 'opening' ? 'Mở quay' : 'Mở lùa'})`, quantity: 1, unit: 'Bộ', unitPrice: accPrice, total: accPrice },
                { name: 'Nhân công & Vận chuyển', quantity: parseFloat(area.toFixed(2)), unit: 'm²', unitPrice: LABOR_COST.aluminum, total: labor },
            ]
        };
    }, [config, products]);

    const handleExportPDF = async () => {
        const { jsPDF } = await import('jspdf');
        const autoTable = (await import('jspdf-autotable')).default;
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("BÁO GIÁ CỬA NHÔM XINGFA", 105, 20, { align: 'center' });

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
            headStyles: { fillColor: [27, 57, 157] }
        });

        // @ts-ignore
        const finalY = doc.lastAutoTable.finalY || 50;
        doc.text(`TỔNG CỘNG: ${quote.total.toLocaleString('vi-VN')} VNĐ`, 140, finalY + 20, { align: 'right' });
        doc.save('Bao_Gia_Cua_Nhom.pdf');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
                <Card className="border-0 shadow-lg bg-white dark:bg-[#1e2330]">
                    <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                            <Label>Chọn hệ nhôm</Label>
                            <Select value={config.id} onValueChange={(val) => setConfig(prev => ({ ...prev, id: val }))}>
                                <SelectTrigger className="h-12"><SelectValue placeholder="Chọn hệ nhôm" /></SelectTrigger>
                                <SelectContent>
                                    {products.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Chiều rộng (mm)</Label>
                                <Input type="number" onChange={(e) => setConfig(prev => ({ ...prev, width: Number(e.target.value) }))} />
                            </div>
                            <div className="space-y-2">
                                <Label>Chiều cao (mm)</Label>
                                <Input type="number" onChange={(e) => setConfig(prev => ({ ...prev, height: Number(e.target.value) }))} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Số cánh</Label>
                                <Select value={config.wings} onValueChange={(val) => setConfig(prev => ({ ...prev, wings: val }))}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1 Cánh</SelectItem>
                                        <SelectItem value="2">2 Cánh</SelectItem>
                                        <SelectItem value="4">4 Cánh</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Quy cách mở</Label>
                                <Select value={config.type} onValueChange={(val) => setConfig(prev => ({ ...prev, type: val }))}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="opening">Mở quay</SelectItem>
                                        <SelectItem value="sliding">Mở lùa (Trượt)</SelectItem>
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
                                <div>
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-xs text-slate-500">{item.quantity} {item.unit}</div>
                                </div>
                                <div className="font-bold">{(item.total / 1000000).toFixed(2)} tr</div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-4 mt-2 font-black text-xl text-center text-[#1b399d]">
                        {quote.total.toLocaleString('vi-VN')} ₫
                    </div>
                    <Button onClick={handleExportPDF} className="w-full mt-4 bg-[#1b399d]">Tải Báo Giá PDF</Button>

                    <QuoteSubmissionForm
                        onSuccess={() => { }}
                        quoteData={quote}
                        productName={products.find(p => p.id === config.id)?.name || 'Cửa nhôm'}
                    />
                </div>
            </div>
        </div>
    );
}
