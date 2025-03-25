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
import { CheckIcon, DeleteIcon } from 'lucide-react';

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
    const alreadySelected = isSelected(selectedExercise.name);
    if (alreadySelected) return;

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
      <DrawerContent className="h-full flex flex-col">
        <DrawerHeader className="hidden">
          <DrawerTitle>Exercises</DrawerTitle>
          <DrawerDescription>Select exercises</DrawerDescription>
        </DrawerHeader>
        {isPending && <p>Fetching exercise</p>}

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-6">
            <h1 className="font-bold mb text-lg">Selected Exercises</h1>
            <ul>
              {selectedExercises.map((exercise) => (
                <li
                  key={exercise.id}
                  className="flex justify-between"
                >
                  <div>{exercise.name}</div>
                  <DeleteIcon
                    onClick={() =>
                      handleSelectedExerciseClick({
                        id: exercise.id,
                        name: exercise.name,
                      })
                    }
                  />
                </li>
              ))}
            </ul>
          </div>

          <hr className="mx-6" />

          <h1 className="font-bold mx-6 pt-2 text-lg">Exercises</h1>
          <div className="px-6 flex-1 overflow-y-auto">
            {exercises ? (
              <ul>
                {exercises.map((exercise) => (
                  <li
                    key={exercise.id}
                    className="flex justify-between"
                    onClick={() =>
                      handleExerciseClick({
                        id: exercise.id,
                        name: exercise.name,
                      })
                    }
                  >
                    <div>{exercise.name}</div>
                    {isSelected(exercise.name) && <CheckIcon />}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Unable to fetch exercises</p>
            )}
          </div>
        </div>

        <DrawerFooter className="shrink-0">
          <Button onClick={handleSubmit}>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ExerciseListDrawer;
