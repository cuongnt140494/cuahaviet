'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface WizardTabsProps {
    activeTab: 'rolling' | 'aluminum' | 'wood';
    onTabChange: (tab: 'rolling' | 'aluminum' | 'wood') => void;
}

export function WizardTabs({ activeTab, onTabChange }: WizardTabsProps) {
    const tabs = [
        { id: 'rolling', label: 'Cửa Cuốn', icon: 'garage' },
        { id: 'aluminum', label: 'Cửa Nhôm', icon: 'door_sliding' },
        { id: 'wood', label: 'Cửa Gỗ', icon: 'door_front' },
    ] as const;

    return (
        <div className="flex justify-center mb-8">
            <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all",
                            activeTab === tab.id
                                ? "bg-white dark:bg-slate-700 text-[#1b399d] shadow-sm"
                                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        )}
                    >
                        <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
