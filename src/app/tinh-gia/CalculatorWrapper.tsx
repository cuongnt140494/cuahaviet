'use client';

import { useState } from 'react';
import { Product } from '@/lib/data';
import { WizardTabs } from '@/components/calculator/WizardTabs';
import { RollingDoorCalculator } from '@/components/calculator/RollingDoorCalculator';
import { AluminumDoorCalculator } from '@/components/calculator/AluminumDoorCalculator';
import { WoodDoorCalculator } from '@/components/calculator/WoodDoorCalculator';

export default function CalculatorWrapper({ products }: { products: Product[] }) {
    const [activeTab, setActiveTab] = useState<'rolling' | 'aluminum' | 'wood'>('rolling');

    // Filter products by category - Updated for Austdoor catalog
    const rollingDoors = products.filter(p =>
        p.categoryId === 'cat_khe_thoang' ||
        p.categoryId === 'cat_tam_lien' ||
        p.categoryId === 'cat_cong_nghiep'
    );

    // Motor and UPS accessories for rolling doors
    const accessories = products.filter(p =>
        p.categoryId === 'cat_motor' ||
        p.categoryId === 'cat_luu_dien' ||
        p.categoryId === 'cat_phu_kien_khac'
    );

    // Placeholder for future aluminum/wood calculators (currently not in Austdoor catalog)
    const aluminumDoors = products.filter(p => p.categoryId === 'cat_cua_nhom');
    const woodDoors = products.filter(p => p.categoryId === 'cat_cua_go');

    return (
        <div className="max-w-5xl mx-auto">
            <WizardTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="mt-8 transition-all duration-300">
                {activeTab === 'rolling' && (
                    <RollingDoorCalculator products={rollingDoors} accessories={accessories} />
                )}
                {activeTab === 'aluminum' && (
                    <AluminumDoorCalculator products={aluminumDoors} accessories={accessories} />
                )}
                {activeTab === 'wood' && (
                    <WoodDoorCalculator products={woodDoors} accessories={accessories} />
                )}
            </div>
        </div>
    );
}
