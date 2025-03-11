import { fetchExercise } from '@/lib/exercise-actions';
import { useQuery } from '@tanstack/react-query';

const useFetchExercise = (exerciseId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['exercise', exerciseId],
    queryFn: () => fetchExercise(exerciseId as string),
    enabled: !!exerciseId,
  });
  return { data, isLoading, error };
};

export default useFetchExercise;
