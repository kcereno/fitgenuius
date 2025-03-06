import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  const prisma = new PrismaClient();

  try {
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('Database connected successfully!');

    const exercises = await prisma.exercise.findMany();
    return NextResponse.json({ status: 'success', data: exercises });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
