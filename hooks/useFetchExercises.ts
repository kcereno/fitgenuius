import { fetchExercises } from '@/app/lib/actions';
import { useQuery } from '@tanstack/react-query';

const useFetchExercises = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
  });
  return { data, isLoading, error };
};

export default useFetchExercises;
