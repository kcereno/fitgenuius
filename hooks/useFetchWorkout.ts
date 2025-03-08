import { useQueryRequest } from './useQueryRequest';
import { fetchWorkout } from '@/lib/workout-actions';

const useFetchWorkout = (workoutId: string) => {
  const { data, isLoading, error } = useQueryRequest({
    queryKey: ['workout', workoutId],
    queryFn: () => fetchWorkout(workoutId as string),
    enabled: !!workoutId,
  });
  return { data, isLoading, error };
};

export default useFetchWorkout;
