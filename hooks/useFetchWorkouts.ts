import { fetchWorkouts } from '@/lib/workout-actions';
import { Workout } from '@/types/workout';
import { useQuery } from '@tanstack/react-query';

const useFetchWorkouts = () => {
  const { data, error, isLoading } = useQuery<
    Workout[],
    Error,
    Partial<Workout>[]
  >({
    queryKey: ['workouts'],
    queryFn: fetchWorkouts,
    staleTime: Infinity,
  });

  return { data, error, isLoading };
};

export default useFetchWorkouts;
