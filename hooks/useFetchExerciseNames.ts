import { fetchExercises } from '@/lib/exercise-actions';
import { IdNameType } from '@/types/data';
import { Exercise } from '@/types/exercise';
import { useQuery } from '@tanstack/react-query';

const useFetchExerciseNames = () => {
  const { data, isLoading, error } = useQuery<Exercise[], Error, IdNameType[]>({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
    retry: 2,
    staleTime: Infinity,
    select: (data) => data.map(({ id, name }) => ({ name, id })),
  });

  return { exerciseNames: data, isLoading, error };
};

export default useFetchExerciseNames;
