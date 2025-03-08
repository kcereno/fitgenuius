import { NextRequest, NextResponse } from 'next/server';
import { dashToUnderscore } from '@/utils/formatters';
import { Exercise } from '@/types/exercise';
import { ApiResponse } from '@/types/api';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ workoutId: string }> }
) {
  const { workoutId } = await params;
  const formattedWorkoutId = dashToUnderscore(workoutId);

  try {
    const exercise = await prisma.workout.findUnique({
      where: { id: formattedWorkoutId },
    });

    if (!exercise) {
      return NextResponse.json(
        { status: 'error', message: 'Workout not found' },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<Exercise>>({
      status: 'success',
      message: 'Workout fetched successfully',
      data: exercise,
    });
  } catch (error) {
    console.error('GET ~ error:', error);

    return NextResponse.json<ApiResponse>(
      {
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
