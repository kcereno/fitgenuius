import { Exercise } from '@prisma/client';

export interface Workout {
  details: {
    id: string;
    name: string;
    slug: string;
  };
  exercises: Pick<Exercise, 'id' | 'name'>[];
}

// export interface WorkoutWithExercises extends Workout {
//   exercises: Pick<Exercise, 'id' | 'name'>[];
// }
