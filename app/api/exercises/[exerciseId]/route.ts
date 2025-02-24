import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { dashToUnderscore } from '@/utils/formatters';
import { Exercise } from '@/types/exercise';

const filePath = path.join(process.cwd(), 'data', 'exercises.json');

export async function GET(
  __: NextRequest,
  { params }: { params: { exerciseId: string } }
) {
  const { exerciseId } = await params;
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
