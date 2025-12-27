'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LABOR_COST } from '@/lib/quote-constants';

interface Props {
    products: Product[];
}

// Door type definitions
const DOOR_TYPES = [
    { id: 'khe_thoang', name: 'Khe Thoáng', icon: 'grid_view', categories: ['cat_khe_thoang'] },
    { id: 'tam_lien', name: 'Tấm Liền', icon: 'maximize', categories: ['cat_tam_lien'] },
    { id: 'truot_tran', name: 'Trượt Trần', icon: 'splitscreen_top', categories: ['cat_cong_nghiep'] },
];

// Color mapping for preview
const COLOR_MAP: Record<string, string> = {
    'ghi sáng': '#e5e7eb',
    'ghi sần': '#64748b',
    'ghi đậm': '#374151',
    'ghi xám': '#6b7280',
    'cafe': '#5d4037',
    'cafe sữa': '#8d6e63',
    'vàng kem': '#f5f5dc',
    'kem': '#f5f5dc',
    'trắng sữa': '#fafafa',
    'nâu đất': '#795548',
    'xanh xám': '#455a64',
    'vân gỗ': '#8d6e63',
};

// Parse colors from product features
function parseColors(features: string[]): { code: string; name: string; hex: string }[] {
    const colors: { code: string; name: string; hex: string }[] = [];

    for (const feature of features) {
        if (feature.toLowerCase().startsWith('màu')) {
            // Parse "Màu #05 Ghi sáng, #25 Ghi xám"
            const colorParts = feature.replace(/^màu\s*/i, '').split(',');
            for (const part of colorParts) {
                const match = part.trim().match(/#?(\d+)\s*(.+)/);
                if (match) {
                    const code = match[1];
                    const name = match[2].trim().toLowerCase();
                    const hex = COLOR_MAP[name] || '#94a3b8';
                    colors.push({ code, name: match[2].trim(), hex });
                }
            }
        }
    }

    return colors.length > 0 ? colors : [{ code: '00', name: 'Mặc định', hex: '#94a3b8' }];
}

export default function AdvancedCalculator({ products }: Props) {
    // State
    const [doorType, setDoorType] = useState('khe_thoang');
    const [selectedProductId, setSelectedProductId] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [width, setWidth] = useState(2500);
    const [height, setHeight] = useState(2100);
    const [motorId, setMotorId] = useState('');
    const [upsId, setUpsId] = useState('');

    // Filter products by door type
    const doorProducts = useMemo(() => {
        const doorTypeConfig = DOOR_TYPES.find(d => d.id === doorType);
        if (!doorTypeConfig) return [];
        return products.filter(p => doorTypeConfig.categories.includes(p.categoryId));
    }, [products, doorType]);

    // Select first product when door type changes
    useMemo(() => {
        if (doorProducts.length > 0 && !doorProducts.find(p => p.id === selectedProductId)) {
            setSelectedProductId(doorProducts[0].id);
        }
    }, [doorProducts, selectedProductId]);

    // Get selected product
    const selectedProduct = products.find(p => p.id === selectedProductId);

    // Get available colors for selected product
    const availableColors = useMemo(() => {
        if (!selectedProduct) return [];
        return parseColors(selectedProduct.features);
    }, [selectedProduct]);

    // Select first color when product changes
    useMemo(() => {
        if (availableColors.length > 0 && !availableColors.find(c => c.code === selectedColor)) {
            setSelectedColor(availableColors[0].code);
        }
    }, [availableColors, selectedColor]);

    // Filter motors and UPS
    const motors = products.filter(p => p.categoryId === 'cat_motor');
    const upsList = products.filter(p => p.categoryId === 'cat_luu_dien');

    // Calculate area (with overlaps: +170mm width, +500mm height)
    const areaM2 = useMemo(() => {
        const totalWidth = width + 170;
        const totalHeight = height + 500;
        return parseFloat(((totalWidth * totalHeight) / 1000000).toFixed(2));
    }, [width, height]);

    // Calculate quote
    const quote = useMemo(() => {
        const items: { name: string; detail: string; price: number }[] = [];

        // Door price
        if (selectedProduct) {
            const doorPrice = areaM2 * selectedProduct.priceFrom;
            items.push({
                name: `Nan ${selectedProduct.name.split(' ').pop()} (${DOOR_TYPES.find(d => d.id === doorType)?.name})`,
                detail: `${areaM2} m² x ${(selectedProduct.priceFrom / 1000).toFixed(0)}k`,
                price: doorPrice
            });
        }

        // Motor price
        const motor = motors.find(m => m.id === motorId);
        if (motor) {
            items.push({
                name: `Motor ${motor.name.split(' ').pop()}`,
                detail: motor.description?.slice(0, 30) || 'Động cơ cửa cuốn',
                price: motor.priceFrom
            });
        }

        // Labor cost
        const laborCost = areaM2 * LABOR_COST.rolling;
        items.push({
            name: 'Công Lắp Đặt',
            detail: 'Tiêu chuẩn kỹ thuật cao',
            price: laborCost
        });

        // UPS price
        const ups = upsList.find(u => u.id === upsId);
        if (ups) {
            items.push({
                name: `UPS ${ups.name.split(' ').pop()}`,
                detail: ups.description?.slice(0, 30) || 'Bộ lưu điện',
                price: ups.priceFrom
            });
        }

        const total = items.reduce((sum, item) => sum + item.price, 0);

        return { items, total };
    }, [selectedProduct, areaM2, doorType, motorId, upsId, motors, upsList]);

    // Get current color hex for preview
    const currentColorHex = availableColors.find(c => c.code === selectedColor)?.hex || '#94a3b8';

    return (
        <div className="relative flex min-h-screen flex-col bg-slate-50">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-slate-200/60 bg-white/80 backdrop-blur-md px-6 py-4 sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-[#1b399d]/10 flex items-center justify-center text-[#1b399d] shadow-sm">
                        <span className="material-symbols-outlined">calculate</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold leading-tight text-slate-900">Dự Toán Chi Phí</h2>
                        <p className="text-xs text-slate-500 font-medium">Phiên bản nâng cao v1.0</p>
                    </div>
                </div>
                <Button className="bg-[#1b399d] hover:bg-blue-800 text-white font-bold shadow-lg shadow-[#1b399d]/20">
                    Xuất Báo Giá
                </Button>
            </header>

            <div className="flex flex-1 flex-col lg:flex-row">
                {/* Main Content */}
                <main className="flex-1 p-4 lg:p-10 overflow-y-auto">
                    <div className="max-w-4xl mx-auto flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-slate-900">Cấu Hình Sản Phẩm</h1>
                            <p className="text-slate-500 text-sm lg:text-base max-w-xl">
                                Lựa chọn chi tiết loại nan, động cơ và phụ kiện để có báo giá chính xác nhất.
                            </p>
                        </div>

                        {/* Step 1: Door Type & Slat */}
                        <section className="space-y-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1b399d] text-white text-sm font-bold shadow-md">1</span>
                                    <h3 className="text-lg font-bold text-slate-900">Chọn Loại Cửa &amp; Mẫu Nan</h3>
                                </div>
                                <span className="text-xs font-medium text-[#1b399d] bg-blue-50 px-2 py-1 rounded-full border border-blue-100">Bước quan trọng</span>
                            </div>

                            {/* Door Type Selection */}
                            <div className="grid grid-cols-3 gap-4">
                                {DOOR_TYPES.map((type) => (
                                    <label key={type.id} className="group cursor-pointer relative">
                                        <input
                                            type="radio"
                                            name="door_type"
                                            value={type.id}
                                            checked={doorType === type.id}
                                            onChange={() => setDoorType(type.id)}
                                            className="peer sr-only"
                                        />
                                        <div className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all duration-200 h-full
                                            ${doorType === type.id
                                                ? 'border-[#1b399d] bg-blue-50/50 shadow-lg ring-1 ring-[#1b399d]'
                                                : 'border-slate-200 bg-white hover:border-[#1b399d]/50 hover:bg-slate-50'
                                            }`}>
                                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-1 transition-all
                                                ${doorType === type.id
                                                    ? 'bg-white shadow-sm text-[#1b399d]'
                                                    : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm group-hover:text-[#1b399d]'
                                                }`}>
                                                <span className="material-symbols-outlined text-2xl">{type.icon}</span>
                                            </div>
                                            <p className={`font-bold text-sm text-center ${doorType === type.id ? 'text-[#1b399d]' : 'text-slate-900 group-hover:text-[#1b399d]'}`}>
                                                {type.name}
                                            </p>
                                            {doorType === type.id && (
                                                <span className="absolute top-2 right-2 text-[#1b399d]">
                                                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                                </span>
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>

                            {/* Slat Selection */}
                            <div className="rounded-2xl bg-slate-50/80 border border-slate-200 p-5 shadow-sm relative overflow-hidden">
                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#1b399d]/5 rounded-full blur-2xl"></div>
                                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b399d]"></span>
                                    Các Dòng Nan Cửa {DOOR_TYPES.find(d => d.id === doorType)?.name}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {doorProducts.slice(0, 6).map((product) => (
                                        <label key={product.id} className="relative cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="slat_model"
                                                value={product.id}
                                                checked={selectedProductId === product.id}
                                                onChange={() => setSelectedProductId(product.id)}
                                                className="peer sr-only"
                                            />
                                            <div className={`h-full rounded-xl border bg-white p-4 transition-all hover:border-[#1b399d] hover:shadow-md relative overflow-hidden
                                                ${selectedProductId === product.id ? 'border-[#1b399d] ring-1 ring-[#1b399d]' : 'border-slate-200'}`}>
                                                <div className={`absolute top-0 left-0 w-1 h-full bg-[#1b399d] transition-opacity ${selectedProductId === product.id ? 'opacity-100' : 'opacity-0'}`}></div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <p className="font-bold text-slate-900 text-lg">{product.name.split(' ').pop()}</p>
                                                        <p className="text-xs text-slate-500">{product.features[0]}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-[#1b399d]">{(product.priceFrom / 1000).toFixed(0)}k</p>
                                                        <p className="text-[10px] text-slate-500">/m²</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-1 mt-3">
                                                    <div className="flex justify-between text-xs text-slate-500">
                                                        <span>Độ dày</span>
                                                        <span className="font-medium text-slate-900">{product.specifications?.thickness || 'N/A'}</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs text-slate-500">
                                                        <span>Màu sắc</span>
                                                        <span className="font-medium text-slate-900">
                                                            {parseColors(product.features).map(c => c.name).join(', ').slice(0, 20)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Color Picker */}
                            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                                <div className="p-6 pb-0">
                                    <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-1">
                                        <span className="material-symbols-outlined text-[#1b399d]">palette</span>
                                        Bộ Sưu Tập Màu Sắc
                                    </h4>
                                    <p className="text-sm text-slate-500">Sơn tĩnh điện cao cấp ngoài trời, bảo hành 10 năm không bay màu.</p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-6 p-6">
                                    {/* Door Preview */}
                                    <div className="w-full md:w-1/2 lg:w-5/12">
                                        <div className="aspect-[4/3] rounded-2xl bg-slate-100 relative overflow-hidden shadow-inner ring-1 ring-slate-200">
                                            <div className="absolute inset-0 flex flex-col w-full h-full transition-colors duration-500">
                                                <div className="h-[15%] bg-slate-200 border-b border-slate-300 relative z-10"></div>
                                                <div className="h-[12%] mx-6 bg-slate-100 border border-slate-300 rounded-b-md shadow-sm relative z-20 flex items-center justify-center">
                                                    <span className="text-[10px] font-black text-slate-400 tracking-widest opacity-50">AUSTDOOR</span>
                                                </div>
                                                <div
                                                    className="flex-1 mx-8 relative shadow-inner flex flex-col border-x border-slate-300 transition-colors duration-300"
                                                    style={{ backgroundColor: currentColorHex }}
                                                >
                                                    <div className="w-full h-full opacity-20" style={{
                                                        background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 12px)'
                                                    }}></div>
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10"></div>
                                                </div>
                                                <div className="h-[10%] bg-slate-200 border-t border-slate-300 relative z-10"></div>
                                            </div>
                                            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/50 text-xs font-bold text-slate-700 flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                                <span>Xem trước: <span className="text-[#1b399d]">{availableColors.find(c => c.code === selectedColor)?.name || 'Mặc định'}</span></span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Color Options */}
                                    <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col justify-center">
                                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-6">
                                            {availableColors.map((color) => (
                                                <label key={color.code} className="group cursor-pointer flex flex-col items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name="door_color"
                                                        value={color.code}
                                                        checked={selectedColor === color.code}
                                                        onChange={() => setSelectedColor(color.code)}
                                                        className="peer sr-only"
                                                    />
                                                    <div
                                                        className={`w-14 h-14 rounded-full shadow-md ring-2 ring-offset-2 transition-all duration-300 hover:shadow-lg relative overflow-hidden
                                                            ${selectedColor === color.code ? 'ring-[#1b399d] scale-110' : 'ring-transparent'}`}
                                                        style={{ backgroundColor: color.hex }}
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
                                                        {selectedColor === color.code && (
                                                            <span className="absolute inset-0 flex items-center justify-center">
                                                                <span className="material-symbols-outlined text-white drop-shadow-md">check</span>
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className={`text-xs font-semibold text-center transition-colors
                                                        ${selectedColor === color.code ? 'text-[#1b399d]' : 'text-slate-500 group-hover:text-[#1b399d]'}`}>
                                                        {color.name}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                        <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100/50 flex gap-3">
                                            <span className="material-symbols-outlined text-[#1b399d] mt-0.5">lightbulb</span>
                                            <div>
                                                <p className="text-xs font-bold text-slate-900 mb-1">Gợi ý từ chuyên gia</p>
                                                <p className="text-xs text-slate-500 leading-relaxed">
                                                    Màu <span className="font-bold text-slate-700">Ghi Sần</span> là lựa chọn phổ biến nhất (70% khách hàng) vì khả năng giấu bụi tốt.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Step 2: Dimensions */}
                        <section className="space-y-5">
                            <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1b399d] text-white text-sm font-bold shadow-md">2</span>
                                <h3 className="text-lg font-bold text-slate-900">Kích Thước Phủ Bì</h3>
                            </div>
                            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-900 flex items-center justify-between">
                                            Chiều Rộng (Wpb)
                                            <span className="text-[10px] font-medium text-slate-400">Đơn vị: mm</span>
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-[#1b399d] transition-colors">straighten</span>
                                            </div>
                                            <Input
                                                type="number"
                                                value={width}
                                                onChange={(e) => setWidth(Number(e.target.value))}
                                                className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 pl-10 pr-24 font-bold text-lg h-12"
                                                placeholder="2500"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none gap-2">
                                                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                                                    <span className="material-symbols-outlined text-[10px] font-bold">add</span>170mm
                                                </span>
                                                <span className="text-xs font-bold text-slate-400">mm</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-900 flex items-center justify-between">
                                            Chiều Cao (Hpb)
                                            <span className="text-[10px] font-medium text-slate-400">Đơn vị: mm</span>
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-[#1b399d] transition-colors">height</span>
                                            </div>
                                            <Input
                                                type="number"
                                                value={height}
                                                onChange={(e) => setHeight(Number(e.target.value))}
                                                className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 pl-10 pr-24 font-bold text-lg h-12"
                                                placeholder="2100"
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none gap-2">
                                                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                                                    <span className="material-symbols-outlined text-[10px] font-bold">add</span>500mm
                                                </span>
                                                <span className="text-xs font-bold text-slate-400">mm</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-slate-600">Diện tích tính toán:</span>
                                        <span className="text-xl font-black text-[#1b399d]">{areaM2} m²</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Bao gồm: {width}mm + 170mm (ray) x {height}mm + 500mm (lô cuốn)
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Step 3: Motor & UPS */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1b399d] text-white text-sm font-bold shadow-md">3</span>
                                <h3 className="text-lg font-bold text-slate-900">Cấu Hình Động Cơ &amp; UPS</h3>
                            </div>

                            {/* Motor Selection */}
                            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                                <div className="bg-slate-50/50 p-4 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">electric_car</span>
                                        Động Cơ (Motor)
                                    </h4>
                                    {doorType === 'khe_thoang' && (
                                        <div className="flex items-center gap-2 text-xs font-medium text-orange-700 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-lg">
                                            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                                            Cửa khe thoáng bắt buộc dùng động cơ
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {/* Manual option - disabled for khe_thoang */}
                                    <label className={`relative rounded-xl border p-4 flex flex-col justify-between ${doorType === 'khe_thoang' ? 'bg-slate-100 opacity-60 cursor-not-allowed border-slate-200' : 'bg-white cursor-pointer hover:border-[#1b399d] hover:shadow-md border-slate-200'}`}>
                                        <input
                                            type="radio"
                                            name="motor"
                                            value=""
                                            checked={motorId === '' && doorType !== 'khe_thoang'}
                                            onChange={() => setMotorId('')}
                                            disabled={doorType === 'khe_thoang'}
                                            className="peer sr-only"
                                        />
                                        <div className="flex justify-between items-start">
                                            <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-slate-400">
                                                <span className="material-symbols-outlined">pan_tool</span>
                                            </div>
                                            {doorType === 'khe_thoang' && (
                                                <span className="text-[10px] font-bold text-slate-500 uppercase border border-slate-300 px-1.5 py-0.5 rounded">Không khả dụng</span>
                                            )}
                                        </div>
                                        <div className="mt-3">
                                            <p className="font-bold text-slate-500">Kéo Tay / Lò Xo</p>
                                            <p className="text-xs text-slate-400 mt-1">Chỉ áp dụng cho cửa tấm liền</p>
                                        </div>
                                    </label>

                                    {/* Motor options */}
                                    {motors.slice(0, 2).map((motor) => (
                                        <label key={motor.id} className="relative cursor-pointer">
                                            <input
                                                type="radio"
                                                name="motor"
                                                value={motor.id}
                                                checked={motorId === motor.id}
                                                onChange={() => setMotorId(motor.id)}
                                                className="peer sr-only"
                                            />
                                            <div className={`h-full rounded-xl border bg-white p-4 transition-all hover:border-[#1b399d] hover:shadow-md
                                                ${motorId === motor.id ? 'border-[#1b399d] ring-1 ring-[#1b399d] bg-blue-50/10' : 'border-slate-200'}`}>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${motorId === motor.id ? 'bg-[#1b399d]/10 text-[#1b399d]' : 'bg-slate-100 text-slate-600'}`}>
                                                            <span className="font-bold text-xs">{motor.name.includes('AH') ? 'AH' : 'AK'}</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900 text-sm">{motor.name.split(' ').slice(-1)[0]}</p>
                                                            <p className="text-[10px] text-slate-500 uppercase">{motor.name.includes('AH') ? 'Nhập Khẩu' : 'Liên Doanh'}</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm font-bold text-[#1b399d]">{(motor.priceFrom / 1000).toFixed(0)}k</span>
                                                </div>
                                                <ul className="text-xs text-slate-500 space-y-1 mt-2 pl-1">
                                                    <li className="flex items-center gap-1.5">
                                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                        Bảo hành {motor.name.includes('AH') ? '60' : '24'} tháng
                                                    </li>
                                                    <li className="flex items-center gap-1.5">
                                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                        Tải trọng {motor.quoteConfig?.capacityKG || 300}kg
                                                    </li>
                                                </ul>
                                                {motorId === motor.id && (
                                                    <div className="absolute top-2 right-2 text-[#1b399d]">
                                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                                    </div>
                                                )}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* UPS Selection */}
                            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                                <div className="bg-slate-50/50 p-4 border-b border-slate-200/60">
                                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                        <span className="material-symbols-outlined text-lg">battery_charging_full</span>
                                        Bộ Lưu Điện (UPS)
                                    </h4>
                                </div>
                                <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {/* No UPS */}
                                    <label className="relative cursor-pointer">
                                        <input
                                            type="radio"
                                            name="ups"
                                            value=""
                                            checked={upsId === ''}
                                            onChange={() => setUpsId('')}
                                            className="peer sr-only"
                                        />
                                        <div className={`h-full rounded-xl border bg-white p-4 text-center transition-all hover:border-slate-400
                                            ${upsId === '' ? 'border-slate-400 bg-slate-100 ring-1 ring-slate-400' : 'border-slate-200'}`}>
                                            <p className="font-bold text-slate-600 text-sm mb-1">Không sử dụng</p>
                                            <p className="text-xs text-slate-400">Tiết kiệm chi phí</p>
                                        </div>
                                    </label>

                                    {/* UPS options */}
                                    {upsList.map((ups) => (
                                        <label key={ups.id} className="relative cursor-pointer">
                                            <input
                                                type="radio"
                                                name="ups"
                                                value={ups.id}
                                                checked={upsId === ups.id}
                                                onChange={() => setUpsId(ups.id)}
                                                className="peer sr-only"
                                            />
                                            <div className={`h-full rounded-xl border bg-white p-4 transition-all hover:border-emerald-500 hover:shadow-md
                                                ${upsId === ups.id ? 'border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500' : 'border-slate-200'}`}>
                                                <div className="flex justify-between items-center mb-1">
                                                    <p className="font-bold text-slate-900 text-sm">{ups.name.split(' ').pop()}</p>
                                                    <span className="text-xs font-bold text-emerald-600">+{(ups.priceFrom / 1000).toFixed(0)}k</span>
                                                </div>
                                                <p className="text-xs text-slate-500">{ups.description?.slice(0, 25)}</p>
                                                <div className="mt-2 text-[10px] text-slate-500 bg-slate-100 rounded px-1.5 py-0.5 w-fit">
                                                    {ups.quoteConfig?.maxDoorArea ? `Cho cửa < ${ups.quoteConfig.maxDoorArea}m²` : 'Lưu 24h'}
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <div className="h-10"></div>
                    </div>
                </main>

                {/* Sidebar - Quote Summary */}
                <aside className="w-full lg:w-[400px] shrink-0 border-l border-slate-200/60 bg-white/95 backdrop-blur-lg flex flex-col z-20">
                    <div className="p-6 lg:p-8 flex-1 flex flex-col">
                        {/* Total Price Card */}
                        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold">Tổng Chi Phí</h3>
                                    <p className="text-xs text-slate-300">Đã bao gồm VAT &amp; Lắp đặt</p>
                                </div>
                                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                                    <span className="material-symbols-outlined">receipt_long</span>
                                </div>
                            </div>
                            <p className="text-3xl font-black tracking-tight text-white">
                                {quote.total.toLocaleString('vi-VN')}₫
                            </p>
                        </div>

                        {/* Quote Items */}
                        <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                            {quote.items.map((item, idx) => (
                                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 group hover:border-[#1b399d]/30 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex gap-2">
                                            <span className="material-symbols-outlined text-sm text-slate-400 mt-0.5">
                                                {item.name.includes('Motor') ? 'electric_car' : item.name.includes('UPS') ? 'battery_charging_full' : item.name.includes('Lắp') ? 'handyman' : 'grid_view'}
                                            </span>
                                            <div>
                                                <p className="font-bold text-sm text-slate-900">{item.name}</p>
                                                <p className="text-xs text-slate-500 mt-0.5">{item.detail}</p>
                                            </div>
                                        </div>
                                        <p className="font-bold text-sm text-slate-900">{item.price.toLocaleString('vi-VN')}₫</p>
                                    </div>
                                </div>
                            ))}

                            {/* Placeholder for unselected items */}
                            {!motorId && doorType !== 'khe_thoang' && (
                                <div className="p-3 rounded-xl border border-dashed border-slate-200 opacity-50">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2 items-center">
                                            <span className="material-symbols-outlined text-sm text-slate-400">electric_car</span>
                                            <p className="text-sm font-medium text-slate-400">Chưa chọn Motor</p>
                                        </div>
                                        <p className="text-sm text-slate-400">--</p>
                                    </div>
                                </div>
                            )}
                            {!upsId && (
                                <div className="p-3 rounded-xl border border-dashed border-slate-200 opacity-50">
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2 items-center">
                                            <span className="material-symbols-outlined text-sm text-slate-400">battery_charging_full</span>
                                            <p className="text-sm font-medium text-slate-400">Chưa chọn UPS</p>
                                        </div>
                                        <p className="text-sm text-slate-400">--</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                            <Button className="w-full h-12 bg-[#1b399d] hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg shadow-[#1b399d]/30 flex items-center justify-center gap-2">
                                Đặt Hàng Ngay
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </Button>
                            <Button variant="outline" className="w-full h-11 border-slate-200 bg-white hover:bg-slate-50 text-slate-900 font-bold rounded-xl flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-lg">print</span>
                                In Báo Giá
                            </Button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
