import { Exercise } from '@prisma/client';

export interface Workout {
  id: string;
  name: string;
  slug: string;
}

export interface WorkoutWithExercises extends Workout {
  exercises: Pick<Exercise, 'id' | 'name'>[];
}
