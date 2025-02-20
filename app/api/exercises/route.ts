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
    return NextResponse.json(
      { success: false, message: 'Error reading file' },
      { status: 500 }
    );
  }
}
