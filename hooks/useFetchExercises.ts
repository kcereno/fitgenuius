import { fetchExercises } from '@/lib/exercise-actions';
import { Exercise } from '@/types/exercise';
import { useQuery } from '@tanstack/react-query';

type ExerciseDataKeys = keyof Exercise;

interface useFetchExercisesProps {
  keys?: ExerciseDataKeys[];
}

const useFetchExercises = ({ keys }: useFetchExercisesProps) => {
  const { data, error, isLoading } = useQuery<
    Exercise[],
    Error,
    Partial<Exercise>[]
  >({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
    staleTime: Infinity,
    select: (data) =>
      data.map((exercise) =>
        keys
          ? Object.fromEntries(keys.map((key) => [key, exercise[key]]))
          : exercise
      ) as Partial<Exercise>[],
  });

  return { data, error, isLoading };
};

export default useFetchExercises;
