'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Props {
    onSuccess: () => void;
    quoteData: any;
    productName: string;
}

export function QuoteSubmissionForm({ onSuccess, quoteData, productName }: Props) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    productName: productName,
                    message: `Yêu cầu báo giá từ tính năng tự động. Tổng tiền: ${quoteData.total?.toLocaleString()} VNĐ`,
                    area: quoteData.totalArea,
                    width: quoteData.items?.[0]?.quantity,
                    source: 'AUTO_QUOTE_CALCULATOR'
                })
            });

            if (res.ok) {
                toast.success("Gửi yêu cầu thành công!", {
                    description: "Chúng tôi sẽ liên hệ lại sớm nhất để xác nhận báo giá.",
                });
                setFormData({ name: '', phone: '', address: '' });
                onSuccess();
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra", {
                description: "Vui lòng thử lại sau hoặc gọi hotline.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Thông tin liên hệ</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên <span className="text-red-500">*</span></Label>
                    <Input
                        id="name"
                        required
                        placeholder="Nguyễn Văn A"
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại <span className="text-red-500">*</span></Label>
                    <Input
                        id="phone"
                        required
                        placeholder="0912..."
                        value={formData.phone}
                        onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ lắp đặt</Label>
                <Input
                    id="address"
                    placeholder="Số nhà, đường, quận/huyện..."
                    value={formData.address}
                    onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10">
                {loading ? 'Đang gửi...' : 'Gửi Yêu Cầu & Tư Vấn'}
            </Button>
        </form>
    );
}
