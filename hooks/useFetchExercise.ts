import { fetchExercise } from '@/app/lib/actions';
import { useQueryRequest } from './useQueryRequest';

const useFetchExercise = (exerciseId: string) => {
  const { data, isLoading, error } = useQueryRequest({
    queryKey: ['exercise', exerciseId],
    queryFn: () => fetchExercise(exerciseId as string),
    enabled: !!exerciseId,
  });
  return { data, isLoading, error };
};

export default useFetchExercise;
