import { ApiResponse } from '@/types/api';
import { Exercise } from '@/types/exercise';
import { useMutationRequest } from './useMutationRequest';
import { editExercise } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';

interface EditExerciseVariables {
  exerciseId: string;
  updatedExercise: Exercise;
  redirectTo?: string; //
}

const useEditExercise = () => {
  const router = useRouter();

  const { mutate, loading, error } = useMutationRequest<
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

  return { mutate, loading, error };
};

export default useEditExercise;
