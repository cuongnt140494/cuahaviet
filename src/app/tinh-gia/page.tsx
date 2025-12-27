import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Product models data
const productModels = [
    {
        id: 'E50',
        name: 'Khe Thoáng E50',
        description: 'Dày 0.9 - 1.1mm',
        type: 'Nan Nhôm',
        typeColor: 'bg-blue-600',
        originalPrice: 1550000,
        price: 1350000,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF6am1-MWsO1NkCL5p8pRU0T2jVzvgWWRa3huDYf6YXG8d5rLKQ6nMU5k3fY8JyAqwdQJvA1ePi4knRhrw8wtw0FAjEF2RaMVhYEPGPUkHHIBfjhE0dq4U3BMtlNl-05pYC1bauPldX1Gybf4bg8wMqawstWM7qAiTrt3wFbD4bUbdvCZ1l6fWomiP2Ohh_KSBKVyhHWe8SroW6QJTxeYLoIQCxkcXYO8kKHQu4q22_ByePDa92mFPKwDo5u_XU3_9hEO1mHmNqAVo',
    },
    {
        id: 'S52',
        name: 'Siêu Êm S52',
        description: 'Dày 1.1 - 1.2mm + Gioăng',
        type: 'Nan Nhôm',
        typeColor: 'bg-blue-600',
        originalPrice: 1750000,
        price: 1550000,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF6am1-MWsO1NkCL5p8pRU0T2jVzvgWWRa3huDYf6YXG8d5rLKQ6nMU5k3fY8JyAqwdQJvA1ePi4knRhrw8wtw0FAjEF2RaMVhYEPGPUkHHIBfjhE0dq4U3BMtlNl-05pYC1bauPldX1Gybf4bg8wMqawstWM7qAiTrt3wFbD4bUbdvCZ1l6fWomiP2Ohh_KSBKVyhHWe8SroW6QJTxeYLoIQCxkcXYO8kKHQu4q22_ByePDa92mFPKwDo5u_XU3_9hEO1mHmNqAVo',
        badge: 'Bán chạy',
    },
    {
        id: 'C70',
        name: 'Tấm Liền C70',
        description: 'Thép hợp kim mạ màu',
        type: 'Thép Tấm Liền',
        typeColor: 'bg-amber-600',
        originalPrice: 950000,
        price: 820000,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDdGICBecOy9frj4lXOmkGPVzHNRUtqNA_EdNvG-M99ACte0twKPnBoybWNpEJQ5VvLD1LGy8n_ZLsx_P4DWY2uFlownyBHrcnTEK2UR0sCHCgrqCUKSB2DajGFmPmxlyaBC9ai-BrgrfifObrKrVDb6dADWdLL4rmTKTZlFNf-7D7Y6aowceBPQHXyK7Vct_I6v0yv6VUV8O410mF9jD1yj64h-b0_2Cqb8SrKbK3gmZTgI23_WwfYq5M2g3gArNYtdYUHmi2qiAJ',
    },
    {
        id: 'A70',
        name: 'Nan Nghệ Thuật A70',
        description: 'Dày 1.2 - 1.3mm',
        type: 'Cao Cấp',
        typeColor: 'bg-purple-600',
        originalPrice: 2100000,
        price: 1890000,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSFk5WCFjsuAvTNAisxcfipmW8mOU7fTkBcdgTlzDk9ICND-wCkJqjimt0uqlzZbQjdNdxEF-8uc18DAlcwM72Bw8pn39BE-gVxpPGeIaClN97KVOCuNJz9LPWWZ6bTvGcl0D-WWjFlVEIMGJcuRCMzugkqePr7RuyfFq6XGkUii8Jr4FcEQ4yTU4zpbEyeFBdJHuAcGkEDoXwMIFyLHOSfAVTRc_SIZUUaSHBFxOSjNO37Vp8uym0g4OYm9f-KHJb4GIeazMZx29Y',
    },
];

// Colors data
const colors = [
    { id: 'cafe', name: 'Cà phê', hex: '#8d7b68' },
    { id: 'ghi-sang', name: 'Ghi sáng', hex: '#d6d3ce' },
    { id: 'kem-vang', name: 'Kem vàng', hex: '#fcf5e5' },
    { id: 'ghi-dam', name: 'Ghi đậm', hex: '#525252' },
];

