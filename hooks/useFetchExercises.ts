import { fetchExercises } from '@/app/lib/actions';

import { useQueryRequest } from './useQueryRequest';

const useFetchExercises = () =>
  useQueryRequest({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
  });
export default useFetchExercises;
