import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const routes = await prisma.transportRoute.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(routes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch routes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const route = await prisma.transportRoute.create({
      data: {
        name: data.name,
        vehicle: data.vehicle,
        driver: data.driver,
        stops: parseInt(data.stops),
        status: 'Active'
      }
    });
    return NextResponse.json(route);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record route' }, { status: 500 });
  }
}
