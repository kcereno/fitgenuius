import { ApiResponse } from '@/types/api';
import { Exercise } from '@/types/exercise';
import { editExercise } from '@/lib/exercise-actions';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface EditExerciseVariables {
  exerciseId: string;
  updatedExercise: Exercise;
  redirectTo?: string; //
}

const useEditExercise = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, EditExerciseVariables>({
    mutationFn: ({ exerciseId, updatedExercise }) =>
      editExercise(exerciseId, updatedExercise),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });

      if (variables.redirectTo) {
        router.push(variables.redirectTo);
      }
    },
  });
};

export default useEditExercise;
