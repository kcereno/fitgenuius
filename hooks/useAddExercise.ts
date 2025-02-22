import { addExercise } from '@/components/AddExerciseForm/addExercise';
import { useMutationRequest } from './useMutationRequest';
import { ApiResponse } from '@/types/api';
import { Exercise } from '@/types/exercise';

export const useAddExercise = () => {
  return useMutationRequest<ApiResponse, Exercise>({
    mutationFn: addExercise,
    invalidateKey: 'exercises',
  });
};
