import { NextRequest, NextResponse } from 'next/server';
import { slugify } from '@/utils/formatters';
import { Exercise } from '@/types/exercise';
import { ApiResponse } from '@/types/api';
import { prisma } from '@/lib/prisma';

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

    await prisma.exercise.delete({
      where: { slug: exerciseSlug },
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

export async function PUT(req: NextRequest) {
  try {
    const updatedExercise = await req.json();

    const existingExercise = await prisma.exercise.findUnique({
      where: { id: updatedExercise.id },
    });

    if (!existingExercise) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'Exercise cannot be found in database',
      });
    }

    if (existingExercise.name === updatedExercise.name) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: 'Exercise already exists in database' },
        { status: 400 }
      );
    }

    const updatedExerciseWithNewSlug = {
      ...updatedExercise,
      slug: slugify(updatedExercise.name),
    };

    await prisma.exercise.update({
      where: { id: updatedExercise.id },
      data: updatedExerciseWithNewSlug,
    });

    return NextResponse.json<ApiResponse>({
      success: true,
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
