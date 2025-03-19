import { NextRequest, NextResponse } from 'next/server';
import { dashToUnderscore } from '@/utils/formatters';
import { Exercise } from '@/types/exercise';
import { ApiResponse } from '@/types/api';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ exerciseSlug: string }> }
) {
  const { exerciseSlug } = await params;

  try {
    const exercise = await prisma.exercise.findUnique({
      where: { slug: exerciseSlug },
    });

    if (!exercise) {
      return NextResponse.json(
        { status: 'error', message: 'Exercise not found' },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<Exercise>>({
      success: true,
      message: 'Exercise fetched successfully',
      data: exercise,
    });
  } catch (error) {
    console.error('GET ~ error:', error);

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      },
      { status: 500 }
    );
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
      success: true,
      message: 'Exercise deleted',
    });
  } catch (error) {
    return NextResponse.json<ApiResponse>({
      success: false,
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
  const updatedExercise = (await req.json()) as Exercise;

  try {
    const exerciseExists = await prisma.exercise.findFirst({
      where: { id: updatedExercise.id },
    });

    if (exerciseExists) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: 'Exercise already exists in database' },
        { status: 400 }
      );
    }

    await prisma.exercise.update({
      where: { id: formattedExerciseId },
      data: updatedExercise,
    });

    return NextResponse.json<ApiResponse>({
      success: false,
      message: 'Exercise updated successfully',
    });
  } catch (error) {
    console.error('PUT ~ error:', error);
    return NextResponse.json<ApiResponse>(
      { success: false, message: 'Failed to update exercise' },
      { status: 500 }
    );
  }
}
