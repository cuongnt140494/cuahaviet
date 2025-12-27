import { NextResponse } from 'next/server';
import { createInquiry, Inquiry } from '@/lib/data';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, address, productId, productName, message, area, width, height, source } = body;

        // Basic validation
        if (!name || !phone) {
            return NextResponse.json(
                { error: 'Name and phone are required' },
                { status: 400 }
            );
        }

        const newInquiry: Omit<Inquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'> = {
            name,
            phone,
            address: address || null,
            email: null, // Optional for quick inquiry
            productId: productId || null,
            productName: productName || null,
            message: message || 'Yêu cầu từ tính năng Báo giá tự động',
            area: area?.toString() || null,
            width: width || null,
            height: height || null,
            source: source || 'AUTO_QUOTE',
            notes: null,
            utmSource: null,
            utmMedium: null,
            utmCampaign: null,
            landingPage: null
        };

        const created = await createInquiry(newInquiry);

        return NextResponse.json({ success: true, data: created });
    } catch (error) {
        console.error('Error creating inquiry:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
