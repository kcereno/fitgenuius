import { ApiResponse } from '@/types/api';

import { Workout } from '@/types/workout';
import { UseFetchWorkoutOptions } from '@/hooks/workout/useFetchWorkout';

// Fetch
export const fetchWorkouts = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/workouts`;
  const res = await fetch(url, { cache: 'no-store' });

  const response = (await res.json()) as ApiResponse<Workout[]>;

  if (!res.ok || !response.success || !response.data) {
    return Promise.reject({
      status: response.success,
      message: response.message,
    });
  }

  return response.data;
};

export const fetchWorkout = async (
  workoutId: string,
  options?: UseFetchWorkoutOptions
) => {
  const include = options?.include?.length ? options.include : ['details'];
  const query = `?include=${include.join(',')}`;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/workouts/${workoutId}${query}`;
  const res = await fetch(url);

  if (!res.ok) {
    const errorBody = await res.json();
    const errorMessage =
      errorBody?.message || `Error fetching workouts (status: ${res.status})`;
    throw new Error(errorMessage);
  }

  const { data: workout } = (await res.json()) as ApiResponse;

  return workout as Workout;
};

// Add
export const addWorkout = async (
  newWorkout: Pick<Workout['details'], 'name'>
): Promise<ApiResponse> => {
  const res = await fetch('/api/workouts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newWorkout),
  });

  const response = (await res.json()) as ApiResponse;

  if (!res.ok) {
    throw new Error(response.message);
  }

  return response;
};

// Delete
export const deleteWorkout = async (workoutId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/workouts/${workoutId}`;

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
export const updateWorkout = async (
  workoutSlug: string,
  updatedWorkout: Pick<Workout['details'], 'name'>
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/workouts/${workoutSlug}`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedWorkout),
  });

  const response = (await res.json()) as ApiResponse;

  if (!res.ok) {
    throw new Error(response.message);
  }

  return response;
};

export const updateExercisesInWorkout = async (
  workoutSlug: string,
  exerciseIds: string[]
): Promise<ApiResponse> => {
  console.log(' exerciseIds:', exerciseIds);
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/workouts/${workoutSlug}/exercises`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exerciseIds),
  });

  const response = (await res.json()) as ApiResponse;

  if (!res.ok) {
    throw new Error(response.message);
  }

  return response;
};
