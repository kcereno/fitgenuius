import { ApiResponse } from '@/types/api';
import { WorkoutWithExercises } from '@/types/workout';
import { useQuery } from '@tanstack/react-query';

const fetchExercisesInWorkout = async (
  workoutSlug: string
): Promise<WorkoutWithExercises> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/workouts/${workoutSlug}/exercises`;
  const res = await fetch(url);

  if (!res.ok) {
    const errorBody = await res.json();
    const errorMessage =
      errorBody?.message || `Error fetching exercise (status: ${res.status})`;
    throw new Error(errorMessage);
  }

  const { data: exercise } = (await res.json()) as ApiResponse;

  return exercise as WorkoutWithExercises;
};

const useFetchExercisesInWorkout = (workoutSlug: string) => {
  return useQuery({
    queryKey: ['exercisesInWorkout', workoutSlug],
    queryFn: () => fetchExercisesInWorkout(workoutSlug),
    enabled: !!workoutSlug,
  });
};

export default useFetchExercisesInWorkout;
