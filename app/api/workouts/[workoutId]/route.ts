import { NextRequest, NextResponse } from 'next/server';
import { dashToUnderscore } from '@/utils/formatters';
import { Workout } from '@/types/workout';
import { ApiResponse } from '@/types/api';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ workoutId: string }> }
) {
  const { workoutId } = await params;
  console.log(' workoutId:', workoutId);
  const formattedWorkoutId = dashToUnderscore(workoutId);
  console.log(' formattedWorkoutId:', formattedWorkoutId);

  try {
    const workout = (await prisma.workout.findUnique({
      where: { id: formattedWorkoutId },
    })) as Workout;

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
  { params }: { params: Promise<{ workoutId: string }> }
) {
  const { workoutId } = await params;
  const formattedWorkoutId = dashToUnderscore(workoutId);
  console.log(' formattedWorkoutId:', formattedWorkoutId);

  try {
    const workout = await prisma.workout.findUnique({
      where: { id: formattedWorkoutId },
    });
    console.log(' workout:', workout);

    if (!workout) {
      return NextResponse.json(
        { status: 'error', message: 'Workout not found' },
        { status: 404 }
      );
    }

    await prisma.workout.delete({
      where: { id: formattedWorkoutId },
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ workoutId: string }> }
) {
  const { workoutId } = await params;
  const formattedWorkoutId = dashToUnderscore(workoutId);
  const updatedWorkout = (await req.json()) as Workout;
  console.log(' updatedWorkout:', updatedWorkout);

  try {
    const workoutExists = await prisma.workout.findFirst({
      where: { id: updatedWorkout.id },
    });

    if (!workoutExists) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: 'Workout not found' },
        { status: 404 }
      );
    }

    const newWorkout = await prisma.workout.update({
      where: { id: formattedWorkoutId },
      data: {
        name: updatedWorkout.name,
        exercises: {
          set: fullExercises.map((exercise) => ({ id: exercise.id })),
        },
      },
      include: {
        exercises: true, // ✅ Return fully populated exercises
      },
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Workout updated successfully',
      data: newWorkout,
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
