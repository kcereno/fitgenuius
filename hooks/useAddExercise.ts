import { addExercise } from '@/lib/exercise-actions';
import { Exercise } from '@/types/exercise';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useAddExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newExercise: Exercise) => await addExercise(newExercise),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });
};

export default useAddExercise;
