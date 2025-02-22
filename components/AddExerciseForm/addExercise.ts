import { ApiResponse } from '@/types/api';
import { Exercise } from '@/types/exercise';

export const addExercise = async (
  newExercise: Exercise
): Promise<ApiResponse> => {
  const res = await fetch('/api/exercises', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newExercise),
  });
  if (!res.ok) {
    throw new Error('Failed to add exercise');
  }

  return (await res.json()) as ApiResponse;
};