export default function PriceCalculatorPage() {
    const [selectedModel, setSelectedModel] = useState('S52');
    const [selectedColor, setSelectedColor] = useState('cafe');
    const [width, setWidth] = useState(3370);
    const [height, setHeight] = useState(3300);

    // Calculate price
    const calculation = useMemo(() => {
        const model = productModels.find(m => m.id === selectedModel);
        if (!model) return null;

        const widthM = width / 1000;
        const heightM = height / 1000;
        const area = widthM * heightM;
        const total = Math.round(area * model.price);

        return {
            model,
            widthM: widthM.toFixed(2),
            heightM: heightM.toFixed(2),
            area: area.toFixed(2),
            total,
        };
    }, [selectedModel, width, height]);

    const selectedColorData = colors.find(c => c.id === selectedColor);

    return (
        <main className="flex-grow py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                    Tính giá Cửa Cuốn
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
                    Lựa chọn mẫu cửa phù hợp và nhận báo giá dự kiến ngay lập tức.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column - Form */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Step 1: Product Selection */}
                    <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-[#1b399d] text-white flex items-center justify-center font-bold text-sm shadow-lg">
                                1
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Chọn mẫu sản phẩm</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {productModels.map((model) => (
                                <label key={model.id} className="cursor-pointer relative group block h-full">
                                    <input
                                        type="radio"
                                        name="product_model"
                                        value={model.id}
                                        checked={selectedModel === model.id}
                                        onChange={(e) => setSelectedModel(e.target.value)}
                                        className="peer sr-only"
                                    />
                                    <div className={`h-full p-4 rounded-xl border-2 transition-all flex flex-col relative overflow-hidden ${selectedModel === model.id
                                        ? 'border-[#1b399d] bg-blue-50 dark:bg-blue-900/20 shadow-md'
                                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#1b399d]/60'
                                        }`}>
                                        {model.badge && (
                                            <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-10">
                                                {model.badge}
                                            </div>
                                        )}

                                        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-slate-100">
                                            <Image
                                                src={model.image}
                                                alt={model.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className={`absolute top-2 left-2 ${model.typeColor} text-white text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm`}>
                                                {model.type}
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{model.name}</h3>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">{model.description}</p>
                                            </div>
                                            <span className={`material-symbols-outlined text-[#1b399d] text-2xl transition-all duration-300 ${selectedModel === model.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                                                }`}>
                                                check_circle
                                            </span>
                                        </div>

                                        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-baseline">
                                            <span className="text-slate-400 text-xs line-through">
                                                {(model.originalPrice).toLocaleString('vi-VN')}₫
                                            </span>
                                            <span className="text-[#1b399d] font-bold text-lg">
                                                {(model.price).toLocaleString('vi-VN')}₫
                                                <span className="text-xs font-normal text-slate-400">/m²</span>
                                            </span>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* Step 2: Color Selection */}
                    <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300 flex items-center justify-center font-bold text-sm">
                                2
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Chọn màu sắc</h2>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {colors.map((color) => (
                                <label key={color.id} className="cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="color"
                                        value={color.id}
                                        checked={selectedColor === color.id}
                                        onChange={(e) => setSelectedColor(e.target.value)}
                                        className="peer sr-only"
                                    />
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`w-14 h-14 rounded-full shadow-md border-2 border-white dark:border-slate-800 ring-2 transition-all flex items-center justify-center ${selectedColor === color.id
                                                ? 'ring-[#1b399d]'
                                                : 'ring-transparent hover:ring-[#1b399d]/50'
                                                }`}
                                            style={{ backgroundColor: color.hex }}
                                        >
                                            {selectedColor === color.id && (
                                                <span className={`material-symbols-outlined text-xl ${color.hex === '#fcf5e5' || color.hex === '#d6d3ce' ? 'text-slate-700' : 'text-white'
                                                    }`}>
                                                    check
                                                </span>
                                            )}
                                        </div>
                                        <span className={`text-xs font-medium mt-2 transition-colors ${selectedColor === color.id ? 'text-[#1b399d]' : 'text-slate-600 dark:text-slate-400'
                                            }`}>
                                            {color.name}
                                        </span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* Step 3: Dimensions */}
                    <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300 flex items-center justify-center font-bold text-sm">
                                3
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Kích thước cửa (mm)</h2>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Input Fields */}
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="relative group">
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
                                        Chiều rộng (Wpb)
                                        <span className="text-xs font-normal text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                                            Rộng phủ bì
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            value={width}
                                            onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                                            className="pl-4 pr-12 py-3.5 bg-slate-50 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium"
                                            placeholder="Nhập số đo"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                            <span className="text-slate-500 font-bold text-sm">mm</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">straighten</span>
                                        Thông thủy gợi ý: <span className="font-bold text-slate-700 dark:text-slate-300">{width - 170}mm</span>
                                    </p>
                                </div>

                                <div className="relative group">
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
                                        Chiều cao (Hpb)
                                        <span className="text-xs font-normal text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                                            Cao phủ bì
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            value={height}
                                            onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                                            className="pl-4 pr-12 py-3.5 bg-slate-50 dark:bg-slate-900/50 border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium"
                                            placeholder="Nhập số đo"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                            <span className="text-slate-500 font-bold text-sm">mm</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">vertical_align_center</span>
                                        Thông thủy gợi ý: <span className="font-bold text-slate-700 dark:text-slate-300">{height - 500}mm</span>
                                    </p>
                                </div>
                            </div>

                            {/* Formula Info */}
                            <div className="w-full md:w-1/2 bg-blue-50 dark:bg-blue-900/10 rounded-xl p-5 border border-blue-100 dark:border-blue-900/30">
                                <h4 className="font-bold text-[#1b399d] flex items-center gap-2 mb-3 text-sm uppercase tracking-wide">
                                    <span className="material-symbols-outlined text-lg">school</span>
                                    Công thức tính phủ bì
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                        <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-lg">width</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 mb-0.5">Chiều rộng phủ bì (Wpb)</p>
                                            <p className="text-sm font-bold text-slate-800 dark:text-white">
                                                Rộng thông thủy + <span className="text-blue-600">170mm</span>
                                            </p>
                                            <p className="text-[10px] text-slate-400 mt-0.5">(Cộng ray 2 bên)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                        <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-lg">height</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 mb-0.5">Chiều cao phủ bì (Hpb)</p>
                                            <p className="text-sm font-bold text-slate-800 dark:text-white">
                                                Cao thông thủy + <span className="text-blue-600">500mm</span>
                                            </p>
                                            <p className="text-[10px] text-slate-400 mt-0.5">(Cộng lô cuốn)</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-blue-200 dark:border-blue-800/30">
                                    <p className="text-xs text-blue-800 dark:text-blue-200 italic">
                                        *Hệ thống tính giá dựa trên kích thước phủ bì.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column - Price Summary */}
                <div className="lg:col-span-4 sticky top-24 z-30">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="bg-slate-900 text-white p-5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1b399d]/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <h3 className="text-lg font-bold flex items-center gap-2 relative z-10">
                                <span className="material-symbols-outlined text-amber-400">receipt_long</span>
                                Dự toán chi phí
                            </h3>
                            <p className="text-slate-400 text-xs mt-1 relative z-10">Cập nhật theo thời gian thực</p>
                        </div>

                        {/* Content */}
                        {calculation && (
                            <div className="p-5 space-y-5">
                                {/* Selected Product */}
                                <div className="flex gap-3 items-start pb-4 border-b border-dashed border-slate-200 dark:border-slate-700">
                                    <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700 relative">
                                        <Image
                                            src={calculation.model.image}
                                            alt={calculation.model.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-bold text-slate-800 dark:text-white text-sm">{calculation.model.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div
                                                className="w-3 h-3 rounded-full border border-slate-300"
                                                style={{ backgroundColor: selectedColorData?.hex }}
                                            ></div>
                                            <span className="text-xs text-slate-500">Màu {selectedColorData?.name}</span>
                                        </div>
                                        <span className="text-xs text-slate-500 block mt-0.5">{calculation.model.description}</span>
                                    </div>
                                </div>

                                {/* Calculation Details */}
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm items-center bg-slate-50 dark:bg-slate-800/50 p-2 rounded">
                                        <span className="text-slate-500 text-xs">
                                            Diện tích ({calculation.widthM}m x {calculation.heightM}m):
                                        </span>
                                        <span className="font-bold text-slate-800 dark:text-white">{calculation.area} m²</span>
                                    </div>
                                    <div className="flex justify-between text-sm items-center">
                                        <span className="text-slate-500">Đơn giá:</span>
                                        <span className="font-medium text-slate-700 dark:text-slate-300">
                                            {calculation.model.price.toLocaleString('vi-VN')} ₫/m²
                                        </span>
                                    </div>
                                    <div className="h-px bg-slate-100 dark:bg-slate-700 my-2"></div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Tạm tính:</span>
                                        <span className="text-2xl font-bold text-[#1b399d]">
                                            {calculation.total.toLocaleString('vi-VN')} ₫
                                        </span>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <Button className="w-full py-4 h-auto bg-[#1b399d] hover:bg-[#132a75] text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group transform active:scale-95">
                                    Tiếp tục: Chọn Động cơ
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </Button>

                                <div className="text-center">
                                    <p className="text-[10px] text-slate-400 mb-2">Giá chưa bao gồm VAT và chi phí lắp đặt</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Support CTA */}
                    <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <span className="material-symbols-outlined">support_agent</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">Cần tư vấn ngay?</p>
                            <a href="https://zalo.me/0919086272" className="text-xs text-[#1b399d] hover:underline">
                                Chat với nhân viên kỹ thuật
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
