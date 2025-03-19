import { updateWorkout } from '@/lib/workout-actions';
import { ApiResponse } from '@/types/api';
import { Workout } from '@/types/workout';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface UpdateWorkoutVariables {
  workoutId: string;
  updatedWorkout: Workout;
  redirectTo?: string;
}

const useUpdateWorkout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, UpdateWorkoutVariables>({
    mutationFn: ({ workoutId, updatedWorkout }) =>
      updateWorkout(workoutId, updatedWorkout),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });

      if (variables.redirectTo) {
        router.push(variables.redirectTo);
      }
    },
  });
};
export default useUpdateWorkout;
