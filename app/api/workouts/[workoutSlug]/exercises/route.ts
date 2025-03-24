import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ workoutSlug: string }> }
) => {
  try {
    const { workoutSlug } = await params;

    const workout = await prisma.workout.findUnique({
      where: { slug: workoutSlug },
      include: {
        exercises: {
          include: {
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

    const formatted = {
      id: workout.id,
      name: workout.name,
      slug: workout.slug,
      exercises: workout.exercises.map((entry) => entry.exercise),
    };

    return NextResponse.json({ success: true, data: formatted });
  } catch (error) {
    console.error('GET /workouts/[slug]/exercises error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch workout exercises' },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ workoutSlug: string }> }
) => {
  try {
    const { workoutSlug } = await params;
    const { exerciseIds } = await req.json();

    if (!Array.isArray(exerciseIds)) {
      return NextResponse.json(
        { success: false, message: 'exerciseIds must be an array' },
        { status: 400 }
      );
    }

    // Validate all exerciseIds exist
    const validExercises = await prisma.exercise.findMany({
      where: { id: { in: exerciseIds } },
    });

    if (validExercises.length !== exerciseIds.length) {
      return NextResponse.json(
        { success: false, message: 'One or more exercise IDs are invalid' },
        { status: 400 }
      );
    }

    const workout = await prisma.workout.findUnique({
      where: { slug: workoutSlug },
    });

    if (!workout) {
      return NextResponse.json(
        { success: false, message: 'Workout not found' },
        { status: 404 }
      );
    }

    await prisma.workoutOnExercise.deleteMany({
      where: { workoutId: workout.id },
    });

    const connections = exerciseIds.map((id) => ({
      workoutId: workout.id,
      exerciseId: id,
    }));

    await prisma.workoutOnExercise.createMany({
      data: connections,
      skipDuplicates: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Exercises added to workout successfully.',
    });
  } catch (error) {
    console.error('PUT /workouts/[slug]/exercises error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update exercises' },
      { status: 500 }
    );
  }
};
