import { fetchWorkouts } from '@/lib/workout-actions';
import { Workout } from '@/types/workout';
import { useQuery } from '@tanstack/react-query';

interface useFetchWorkoutsProps {
  keys?: (keyof Workout)[];
}

const useFetchWorkouts = ({ keys }: useFetchWorkoutsProps = {}) => {
  const { data, error, isLoading } = useQuery<
    Workout[],
    Error,
    Partial<Workout>[]
  >({
    queryKey: ['workouts', keys],
    queryFn: fetchWorkouts,
    staleTime: Infinity,
    select: (data) =>
      keys && keys.length > 0
        ? (data.map((workout) =>
            Object.fromEntries(keys.map((key) => [key, workout[key]]))
          ) as Partial<Workout>[])
        : data,
  });

  return { data, error, isLoading };
};

export default useFetchWorkouts;
