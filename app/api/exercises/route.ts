import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';
import { Exercise } from '@/types/exercise';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const exercises = (await prisma.exercise.findMany()) as Exercise[];

    return NextResponse.json<ApiResponse<Exercise[]>>(
      {
        status: 'success',
        message: 'Fetched all exercises successfully',
        data: exercises,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /api/exercises error:', error);

    return NextResponse.json<ApiResponse>(
      {
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred while fetching exercises.',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const exercise = await req.json();

    await prisma.exercise.create({
      data: exercise,
    });

    return NextResponse.json<ApiResponse>({
      status: 'success',
      message: 'Exercised added successfully!',
    });
  } catch (error) {
    console.log(' POST ~ error:', error);
    return NextResponse.json<ApiResponse>({
      status: 'error',
      message:
        error instanceof Error ? error.message : 'An unexpected error occured',
    });
  }
}
