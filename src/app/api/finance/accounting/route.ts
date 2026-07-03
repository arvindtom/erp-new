import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const txns = await prisma.ledgerTransaction.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(txns);
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const txn = await prisma.ledgerTransaction.create({
      data: {
        type: data.type,
        category: data.category,
        amount: parseFloat(data.amount),
        account: data.account || 'Main Bank',
        date: data.date
      }
    });
    return NextResponse.json(txn);
  } catch (error) {
    console.error("Failed to record transaction:", error);
    return NextResponse.json({ error: 'Failed to record transaction' }, { status: 500 });
  }
}
