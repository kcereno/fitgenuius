import { ApiResponse } from '@/types/api';
import { Exercise } from '@/types/exercise';

// Fetch
export const fetchExercises = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exercises`;
  const res = await fetch(url, { cache: 'no-store' });

  const response = (await res.json()) as ApiResponse<Exercise[]>;

  if (!res.ok || !response.success || !response.data) {
    return Promise.reject({
      status: response.success,
      message: response.message,
    });
  }

  return response.data;
};

export const fetchExercise = async (exerciseSlug: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exercises/${exerciseSlug}`;
  const res = await fetch(url);

  if (!res.ok) {
    const errorBody = await res.json();
    const errorMessage =
      errorBody?.message || `Error fetching exercise (status: ${res.status})`;
    throw new Error(errorMessage);
  }

  const { data: exercise } = (await res.json()) as ApiResponse;

  return exercise as Exercise;
};

// Add
export const addExercise = async (
  newExercise: Pick<Exercise, 'name' | 'movementType'>
): Promise<ApiResponse> => {
  const res = await fetch('/api/exercises', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newExercise),
  });

  const response = (await res.json()) as ApiResponse;

  if (!res.ok) {
    throw new Error(response.message);
  }

  return response;
};

// Delete
export const deleteExercise = async (exerciseSlug: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exercises/${exerciseSlug}`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const response = (await res.json()) as ApiResponse;

  if (!res.ok) {
    throw new Error(response.message);
  }

  return response;
};

// Edit
export const updateExercise = async (
  slug: string,
  updatedExercise: Pick<Exercise, 'name' | 'movementType'>
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exercises/${slug}`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedExercise),
  });

  const response = (await res.json()) as ApiResponse;

  if (!res.ok) {
    throw new Error(response.message);
  }

  return response;
};
