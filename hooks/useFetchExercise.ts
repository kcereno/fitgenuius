import { fetchExercise } from '@/lib/exercise-actions';
import { useQuery } from '@tanstack/react-query';

const useFetchExercise = (exerciseId: string) => {
  return useQuery({
    queryKey: ['exercise', exerciseId],
    queryFn: () => fetchExercise(exerciseId as string),
    enabled: !!exerciseId,
  });
};

export default useFetchExercise;
