import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
    const categories = await prisma.category.findMany({
        orderBy: {
            id: 'asc', 
        },
    });

    return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { name } = body;

    const category = await prisma.category.create({
        data: {
            name: name,
        },
    });
    return NextResponse.json({ "success": 1, "message": "create success", "category": category });
}