import { Exercise } from '@/types/exercise';

export const fetchExercises = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exercises`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch exercises');
  }
  const { success, exercises } = await res.json();

  if (!success || !exercises) {
    throw new Error('Invalid API response: Missing exercise data');
  }

  return exercises;
};

export const fetchExercise = async (exerciseId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exercises/${exerciseId}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch exercise');
  }

  const { success, exercise } = await res.json();

  if (!success || !exercise) {
    throw new Error('Invalid API response: Missing exercise data');
  }

  return exercise;
};

export const deleteExercise = async (exerciseId: string) => {
  console.log('edit Exercise Triggered');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exercises/${exerciseId}`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to delete exercise: ${res.statusText}`);
  }

  return await res.json();
};

export const editExercise = async (
  exerciseId: string,
  updatedExerciseData: Exercise
) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exercises/${exerciseId}`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedExerciseData),
  });

  console.log(await res);

  if (!res.ok) {
    throw new Error('Failed to update exercise');
  }

  return res.json();
};
