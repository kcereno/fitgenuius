import { fetchExercises } from '@/lib/exercise-actions';
import { Exercise } from '@/types/exercise';
import { useQuery } from '@tanstack/react-query';

const useFetchExercises = () => {
  const { data, isLoading, error } = useQuery<Exercise[]>({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
    retry: 2,
    staleTime: Infinity,
  });

  return { exercises: data, isLoading, error };
};

export default useFetchExercises;
