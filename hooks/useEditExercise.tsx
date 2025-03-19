import { ApiResponse } from '@/types/api';
import { Exercise } from '@/types/exercise';
import { editExercise } from '@/lib/exercise-actions';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { slugify } from '@/utils/formatters';

interface EditExerciseVariables {
  slug: string;
  updatedExercise: Pick<Exercise, 'name' | 'movementType'>;
}

const useEditExercise = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, EditExerciseVariables>({
    mutationFn: ({ slug, updatedExercise }) =>
      editExercise(slug, updatedExercise),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      router.push(slugify(variables.updatedExercise.name));
    },
  });
};

export default useEditExercise;
