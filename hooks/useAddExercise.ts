import { addExercise } from '@/app/lib/actions';

import { useMutationRequest } from './useMutationRequest';
import { Exercise } from '@/types/exercise';

const useAddExercise = () => {
  const { mutate, loading, error } = useMutationRequest({
    mutationFn: async (newExercise: Exercise) => {
      await addExercise(newExercise);
    },
    invalidateKey: 'exercises',
  });
  return { mutate, loading, error };
};

export default useAddExercise;
