import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const exercises = await prisma.exercise.findMany({
      select: {
        id: true,
        name: true,
        movementType: true,
      },
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: exercises,
        message: 'Exercises fetched successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /api/exercises error:', error);

    return NextResponse.json<ApiResponse>(
      {
        success: false,
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
    const newExercise = await req.json();
    console.log(' POST ~ newExercise:', newExercise);

    const exerciseExists = await prisma.exercise.findFirst({
      where: { id: newExercise.id },
    });

    if (exerciseExists)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: 'Exercise already exists in database',
        },
        {
          status: 409,
        }
      );

    await prisma.exercise.create({
      data: newExercise,
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: 'Exercised added successfully!',
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(' POST ~ error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
}
