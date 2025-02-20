import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'data', 'exercises.json');

export async function GET() {
  try {
    // Read the JSON file
    const fileData = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, 'utf-8')
      : '[]';

    const exercises = JSON.parse(fileData);

    return NextResponse.json({ success: true, exercises });
  } catch (error) {
    console.log(' GET ~ error:', error);
    return NextResponse.json(
      { success: false, message: 'Error reading file' },
      { status: 500 }
    );
  }
}

// Ensure the 'data' directory exists
if (!fs.existsSync(path.dirname(filePath))) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

export async function POST(req: Request) {
  try {
    const { exerciseName } = await req.json();

    // Read Existing Data
    let existingData = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      existingData = fileData ? JSON.parse(fileData) : [];
    }

    // Append new entry
    existingData.push({ exerciseName });

    // Write back to the file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return NextResponse.json({ success: true, message: 'Exercise saved!' });
  } catch (error) {
    console.log(' POST ~ error:', error);
    return NextResponse.json(
      { success: false, message: 'Error saving exercise.' },
      { status: 500 }
    );
  }
}
