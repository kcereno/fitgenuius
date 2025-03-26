import { ApiResponse } from '@/types/api';
import { Workout } from '@/types/workout';
import { useQuery } from '@tanstack/react-query';

// Allowed parts of a workout to fetch
export type WorkoutInclude = 'details' | 'exercises' | 'history';

export type UseFetchWorkoutOptions = {
  include?: WorkoutInclude[];
};

// --- Fetcher ---
export const fetchWorkout = async (
  workoutId: string,
  options?: UseFetchWorkoutOptions
): Promise<Workout> => {
  const include: WorkoutInclude[] = options?.include?.length
    ? ([...options.include].sort() as WorkoutInclude[])
    : ['details'];
  const query = `?include=${include.join(',')}`;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/workouts/${workoutId}${query}`;
  const res = await fetch(url);

  if (!res.ok) {
    const errorBody = await res.json();
    const errorMessage =
      errorBody?.message || `Error fetching workout (status: ${res.status})`;
    throw new Error(errorMessage);
  }

  const { data: workout } = (await res.json()) as ApiResponse;

  return workout as Workout;
};

// --- Hook ---
const useFetchWorkout = (
  workoutId: string,
  options?: UseFetchWorkoutOptions
) => {
  const include: WorkoutInclude[] = options?.include?.length
    ? ([...options.include].sort() as WorkoutInclude[])
    : ['details'];

  return useQuery({
    queryKey: ['workout', workoutId, ...include],
    queryFn: () => fetchWorkout(workoutId, { include }),
    enabled: !!workoutId,
  });
};

export default useFetchWorkout;
