import { fetchWorkout } from '@/lib/workout-actions';
import { useQuery } from '@tanstack/react-query';

const useFetchWorkout = (workoutId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['workout', workoutId],
    queryFn: () => fetchWorkout(workoutId as string),
    enabled: !!workoutId,
  });
  return { data, isLoading, error };
};

export default useFetchWorkout;
