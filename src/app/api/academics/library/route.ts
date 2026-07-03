import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const books = await prisma.libraryBook.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const book = await prisma.libraryBook.create({
      data: {
        title: data.title,
        author: data.author,
        category: data.category,
        status: 'Available'
      }
    });
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record book' }, { status: 500 });
  }
}
