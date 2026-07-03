import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const fees = await prisma.feeInvoice.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(fees);
  } catch (error) {
    console.error("Failed to fetch fees:", error);
    return NextResponse.json({ error: 'Failed to fetch fees' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const fee = await prisma.feeInvoice.create({
      data: {
        studentName: data.studentName,
        grade: data.grade || 'N/A',
        description: data.description,
        amount: parseFloat(data.amount),
        status: 'Paid', // Assuming we are recording a payment
        date: new Date().toISOString()
      }
    });
    return NextResponse.json(fee);
  } catch (error) {
    console.error("Failed to record fee:", error);
    return NextResponse.json({ error: 'Failed to record fee payment' }, { status: 500 });
  }
}
