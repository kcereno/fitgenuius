import { ApiResponse } from '@/types/api';
import { Exercise } from '@/types/exercise';
import { updateExercise } from '@/lib/exercise-actions';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { slugify } from '@/utils/formatters';

interface EditExerciseVariables {
  slug: string;
  updatedExercise: Pick<Exercise, 'name' | 'movementType'>;
}

const useUpdateExercise = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, EditExerciseVariables>({
    mutationFn: ({ slug, updatedExercise }) =>
      updateExercise(slug, updatedExercise),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      router.push(slugify(variables.updatedExercise.name));
    },
  });
};

export default useUpdateExercise;
