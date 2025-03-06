import { ApiResponse } from '@/types/api';
import { Exercise } from '@/types/exercise';
import { useMutationRequest } from './useMutationRequest';
import { editExercise } from '@/lib/exercise-actions';
import { useRouter } from 'next/navigation';

interface EditExerciseVariables {
  exerciseId: string;
  updatedExercise: Exercise;
  redirectTo?: string; //
}

const useEditExercise = () => {
  const router = useRouter();

  const { mutateAsync, loading, error } = useMutationRequest<
    ApiResponse,
    EditExerciseVariables
  >({
    mutationFn: ({ exerciseId, updatedExercise }) =>
      editExercise(exerciseId, updatedExercise),
    invalidateKey: 'exercises',
    onSuccess: (_, variables: EditExerciseVariables) => {
      if (variables.redirectTo) {
        router.push(variables.redirectTo);
      }
    },
  });

  return { mutateAsync, loading, error };
};

export default useEditExercise;
