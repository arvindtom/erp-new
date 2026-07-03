import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const payslips = await prisma.payslip.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(payslips);
  } catch (error) {
    console.error("Failed to fetch payslips:", error);
    return NextResponse.json({ error: 'Failed to fetch payslips' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const slip = await prisma.payslip.create({
      data: {
        employeeName: data.employeeName,
        role: data.role,
        amount: parseFloat(data.amount),
        date: new Date().toISOString(),
        status: 'Processed'
      }
    });
    return NextResponse.json(slip);
  } catch (error) {
    console.error("Failed to generate payslip:", error);
    return NextResponse.json({ error: 'Failed to generate payslip' }, { status: 500 });
  }
}
