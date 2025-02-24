import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { dashToUnderscore } from '@/utils/formatters';
import { Exercise } from '@/types/exercise';

const filePath = path.join(process.cwd(), 'data', 'exercises.json');

export async function GET(
  req: NextRequest,
  { params }: { params: { exerciseId: string } }
) {
  const { exerciseId } = params;
  const formattedExerciseId = dashToUnderscore(exerciseId);

  try {
    const fileData = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, 'utf-8')
      : '[]';

    const exercises = JSON.parse(fileData);

    const exercise = exercises.find(
      (exercise: Exercise) => exercise.id === formattedExerciseId
    );

    return NextResponse.json({ success: true, exercise });
  } catch (error) {
    console.error('GET ~ error:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to find exercise' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { exerciseId: string } }
) {
  const { exerciseId } = params;
  const formattedExerciseId = dashToUnderscore(exerciseId);

  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, message: 'Exercise data file not found' },
        { status: 500 }
      );
    }

    const fileData = fs.readFileSync(filePath, 'utf-8');
    const exercises: Exercise[] = JSON.parse(fileData);

    // Find and remove the exercise
    const updatedExercises = exercises.filter(
      (e) => e.id !== formattedExerciseId
    );

    if (updatedExercises.length === exercises.length) {
      return NextResponse.json(
        { success: false, message: 'Exercise not found' },
        { status: 404 }
      );
    }

    // Write updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(updatedExercises, null, 2));

    return NextResponse.json({ success: true, message: 'Exercise deleted' });
  } catch (error) {
    console.error('DELETE ~ error:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to delete exercise' },
      { status: 500 }
    );
  }
}
