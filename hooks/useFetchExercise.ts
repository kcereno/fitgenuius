import { fetchExercise } from '@/app/lib/actions';
import { useQuery } from '@tanstack/react-query';

const useFetchExercise = (exerciseId: string) => {
  const {
    data: exercise,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['exercise', exerciseId],
    queryFn: () => fetchExercise(exerciseId as string),
    enabled: !!exerciseId,
  });
  return { exercise, isLoading, error };
};

export default useFetchExercise;
