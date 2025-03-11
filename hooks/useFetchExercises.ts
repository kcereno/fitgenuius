import { fetchExercises } from '@/lib/exercise-actions';
import { Exercise } from '@/types/exercise';
import { useQuery } from '@tanstack/react-query';

interface UseFetchExercisesProps {
  keys?: (keyof Exercise)[];
}

const useFetchExercises = ({ keys }: UseFetchExercisesProps = {}) => {
  const { data, error, isLoading } = useQuery<
    Exercise[],
    Error,
    Partial<Exercise>[]
  >({
    queryKey: ['exercises', keys],
    queryFn: fetchExercises,
    staleTime: Infinity,
    select: (data) =>
      keys && keys.length > 0
        ? (data.map((exercise) =>
            Object.fromEntries(keys.map((key) => [key, exercise[key]]))
          ) as Partial<Exercise>[])
        : data,
  });

  return { data, error, isLoading };
};

export default useFetchExercises;
