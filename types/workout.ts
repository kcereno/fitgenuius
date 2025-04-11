import { Exercise } from './exercise';

export interface Workout {
  details: {
    id: string;
    name: string;
    slug: string;
  };
  exercises: Pick<Exercise, 'id' | 'name' | 'slug'>[];
}

// export interface WorkoutWithExercises extends Workout {
//   exercises: Pick<Exercise, 'id' | 'name'>[];
// }
