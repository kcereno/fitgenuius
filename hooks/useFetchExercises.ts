import { fetchExercises } from '@/app/lib/actions';
import { useQuery } from '@tanstack/react-query';

const useFetchExercises = () => {
  const {
    data: exercises,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
  });
  return { exercises, isLoading, error };
};

export default useFetchExercises;
