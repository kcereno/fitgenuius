import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';
import { slugify } from '@/utils/formatters';
import { prisma } from '@/lib/prisma';

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
