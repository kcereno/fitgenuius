import { fetchWorkouts } from '@/lib/workout-actions';
import { IdNameType } from '@/types/data';
import { Workout } from '@/types/workout';
import { useQuery } from '@tanstack/react-query';

const useFetchWorkoutNames = () => {
  const { data, isLoading, error } = useQuery<Workout[], Error, IdNameType[]>({
    queryKey: ['workouts'],
    queryFn: fetchWorkouts,
    retry: 2,
    staleTime: Infinity,
    select: (data) => data.map(({ id, name }) => ({ name, id })),
  });

  return { workoutNames: data, isLoading, error };
};

export default useFetchWorkoutNames;
