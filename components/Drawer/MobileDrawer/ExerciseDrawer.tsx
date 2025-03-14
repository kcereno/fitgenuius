import React, { useState } from 'react';

import MobileDrawer from './MobileDrawer';
import { Check } from 'lucide-react';
import useFetchExercises from '@/hooks/useFetchExercises';
import { Exercise } from '@/types/exercise';

interface MobileDrawerProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (exercises: Pick<Exercise, 'name'>[]) => void;
}

const ExerciseDrawer = ({
  open,
  onOpenChange,
  onSubmit,
}: MobileDrawerProps) => {
  const [selectedExercises, setSelectedExercises] = useState<
    Pick<Exercise, 'name'>[]
  >([]);

  const { data: exercises } = useFetchExercises();

  if (!exercises) return <p>No Exercises found</p>;

  const handleClick = (exerciseName: string) => {
    setSelectedExercises((prev) =>
      prev.some((ex) => ex.name === exerciseName)
        ? prev.filter((ex) => ex.name !== exerciseName)
        : [...prev, { name: exerciseName }]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedExercises);
  };

  return (
    <MobileDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Exercise List"
      onSubmit={handleSubmit}
    >
      <ul className="space-y-2">
        {exercises?.map((exercise) => (
          <li
            key={exercise.name}
            className="flex justify-between"
            onClick={() => exercise.name && handleClick(exercise.name)}
          >
            <button className="">{exercise.name}</button>
            {selectedExercises.some(
              (selectedExercise) => selectedExercise.name === exercise.name
            ) ? (
              <Check />
            ) : null}
          </li>
        ))}
      </ul>
    </MobileDrawer>
  );
};

export default ExerciseDrawer;
