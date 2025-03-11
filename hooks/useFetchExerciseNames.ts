import { fetchExercises } from '@/lib/exercise-actions';
import { Exercise } from '@/types/exercise';
import { useQuery } from '@tanstack/react-query';

const useFetchExerciseNames = () => {
  const { data, error, isLoading } = useQuery<Exercise[], Error>({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
    staleTime: Infinity,
    select: (data) => data.map(({ id, name }) => ({ name, id })),
  });

  return { data, error, isLoading };
};

export default useFetchExerciseNames;
