import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/utils/formatters';

export async function GET() {
  try {
    const workouts = await prisma.workout.findMany();

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: workouts,
        message: 'Workouts fetched successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /api/workouts error:', error);

    return NextResponse.json<ApiResponse>(
      {
        success: false,
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
    const newWorkout = await req.json();

    const workoutExists = await prisma.workout.findFirst({
      where: { name: newWorkout.name },
    });

    if (workoutExists)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: 'Workout already exists in database',
        },
        {
          status: 409,
        }
      );

    const newWorkoutWithSlugAndId = {
      ...newWorkout,
      id: crypto.randomUUID(),
      slug: slugify(newWorkout.name),
    };

    await prisma.workout.create({
      data: newWorkoutWithSlugAndId,
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: 'workout added successfully!',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(' POST ~ error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
}
