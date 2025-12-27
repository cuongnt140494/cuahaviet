'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NotFound() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/san-pham?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <main className="relative flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-12 min-h-[80vh]">
            {/* Background */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-blue-50/50 to-background/95 dark:from-[#121520]/95 dark:via-[#121520]/80 dark:to-[#121520]/95 z-10"></div>
                <div
                    className="w-full h-full bg-cover bg-center opacity-40 dark:opacity-20"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoBDGGfDDQBnWuUiS3jVqakq0kiM54QNxL-wAREkvi4FxnGTTsjCIC6zEON6UlxqXm5Wy4Nnruy3SIDGWxTE6gip-jc2HNwgnGl22UfuStvl9y3uAbWBdhCNYbg50XPRUkfiLvdSuLPl_cMadnkoOoXkE6r98AG_vaQifEZvWxNC3JAxh9N__ewgoUdGwSf2j8GAUcVI9pKZ6GRNVo44O4tk_F2hxTFfvnhPkJy9JOMyxdOriCTnAoqEkCm4QNVwZ6EcN62rqRWtVP')" }}
                />
            </div>

            {/* Content Card */}
            <div className="relative z-10 w-full max-w-6xl mx-auto glass-card rounded-[2.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-20 shadow-2xl">

                {/* 404 Number */}
                <div className="flex-1 w-full flex justify-center lg:justify-end relative order-1 lg:order-2">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] lg:w-[350px] lg:h-[350px] bg-[#1b399d]/20 rounded-full blur-[80px] animate-pulse"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <h1 className="text-[140px] sm:text-[180px] lg:text-[240px] font-black leading-none tracking-tighter text-gradient select-none relative z-10 drop-shadow-sm">
                            404
                        </h1>
                        <div className="absolute top-[65%] left-1/2 -translate-x-1/2 glass-element px-6 py-3 rounded-2xl rotate-[-6deg] shadow-lg border border-white/50 dark:border-white/10 flex items-center gap-3 whitespace-nowrap z-20 hover:rotate-0 transition-transform duration-500 ease-out">
                            <span className="material-symbols-outlined text-[#1b399d] dark:text-blue-300">sentiment_dissatisfied</span>
                            <span className="text-[#1b399d] dark:text-blue-300 font-bold text-base">Lỗi hiển thị</span>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 w-full flex flex-col text-center lg:text-left items-center lg:items-start space-y-8 order-2 lg:order-1">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            Trang không tồn tại
                        </div>
                        <h2 className="text-slate-900 dark:text-white text-3xl md:text-5xl font-bold leading-[1.15]">
                            Không tìm thấy trang <br />bạn yêu cầu.
                        </h2>
                        <p className="text-slate-500 dark:text-gray-400 text-base md:text-lg font-normal leading-relaxed max-w-lg">
                            Liên kết bạn truy cập có thể bị hỏng hoặc trang đã được chuyển đi. Hãy sử dụng thanh tìm kiếm bên dưới để tìm sản phẩm cửa phù hợp.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="w-full max-w-md relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-slate-500 group-focus-within:text-[#1b399d] transition-colors">search</span>
                        </div>
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-11 pr-32 py-6 bg-white dark:bg-black/30 border border-gray-200 dark:border-gray-700 rounded-2xl text-base text-slate-900 dark:text-white placeholder-slate-500 focus:ring-2 focus:ring-[#1b399d]/50 focus:border-[#1b399d] transition-all shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-black/40"
                            placeholder="Tìm cửa cuốn, cửa nhôm..."
                        />
                        <Button
                            type="submit"
                            className="absolute inset-y-1.5 right-1.5 px-5 bg-[#1b399d] hover:bg-[#132a75] text-white rounded-xl text-sm font-bold transition-all shadow-md"
                        >
                            Tìm kiếm
                        </Button>
                    </form>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                        <Link href="/" className="flex-1">
                            <Button className="w-full h-14 bg-[#1b399d] hover:bg-[#132a75] text-white text-base font-bold rounded-2xl transition-all shadow-lg shadow-[#1b399d]/25 hover:shadow-[#1b399d]/40 hover:-translate-y-0.5">
                                <span className="material-symbols-outlined text-[20px] mr-2">home</span>
                                Về Trang Chủ
                            </Button>
                        </Link>
                        <Link href="/lien-he" className="flex-1">
                            <Button
                                variant="outline"
                                className="w-full h-14 bg-transparent border-2 border-gray-200 dark:border-gray-700 hover:border-[#1b399d] text-slate-900 dark:text-white hover:text-[#1b399d] dark:hover:text-[#1b399d] font-bold rounded-2xl transition-all"
                            >
                                <span className="material-symbols-outlined text-[20px] mr-2 text-gray-500 group-hover:text-[#1b399d] transition-colors">support_agent</span>
                                Liên Hệ Hỗ Trợ
                            </Button>
                        </Link>
                    </div>

                    {/* Quick Links */}
                    <div className="pt-4 flex flex-wrap gap-x-6 gap-y-3 justify-center lg:justify-start">
                        <Link
                            href="/danh-muc/cua-cuon"
                            className="text-sm font-medium text-slate-500 hover:text-[#1b399d] dark:text-gray-400 dark:hover:text-white transition-colors flex items-center gap-1.5"
                        >
                            <span className="material-symbols-outlined text-[18px]">roller_shades</span> Cửa cuốn
                        </Link>
                        <span className="text-gray-300 dark:text-gray-700">|</span>
                        <Link
                            href="/danh-muc/cua-nhom"
                            className="text-sm font-medium text-slate-500 hover:text-[#1b399d] dark:text-gray-400 dark:hover:text-white transition-colors flex items-center gap-1.5"
                        >
                            <span className="material-symbols-outlined text-[18px]">door_sliding</span> Cửa nhôm
                        </Link>
                        <span className="text-gray-300 dark:text-gray-700">|</span>
                        <Link
                            href="/danh-muc/cua-go-composite"
                            className="text-sm font-medium text-slate-500 hover:text-[#1b399d] dark:text-gray-400 dark:hover:text-white transition-colors flex items-center gap-1.5"
                        >
                            <span className="material-symbols-outlined text-[18px]">nature_people</span> Cửa gỗ nhựa
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
