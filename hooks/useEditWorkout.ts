import { Workout } from '@/types/workout';
import { useRouter } from 'next/navigation';
import { useMutationRequest } from './useMutationRequest';
import { ApiResponse } from '@/types/api';
import { editWorkout } from '@/lib/workout-actions';

interface EditWorkoutVariables {
  workoutId: string;
  updatedWorkout: Workout;
  redirectTo?: string; //
}

const useEditWorkout = () => {
  const router = useRouter();

  const { mutateAsync, loading, error } = useMutationRequest<
    ApiResponse,
    EditWorkoutVariables
  >({
    mutationFn: ({ workoutId, updatedWorkout }) =>
      editWorkout(workoutId, updatedWorkout),
    invalidateKey: 'workouts',
    onSuccess: (_, variables: EditWorkoutVariables) => {
      if (variables.redirectTo) {
        router.push(variables.redirectTo);
      }
    },
  });

  return { mutateAsync, loading, error };
};

export default useEditWorkout;
