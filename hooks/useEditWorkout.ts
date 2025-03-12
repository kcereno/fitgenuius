import { Workout } from '@/types/workout';
import { useRouter } from 'next/navigation';
import { ApiResponse } from '@/types/api';
import { editWorkout } from '@/lib/workout-actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface EditWorkoutVariables {
  workoutId: string;
  updatedWorkout: Workout;
  redirectTo?: string; //
}

const useEditWorkout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, EditWorkoutVariables>({
    mutationFn: ({ workoutId, updatedWorkout }) =>
      editWorkout(workoutId, updatedWorkout),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });

      if (variables.redirectTo) {
        router.push(variables.redirectTo);
      }
    },
  });
};

export default useEditWorkout;
