import { fetchExercises } from '@/lib/exercise-actions';

import { useQuery } from '@tanstack/react-query';

const useFetchExercises = () => {
  return useQuery({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
    staleTime: Infinity,
  });
};

export default useFetchExercises;
