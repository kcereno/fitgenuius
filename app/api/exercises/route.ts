import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';
import { prisma } from '@/lib/prisma';
import { MovementType } from '@prisma/client';

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
    console.log('Received:', newExercise); // ✅ Debug request payload

    // ✅ Validate required fields
    if (!newExercise.name || !newExercise.movementType) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: name, movementType',
        },
        { status: 400 }
      );
    }

    // ✅ Convert movementType to uppercase
    const formattedMovementType =
      newExercise.movementType.toUpperCase() as MovementType;

    // ✅ Ensure movementType is valid
    if (!Object.values(MovementType).includes(formattedMovementType)) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid movementType. Allowed: ${Object.values(
            MovementType
          ).join(', ')}`,
        },
        { status: 400 }
      );
    }

    // ✅ Ensure `id` is generated if missing
    const id = newExercise.id || crypto.randomUUID();

    // ✅ Check if exercise already exists by name
    const exerciseExists = await prisma.exercise.findUnique({
      where: { name: newExercise.name },
    });

    if (exerciseExists) {
      return NextResponse.json(
        { success: false, message: 'Exercise already exists in database' },
        { status: 409 }
      );
    }

    // ✅ Create exercise in the database
    const createdExercise = await prisma.exercise.create({
      data: {
        id,
        name: newExercise.name,
        movementType: formattedMovementType, // ✅ Ensured to be a valid enum
      },
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
