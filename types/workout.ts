import { Exercise } from '@prisma/client';

export interface Workout {
  id: string;
  name: string;
  exercises: Pick<Exercise, 'id' | 'name'>[];
}
