import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteExercise } from '@/lib/exercise-actions';

const useDeleteExercise = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (exerciseSlug: string) =>
      await deleteExercise(exerciseSlug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      router.push('/exercises');
    },
  });
};

export default useDeleteExercise;
