import { Workout } from '@/types/workout';
import { useRouter } from 'next/navigation';
import { ApiResponse } from '@/types/api';
import { editWorkout } from '@/lib/workout-actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { slugify } from '@/utils/formatters';

interface EditWorkoutVariables {
  workoutSlug: string;
  updatedWorkout: Pick<Workout, 'name'>;
}

const useEditWorkout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, EditWorkoutVariables>({
    mutationFn: ({ workoutSlug, updatedWorkout }) =>
      editWorkout(workoutSlug, updatedWorkout),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] });

      router.push(slugify(variables.updatedWorkout.name));
    },
  });
};

export default useEditWorkout;
