export type DoorType = 'rolling' | 'aluminum' | 'wood';

export interface RollingDoorConfig {
    width: number; // mm
    height: number; // mm
    area: number; // m2
    id: string; // product id (nan cửa)
    motorId?: string;
    upsId?: string; // Lưu điện
}

export interface AluminumDoorConfig {
    width: number;
    height: number;
    wings: 1 | 2 | 4;
    type: 'opening' | 'sliding' | 'folding'; // Quay, Lùa, Xếp trượt
    glassType: '6.38' | '8.38' | 'temper_8' | 'temper_10' | 'box_19'; // Kính an toàn, cường lực, hộp
    id: string; // product id (nhôm)
}

export interface WoodDoorConfig {
    width: number;
    height: number;
    wallThickness: 100 | 200 | number; // mm
    id: string;
    lockId?: string;
}

export interface QuoteResult {
    totalArea: number;
    basePrice: number; // Tiền cửa
    accessoryPrice: number; // Tiền phụ kiện
    motorPrice?: number;
    laborCost: number; // Nhân công
    total: number;
    items: {
        name: string;
        quantity: number;
        unit: string;
        unitPrice: number;
        total: number;
    }[];
}

// Cấu hình giá nhân công mặc định (có thể override từ DB)
export const LABOR_COST = {
    rolling: 80000, // VNĐ/m2
    aluminum: 120000, // VNĐ/m2
    wood: 300000, // VNĐ/bộ
};
