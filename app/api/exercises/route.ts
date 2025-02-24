import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'data', 'exercises.json');

export async function GET() {
  try {
    const fileData = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, 'utf-8')
      : '[]';

    const exercises = JSON.parse(fileData);

    return NextResponse.json({ success: true, exercises });
  } catch (error) {
    console.error('GET ~ error:', error);
    return NextResponse.json(
      { success: false, message: 'Error reading file' },
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

    return NextResponse.json({ success: true, message: 'Exercise saved!' });
  } catch (error) {
    console.log(' POST ~ error:', error);
    return NextResponse.json(
      { success: false, message: 'Error saving exercise.' },
      { status: 500 }
    );
  }
}
