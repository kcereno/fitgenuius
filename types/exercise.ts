import { MovementType } from '@prisma/client';

export interface Exercise {
  id: string;
  name: string;
  slug: string;
  movementType: MovementType;
}

export interface ExerciseWithHistory extends Exercise {
  history: ExerciseHistoryEntry[];
}
export interface ExerciseHistoryEntry {
  date: string;
  workoutId: string;
  sets: { reps: number; weight: number }[];
}
