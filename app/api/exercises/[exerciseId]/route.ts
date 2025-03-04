import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { dashToUnderscore } from '@/utils/formatters';
import { Exercise } from '@/types/exercise';
import { ApiResponse } from '@/types/api';
import { readJsonFile } from '@/lib/json';

const filePath = path.join(process.cwd(), 'data', 'exercises.json');

export async function GET(
  req: NextRequest,
  { params }: { params: { exerciseId: string } }
) {
  const { exerciseId } = await params;
  const formattedExerciseId = dashToUnderscore(exerciseId);

  try {
    const exercises = readJsonFile<Exercise[]>(filePath);

    const exercise = exercises.find(
      (exercise: Exercise) => exercise.id === formattedExerciseId
    );

    if (!exercise) {
      return NextResponse.json<ApiResponse>(
        {
          status: 'error',
          message: 'Exercise does not exist',
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json<ApiResponse<Exercise>>({
      status: 'success',
      message: 'Exercise fetched successfully',
      data: exercise,
    });
  } catch (error) {
    console.error('GET ~ error:', error);

    return NextResponse.json<ApiResponse>({
      status: 'error',
      message:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { exerciseId: string } }
) {
  const { exerciseId } = await params;
  const formattedExerciseId = dashToUnderscore(exerciseId);

  try {
    const exercises = readJsonFile<Exercise[]>(filePath);

    const updatedExercises = exercises.filter(
      (e) => e.id !== formattedExerciseId
    );

    // Write updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(updatedExercises, null, 2));

    return NextResponse.json<ApiResponse>({
      status: 'success',
      message: 'Exercise deleted',
    });
  } catch (error) {
    return NextResponse.json<ApiResponse>({
      status: 'error',
      message: error as string,
    });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { exerciseId: string } }
) {
  const { exerciseId } = await params;
  const formattedId = dashToUnderscore(exerciseId);

  try {
    const exercises = readJsonFile<Exercise[]>(filePath);

    // Find and update the exercise
    const exerciseIndex = exercises.findIndex((e) => e.id === formattedId);

    // Get updated data from request
    const updatedExercise = await req.json();
    console.log(' PUT ~ updatedExercise:', updatedExercise);

    // Update the exercise in the array
    exercises[exerciseIndex] = {
      ...exercises[exerciseIndex],
      ...updatedExercise,
    };

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(exercises, null, 2));

    return NextResponse.json<ApiResponse>({
      status: 'success',
      message: 'Exercise updated successfully',
    });
  } catch (error) {
    console.error('PUT ~ error:', error);
    return NextResponse.json<ApiResponse>(
      { status: 'fail', message: 'Failed to update exercise' },
      { status: 500 }
    );
  }
}
