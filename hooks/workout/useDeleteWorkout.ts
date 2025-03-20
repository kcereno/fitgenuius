import { deleteWorkout } from '@/lib/workout-actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useDeleteWorkout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (workoutId: string) => await deleteWorkout(workoutId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
      router.push('/workouts');
    },
  });
};

export default useDeleteWorkout;
