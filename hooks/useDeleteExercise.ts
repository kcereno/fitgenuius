import { useMutationRequest } from './useMutationRequest';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteExercise } from '@/app/lib/actions';

const useDeleteExercise = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, loading, error } = useMutationRequest({
    mutationFn: async (exerciseId: string) => {
      await deleteExercise(exerciseId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      router.push('/exercises');
    },
  });

  return { mutate, loading, error };
};

export default useDeleteExercise;
