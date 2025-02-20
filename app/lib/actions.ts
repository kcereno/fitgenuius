import path from 'path';
import { promises as fs } from 'fs';

const filePath = path.join(process.cwd(), 'data', 'exercises.json');

export const fetchExercises = async () => {
  // Delay for 2 seconds to test Suspense
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log(' fetchExercises ~ error:', error);
    return [];
  }
};
