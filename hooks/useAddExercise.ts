import { addExercise } from '@/app/lib/actions';

import { useMutationRequest } from './useMutationRequest';
import { Exercise } from '@/types/exercise';

const useAddExercise = () => {
  const { mutateAsync, loading, error } = useMutationRequest({
    mutationFn: async (newExercise: Exercise) => {
      return await addExercise(newExercise);
    },
    invalidateKey: 'exercises',
  });

  return { mutateAsync, loading, error };
};

export default useAddExercise;
