import { fetchExercise } from '@/lib/exercise-actions';
import { useQuery } from '@tanstack/react-query';

const useFetchExercise = (exerciseSlug: string) => {
  return useQuery({
    queryKey: ['exercise', exerciseSlug],
    queryFn: () => fetchExercise(exerciseSlug as string),
    enabled: !!exerciseSlug,
  });
};

export default useFetchExercise;
