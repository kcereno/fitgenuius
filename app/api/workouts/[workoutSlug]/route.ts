import { NextRequest, NextResponse } from 'next/server';

import { Workout } from '@/types/workout';
import { ApiResponse } from '@/types/api';

import { PrismaClient } from '@prisma/client';
import { slugify } from '@/utils/formatters';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ workoutSlug: string }> }
) {
  const { workoutSlug } = await params;

  try {
    const workout = await prisma.workout.findUnique({
      where: { slug: workoutSlug },
    });

    if (!workout) {
      return NextResponse.json(
        { status: 'error', message: 'Workout not found' },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<Workout>>({
      success: true,
      message: 'Workout fetched successfully',
      data: workout,
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
  { params }: { params: Promise<{ workoutSlug: string }> }
) {
  const { workoutSlug } = await params;

  try {
    const workout = await prisma.workout.findUnique({
      where: { slug: workoutSlug },
    });

    if (!workout) {
      return NextResponse.json(
        { status: 'error', message: 'Workout not found' },
        { status: 404 }
      );
    }

    await prisma.workout.delete({
      where: { slug: workoutSlug },
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Workout deleted',
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
    const updatedWorkout = await req.json();

    const existingWorkout = await prisma.workout.findUnique({
      where: { id: updatedWorkout.id },
    });

    if (!existingWorkout) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'Workout cannot be found in database',
      });
    }

    if (existingWorkout.name === updatedWorkout.name) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'Existing workout with that name',
      });
    }

    const updatedWorkoutWithNewSlug = {
      ...updatedWorkout,
      slug: slugify(updatedWorkout.name),
    };
    console.log(' PUT ~ updatedWorkoutWithNewSlug:', updatedWorkoutWithNewSlug);

    await prisma.workout.update({
      where: { id: updatedWorkout.id },
      data: updatedWorkoutWithNewSlug,
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Workout updated successfully',
    });
  } catch (error) {
    console.error('PUT ~ error:', error);
    return NextResponse.json<ApiResponse>(
      { success: false, message: 'Failed to update workout' },
      { status: 500 }
    );
  }
}
