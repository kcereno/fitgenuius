import { Exercise } from '@/types/exercise';

export const saveExercise = async (exercise: Exercise) => {
  const response = await fetch('/api/exercises', {
    method: 'POST',
    body: JSON.stringify(exercise),
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await response.json();
  console.log(' saveExercise ~ result:', result);

  return result;
};
