import { DrawerProps } from '@/types/component';
import React, { useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '../ui/button';
import useFetchExercises from '@/hooks/exercises/useFetchExercises';
import { Exercise } from '@/types/exercise';

interface ExerciseDrawerProps extends DrawerProps {
  onSubmit: () => void;
  initialExercises: Pick<Exercise, 'id' | 'name'>[];
  // isPending: boolean;
}

const ExerciseListDrawer = ({
  open,
  onOpenChange,
  onSubmit,
  initialExercises,
}: // isPending,
ExerciseDrawerProps) => {
  const [selectedExercises, setSelectedExercises] =
    useState<Pick<Exercise, 'id' | 'name'>[]>(initialExercises);

  const { data: exercises, isPending } = useFetchExercises();

  const isSelected = (exerciseName: string) =>
    selectedExercises.some(
      (selectedExercise) => selectedExercise.name === exerciseName
    );

  const handleSubmit = () => {};
  const handleExerciseClick = (
    selectedExercise: Pick<Exercise, 'id' | 'name'>
  ) => {
    const updatedSelectedExercises: Pick<Exercise, 'id' | 'name'>[] = [
      ...selectedExercises,
      selectedExercise,
    ];
    setSelectedExercises(updatedSelectedExercises);
  };

  const handleSelectedExerciseClick = (
    selectedExercise: Pick<Exercise, 'id' | 'name'>
  ) => {
    const updatedSelectedExercises = selectedExercises.filter(
      (exercise) => selectedExercise.name !== exercise.name
    );
    setSelectedExercises(updatedSelectedExercises);
  };

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      autoFocus={open}
    >
      <DrawerContent className="h-full">
        <DrawerHeader>
          <DrawerTitle>Exercises</DrawerTitle>
          <DrawerDescription>Select exercises</DrawerDescription>
        </DrawerHeader>
        {isPending ?? <p>Fetching exercise</p>}
        <div className="p-4">
          <h1 className="font-bold">Selected Exercises</h1>
          <ul>
            {selectedExercises.map((exercise) => (
              <li
                key={exercise.id}
                onClick={() => {
                  handleSelectedExerciseClick({
                    id: exercise.id,
                    name: exercise.name,
                  });
                }}
              >
                {exercise.name}
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div className="gap-4 px-4">
          {exercises ? (
            <ul>
              {exercises.map((exercise) => (
                <li
                  key={exercise.id}
                  className={isSelected(exercise.name) ? 'bg-red-500' : ''}
                  onClick={() => {
                    handleExerciseClick({
                      id: exercise.id,
                      name: exercise.name,
                    });
                  }}
                >
                  {exercise.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>Unable to fetch exercises</p>
          )}
        </div>
        <DrawerFooter>
          <Button onClick={handleSubmit}>
            {/* {isPending ? 'Submitting...' : 'Submit'} */}
            Submit
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ExerciseListDrawer;
