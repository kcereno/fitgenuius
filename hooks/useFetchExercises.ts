import { fetchExercises } from '@/app/lib/actions';
import { Exercise } from '@/types/exercise';
import { useQuery } from '@tanstack/react-query';

const useFetchExercises = () => {
  const { data, isLoading, error } = useQuery<Exercise[]>({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
    retry: 2,
  });

  return { exercises: data, isLoading, error };
};

export default useFetchExercises;
