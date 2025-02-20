import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'data', 'exercises.json');

// Ensure the 'data' directory exists
if (!fs.existsSync(path.dirname(filePath))) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

export async function POST(req: Request) {
  try {
    const { exerciseName } = await req.json();

    console.log(' POST ~ exeriseName:', exerciseName);
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
    return NextResponse.json(
      { success: false, message: 'Error saving exercise.' },
      { status: 500 }
    );
  }
}
