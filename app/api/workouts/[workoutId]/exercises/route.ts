import { prisma } from '@/lib/prisma';
import { ApiResponse } from '@/types/api';
import { Exercise } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ workoutId: string }> }
) {
  try {
    const { workoutId } = await params;

    if (!workoutId) {
      return NextResponse.json(
        { success: false, message: 'workoutId is required' },
        { status: 400 }
      );
    }

    // Fetch workout with exercises
    const workout = await prisma.workout.findUnique({
      where: { id: workoutId },
      include: {
        exercises: {
          select: {
            exercise: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!workout) {
      return NextResponse.json(
        { success: false, message: 'Workout not found' },
        { status: 404 }
      );
    }

    // Extract exercises from nested structure
    const formattedWorkout = {
      id: workout.id,
      name: workout.name,
      exercises: workout.exercises.map((ex) => ex.exercise), // Extract exercise objects
    };

    if (!workout) {
      return NextResponse.json(
        { success: false, message: 'Workout not found' },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: formattedWorkout,
        message: 'Workout exercises fetched successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /api/workouts/{workoutId}/exercises error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ workoutId: string }> }
) {
  try {
    const { workoutId } = await params;
    const { exercises } = await req.json();

    console.log(exercises);
    const workoutExists = await prisma.workout.findUnique({
      where: { id: workoutId },
    });

    if (!workoutExists) {
      return NextResponse.json<ApiResponse>({
        success: false,
        message: 'Workout cannot be found',
      });
    }

    // Validate that all provided exercises exist in the database
    const exerciseIds = exercises.map(
      (ex: Pick<Exercise, 'id' | 'name'>) => ex.id
    );
    const validExercises = await prisma.exercise.findMany({
      where: { id: { in: exerciseIds } },
    });
    console.log(' validExercises:', validExercises);

    if (validExercises.length !== exerciseIds.length) {
      return NextResponse.json(
        { success: false, message: 'Some exercise IDs are invalid' },
        { status: 400 }
      );
    }

    // Remove existing exercises from the workout
    await prisma.workoutOnExercise.deleteMany({
      where: { workoutId },
    });

    // Add new exercises to the workout
    const newEntries = validExercises.map((exercise) => ({
      workoutId,
      exerciseId: exercise.id,
    }));

    await prisma.workoutOnExercise.createMany({
      data: newEntries,
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Exercises updated',
    });
  } catch (error) {
    console.error('PUT /api/workouts/{workoutId}/exercises error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
