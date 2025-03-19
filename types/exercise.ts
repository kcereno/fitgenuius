// export type MovementType =
//   | 'squat'
//   | 'hinge'
//   | 'push'
//   | 'pull'
//   | 'core'
//   | 'carry';

import { MovementType } from '@prisma/client';

export interface Exercise {
  id: string;
  name: string;
  slug: string;
  movementType: MovementType;
  history: ExerciseHistoryEntry[];
}

export interface ExerciseHistoryEntry {
  date: string;
  workoutId: string;
  sets: { reps: number; weight: number }[];
}
