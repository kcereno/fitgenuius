import { addExercise } from '@/lib/exercise-actions';
import { Exercise } from '@/types/exercise';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useAddExercise = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (newExercise: Pick<Exercise, 'name' | 'movementType'>) =>
      await addExercise(newExercise),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      router.push('/exercises');
    },
  });
};

export default useAddExercise;
