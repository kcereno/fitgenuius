import { NextRequest, NextResponse } from 'next/server';
import { dashToUnderscore } from '@/utils/formatters';
import { Exercise } from '@/types/exercise';
import { ApiResponse } from '@/types/api';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ exerciseId: string }> }
) {
  const { exerciseId } = await params;
  const formattedExerciseId = dashToUnderscore(exerciseId);

  try {
    const exercise = await prisma.exercise.findUnique({
      where: { id: formattedExerciseId },
    });

    if (!exercise) {
      return NextResponse.json(
        { status: 'error', message: 'Exercise not found' },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<Exercise>>({
      status: 'success',
      message: 'Exercise fetched successfully',
      data: exercise,
    });
  } catch (error) {
    console.error('GET ~ error:', error);

    return NextResponse.json<ApiResponse>({
      status: 'error',
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ exerciseId: string }> }
) {
  const { exerciseId } = await params;
  const formattedExerciseId = dashToUnderscore(exerciseId);

  try {
    const exercise = await prisma.exercise.findUnique({
      where: { id: formattedExerciseId },
    });

    if (!exercise) {
      return NextResponse.json(
        { status: 'error', message: 'Exercise not found' },
        { status: 404 }
      );
    }

    await prisma.exercise.delete({
      where: { id: formattedExerciseId },
    });

    return NextResponse.json<ApiResponse>({
      status: 'success',
      message: 'Exercise deleted',
    });
  } catch (error) {
    return NextResponse.json<ApiResponse>({
      status: 'error',
      message: error as string,
    });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ exerciseId: string }> }
) {
  const { exerciseId } = await params;
  const formattedExerciseId = dashToUnderscore(exerciseId);
  const updatedExercise = await req.json();

  try {
    const exercise = await prisma.exercise.findUnique({
      where: { id: formattedExerciseId },
    });

    if (!exercise) {
      return NextResponse.json(
        { status: 'error', message: 'Exercise not found' },
        { status: 404 }
      );
    }

    await prisma.exercise.update({
      where: { id: formattedExerciseId },
      data: updatedExercise,
    });

    return NextResponse.json<ApiResponse>({
      status: 'success',
      message: 'Exercise updated successfully',
    });
  } catch (error) {
    console.error('PUT ~ error:', error);
    return NextResponse.json<ApiResponse>(
      { status: 'fail', message: 'Failed to update exercise' },
      { status: 500 }
    );
  }
}
