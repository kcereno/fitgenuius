import { fetchExercises } from '@/app/lib/actions';

import { useQueryRequest } from './useQueryRequest';

const useFetchExercises = () => {
  const { data, isLoading, error } = useQueryRequest({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
  });
  return { data, isLoading, error };
};

export default useFetchExercises;
