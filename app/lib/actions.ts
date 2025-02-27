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

export const fetchExercises = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exercises`;
  const res = await fetch(url);
  const response = (await res.json()) as ApiResponse<Exercise[]>; // Parse JSON request

  // If the request fails, reject with the API response
  if (!res.ok) {
    return Promise.reject(response); // ✅ Lets React Query handle errors
  }

  return response.data;
};

export const fetchExercise = async (exerciseId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exercises/${exerciseId}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch exercise');
  }

  const { data: exercise } = (await res.json()) as ApiResponse;

  return exercise as Exercise;
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

  if (!res.ok) {
    throw new Error('Failed to update exercise');
  }

  return res.json();
};
