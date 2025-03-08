import { deleteWorkout } from '@/lib/workout-actions';
import { useMutationRequest } from './useMutationRequest';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useDeleteWorkout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, loading, error } = useMutationRequest({
    mutationFn: async (workoutId: string) => {
      await deleteWorkout(workoutId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      router.push('/workouts');
    },
  });

  return { mutate, loading, error };
};

export default useDeleteWorkout;
