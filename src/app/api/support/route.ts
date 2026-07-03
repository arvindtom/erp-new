import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const tickets = await prisma.supportTicket.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const ticket = await prisma.supportTicket.create({
      data: {
        subject: data.subject,
        user: data.user,
        priority: data.priority,
        status: 'Open'
      }
    });
    return NextResponse.json(ticket);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record ticket' }, { status: 500 });
  }
}
