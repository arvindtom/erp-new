import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const definitions = await prisma.workflowDefinition.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(definitions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch definitions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, module } = await request.json();
    const definition = await prisma.workflowDefinition.create({
      data: { name, module, isActive: true }
    });
    return NextResponse.json(definition);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create definition' }, { status: 500 });
  }
}
