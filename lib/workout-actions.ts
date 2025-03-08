import { ApiResponse } from '@/types/api';
import { Exercise } from '@/types/exercise';
import { Workout } from '@/types/workout';

// Fetch
export const fetchWorkouts = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/workouts`;
  const res = await fetch(url, { cache: 'no-store' });

  const response = (await res.json()) as ApiResponse<Workout[]>;

  if (!res.ok || response.status !== 'success' || !response.data) {
    return Promise.reject({
      status: response.status,
      message: response.message,
    });
  }

  return response.data;
};

export const fetchWorkout = async (workoutId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/workouts/${workoutId}`;
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
  newExercise: Exercise
): Promise<ApiResponse> => {
  const res = await fetch('/api/workouts', {
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
export const deleteExercise = async (exerciseId: string) => {
  console.log('edit Exercise Triggered');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exercises/${exerciseId}`;

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
export const editExercise = async (
  exerciseId: string,
  updatedExerciseData: Exercise
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exercises/${exerciseId}`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedExerciseData),
  });

  const response = (await res.json()) as ApiResponse;

  if (!res.ok) {
    throw new Error(response.message);
  }

  return response;
};
