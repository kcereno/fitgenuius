import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';

import { prisma } from '@/lib/prisma';
import { Workout } from '@/types/workout';

export async function GET() {
  try {
    const workouts = (await prisma.workout.findMany()) as Workout[];

    return NextResponse.json<ApiResponse>(
      {
        status: 'success',
        data: workouts,
        message: 'Workouts fetched successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /api/workouts error:', error);

    return NextResponse.json<ApiResponse>(
      {
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred while fetching workouts.',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Extract new workout
    const newWorkout = await req.json();

    const workoutExists = await prisma.workout.findFirst({
      where: { id: newWorkout.id },
    });

    // Check if new workout exists in database. Return error if so
    if (workoutExists)
      return NextResponse.json<ApiResponse>(
        {
          status: 'fail',
          message: 'workout already exists in database',
        },
        {
          status: 409,
        }
      );

    // Add new workout to database. Return success response
    await prisma.workout.create({
      data: newWorkout,
    });

    return NextResponse.json<ApiResponse>(
      {
        status: 'success',
        message: 'workout added successfully!',
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(' POST ~ error:', error);
    return NextResponse.json<ApiResponse>({
      status: 'error',
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
}
