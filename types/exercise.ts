export type MovementType = 'squat' | 'hinge' | 'push' | 'pull';

export interface Exercise {
  id: string;
  name: string;
  movementType: MovementType;
  history: ExerciseHistoryEntry[];
}

export interface ExerciseHistoryEntry {
  date: string;
  workoutId: string;
  sets: { reps: number; weight: number }[];
}
