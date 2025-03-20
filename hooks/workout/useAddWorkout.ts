import { Workout } from '@/types/workout';
import { addWorkout } from '@/lib/workout-actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useAddWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newWorkout: Pick<Workout, 'name'>) =>
      await addWorkout(newWorkout),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    },
  });
};

export default useAddWorkout;
