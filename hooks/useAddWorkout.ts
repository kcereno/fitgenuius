import { useMutationRequest } from './useMutationRequest';
import { Workout } from '@/types/workout';
import { addWorkout } from '@/lib/workout-actions';

const useAddWorkout = () => {
  const { mutateAsync, loading, error } = useMutationRequest({
    mutationFn: async (newWorkout: Workout) => {
      return await addWorkout(newWorkout);
    },
    invalidateKey: 'workouts',
  });

  return { mutateAsync, loading, error };
};

export default useAddWorkout;
