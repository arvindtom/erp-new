import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const applications = await prisma.admissionApplication.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(applications);
  } catch (error) {
    console.error("Failed to fetch admissions:", error);
    return NextResponse.json({ error: 'Failed to fetch admissions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const app = await prisma.admissionApplication.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        dob: data.dob,
        grade: data.grade,
        guardian: data.guardian,
        phone: data.phone,
        status: 'Pending'
      }
    });
    return NextResponse.json(app);
  } catch (error) {
    console.error("Failed to create admission:", error);
    return NextResponse.json({ error: 'Failed to create admission' }, { status: 500 });
  }
}
