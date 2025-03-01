import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';
import { Exercise } from '@/types/exercise';
import { readJsonFile } from '@/lib/json';

const filePath = path.join(process.cwd(), 'data', 'exercises.json');

export async function GET() {
  try {
    const exercises = readJsonFile<Exercise[]>(filePath);

    return NextResponse.json<ApiResponse<Exercise[]>>(
      {
        status: 'success',
        message: 'Fetched all exercises successfully',
        data: exercises,
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
    const exercise = await req.json();

    // Read Existing Data
    let existingData = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      existingData = fileData ? JSON.parse(fileData) : [];
    }

    // Append new entry
    existingData.push(exercise);

    // Write back to the file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return NextResponse.json<ApiResponse>({
      status: 'success',
      message: 'Exercise saved!',
    });
  } catch (error) {
    console.log(' POST ~ error:', error);
    return NextResponse.json<ApiResponse>({
      status: 'error',
      message: error as string,
    });
  }
}
