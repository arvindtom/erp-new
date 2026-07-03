import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const inventory = await prisma.assetItem.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(inventory);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const item = await prisma.assetItem.create({
      data: {
        name: data.name,
        category: data.category,
        quantity: parseInt(data.quantity),
        location: data.location,
        status: parseInt(data.quantity) > 5 ? 'In Stock' : 'Low Stock'
      }
    });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record asset' }, { status: 500 });
  }
}
