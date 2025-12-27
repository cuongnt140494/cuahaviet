'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Trang chủ', href: '/', icon: 'home' },
    { name: 'Sản phẩm', href: '/san-pham', icon: 'door_sliding' },
    { name: 'Dự án', href: '/du-an', icon: 'work' },
    { name: 'Tin tức', href: '/tin-tuc', icon: 'article' },
    { name: 'Liên hệ', href: '/lien-he', icon: 'contact_support' },
];

const companyInfo = {
    phone: '0919086272',
    name: 'Cửa Hà Việt',
    slogan: 'Chất lượng tạo niềm tin',
    address: '46 Vũ Văn Cẩn, Hà Đông, Hà Nội',
};

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#1e2330]/95 backdrop-blur shadow-sm border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="container-custom">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 cursor-pointer group">
                        <div className="text-[#1b399d] size-10 bg-[#1b399d]/10 rounded-lg flex items-center justify-center group-hover:bg-[#1b399d]/20 transition-colors">
                            <span className="material-symbols-outlined text-[32px]">door_sliding</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-[#1b399d] dark:text-white text-xl font-bold leading-none tracking-tight">
                                {companyInfo.name}
                            </h1>
                            <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                                {companyInfo.slogan}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navigation.slice(0, 4).map((item, index) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "text-slate-700 dark:text-slate-200 text-sm font-medium hover:text-[#1b399d] transition-colors",
                                    index === 0 && "font-semibold"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2 w-64 border border-transparent focus-within:border-[#1b399d]/50 transition-colors">
                            <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400 ml-2"
                            />
                        </div>

                        {/* CTA Button */}
                        <Link href="/bao-gia">
                            <Button className="bg-[#1b399d] hover:bg-[#132a75] text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-glow transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">request_quote</span>
                                <span className="hidden sm:inline">Báo giá ngay</span>
                            </Button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon" className="text-slate-600 hover:text-[#1b399d]">
                                    <span className="material-symbols-outlined">menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[320px] p-0 bg-white dark:bg-[#1e2330]">
                                <SheetTitle className="sr-only">Menu điều hướng</SheetTitle>
                                <SheetDescription className="sr-only">Menu điều hướng cho thiết bị di động</SheetDescription>

                                {/* Mobile Menu Content */}
                                <div className="flex flex-col h-full">
                                    {/* Header */}
                                    <div className="p-6 bg-[#1b399d] text-white">
                                        <div className="flex items-center gap-3">
                                            <div className="size-12 bg-white/20 rounded-xl flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[28px]">door_sliding</span>
                                            </div>
                                            <div>
                                                <div className="font-bold text-lg">{companyInfo.name}</div>
                                                <div className="text-sm text-white/80">{companyInfo.slogan}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Navigation */}
                                    <div className="flex-1 py-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center gap-4 px-6 py-4 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-700"
                                            >
                                                <span className="material-symbols-outlined text-[#1b399d] text-[22px]">{item.icon}</span>
                                                <span className="font-medium">{item.name}</span>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Contact Info */}
                                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 space-y-4">
                                        <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Liên hệ ngay</p>

                                        <a
                                            href={`tel:${companyInfo.phone}`}
                                            className="flex items-center gap-3 p-3 bg-[#1b399d] text-white rounded-xl font-semibold hover:bg-[#132a75] transition-colors"
                                        >
                                            <span className="material-symbols-outlined">call</span>
                                            <span>{companyInfo.phone}</span>
                                        </a>

                                        <a
                                            href={`https://zalo.me/${companyInfo.phone}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-[#0068FF] text-white rounded-xl font-semibold hover:bg-[#0054CC] transition-colors"
                                        >
                                            <span className="text-lg font-bold">Z</span>
                                            <span>Chat Zalo</span>
                                        </a>

                                        <div className="flex items-start gap-3 pt-2 text-sm text-slate-500 dark:text-slate-400">
                                            <span className="material-symbols-outlined text-[18px] mt-0.5">location_on</span>
                                            <span>{companyInfo.address}</span>
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
}
