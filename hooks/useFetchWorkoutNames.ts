import { fetchWorkouts } from '@/lib/workout-actions';

import { Workout } from '@/types/workout';
import { useQuery } from '@tanstack/react-query';

const useFetchWorkoutNames = () => {
  const { data, error, isLoading } = useQuery<Workout[], Error>({
    queryKey: ['workouts'],
    queryFn: fetchWorkouts,
    staleTime: Infinity,
    select: (data) => data.map(({ id, name }) => ({ name, id })),
  });

  return { data, error, isLoading };
};

export default useFetchWorkoutNames;
