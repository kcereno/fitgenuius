import { fetchExercises } from '@/lib/exercise-actions';
import { Exercise } from '@/types/exercise';
import { useQuery } from '@tanstack/react-query';

interface UseFetchExercisesProps {
  keys?: (keyof Exercise)[];
}

const useFetchExercises = ({ keys }: UseFetchExercisesProps = {}) => {
  return useQuery<Exercise[], Error, Partial<Exercise>[]>({
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
};

export default useFetchExercises;
