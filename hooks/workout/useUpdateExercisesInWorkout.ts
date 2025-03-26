import { updateExercisesInWorkout } from '@/lib/workout-actions';
import { ApiResponse } from '@/types/api';

import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateExerciseInWorkoutVariables {
  workoutSlug: string;
  updatedExercises: string[];
}
const useUpdateExercisesInWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, Error, UpdateExerciseInWorkoutVariables>({
    mutationFn: ({ workoutSlug, updatedExercises }) =>
      updateExercisesInWorkout(workoutSlug, updatedExercises),
    onSuccess: (_, { workoutSlug }) => {
      queryClient.invalidateQueries({ queryKey: ['workout', workoutSlug] });
    },
  });
};

export default useUpdateExercisesInWorkout;
