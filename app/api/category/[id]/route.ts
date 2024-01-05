import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    const id = params.id
    if (!id) {
        return NextResponse.error();
    }

    const post = await prisma.category.findUnique({
        where: {
            id: id,
        },
    });

    return NextResponse.json(post);
}
export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
    const id = Number(params.id)
    console.log('PUT request received for category ID:', id);

    if (!id) {
        console.log('Returning error due to missing id');
        return NextResponse.error();
    }

    const category = await prisma.category.findUnique({
        where: {
            id: id,
        },
    })

    const { name } = await request.json();
    const updatedCategory = await prisma.category.update({
        where: {
            id: id,
        },
        data: {
            name: name,

        },
    });

    return NextResponse.json({ "success": 1, "category": updatedCategory, "message": "Update success" });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    const id = Number(params.id)
    if (!id) {
        return NextResponse.error();
    }

    const deletePost = await prisma.category.delete({
        where: {
            id: id,
        },
    })

    return NextResponse.json({ success: 1, "message": "Delete success" });
}