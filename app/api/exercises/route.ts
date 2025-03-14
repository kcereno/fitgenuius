import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';
import { Exercise } from '@/types/exercise';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const exercises = (await prisma.exercise.findMany()) as Exercise[];

    return NextResponse.json<ApiResponse>(
      {
        status: 'success',
        data: exercises,
        message: 'Exercises fetched successfully',
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
    // Extract new exercise
    const newExercise = await req.json();

    const exerciseExists = await prisma.exercise.findFirst({
      where: { id: newExercise.id },
    });

    // Check if new exercise exists in database. Return error if so
    if (exerciseExists)
      return NextResponse.json<ApiResponse>(
        {
          status: 'fail',
          message: 'Exercise already exists in database',
        },
        {
          status: 409,
        }
      );

    // Add new exercise to database. Return success response
    await prisma.exercise.create({
      data: newExercise,
    });

    return NextResponse.json<ApiResponse>(
      {
        status: 'success',
        message: 'Exercised added successfully!',
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
