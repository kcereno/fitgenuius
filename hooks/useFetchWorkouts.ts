import { fetchWorkouts } from '@/lib/workout-actions';
import { Workout } from '@/types/workout';
import { useQuery } from '@tanstack/react-query';

const useFetchWorkouts = () => {
  const { data, isLoading, error } = useQuery<Workout[]>({
    queryKey: ['workouts'],
    queryFn: fetchWorkouts,
    retry: 2,
  });

  return { workouts: data, isLoading, error };
};

export default useFetchWorkouts;
