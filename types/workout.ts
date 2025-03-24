import { Exercise } from '@prisma/client';

export interface Workout {
  id: string;
  name: string;
  slug: string;
  exercises: Pick<Exercise, 'id' | 'name'>[];
}

// export interface WorkoutWithExercises extends Workout {
//   exercises: Pick<Exercise, 'id' | 'name'>[];
// }
