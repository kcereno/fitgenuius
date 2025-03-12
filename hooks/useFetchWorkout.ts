import { fetchWorkout } from '@/lib/workout-actions';
import { useQuery } from '@tanstack/react-query';

const useFetchWorkout = (workoutId: string) => {
  return useQuery({
    queryKey: ['workout', workoutId],
    queryFn: () => fetchWorkout(workoutId as string),
    enabled: !!workoutId,
  });
};

export default useFetchWorkout;
