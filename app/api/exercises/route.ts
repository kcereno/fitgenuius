import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/utils/formatters';
import { Exercise } from '@/types/exercise';

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

    if (!newExercise.name || !newExercise.movementType) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    const exerciseExists = await prisma.exercise.findUnique({
      where: { name: newExercise.name },
    });

    if (exerciseExists) {
      return NextResponse.json(
        { success: false, message: 'Exercise already exists in database' },
        { status: 409 }
      );
    }

    const formattedNewExercise: Omit<Exercise, 'history'> = {
      ...newExercise,
      id: crypto.randomUUID(),
      slug: slugify(newExercise.name),
    };

    const createdExercise = await prisma.exercise.create({
      data: formattedNewExercise,
    });

    return NextResponse.json(
      {
        success: true,
        data: createdExercise,
        message: 'Exercise added successfully!',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/exercises error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
