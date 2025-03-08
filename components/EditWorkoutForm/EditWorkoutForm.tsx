'use client';

import React, { useState } from 'react';
import DialogForm from '../DialogForm/DialogForm';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Exercise } from '@/types/exercise';
import useEditExercise from '@/hooks/useEditExercise';
import {
  capitalizeWords,
  normalizeToUnderscore,
  sanitizeInput,
  underscoreToDash,
} from '@/utils/formatters';
import { Workout } from '@/types/workout';
import useEditWorkout from '@/hooks/useEditWorkout';

interface EditWorkoutFormProps {
  initialWorkout: Workout;
}

const EditWorkoutForm = ({ initialWorkout }: EditWorkoutFormProps) => {
  const [open, setOpen] = useState(false);
  const [updatedWorkout, setUpdatedWorkout] = useState<Workout>(initialWorkout);

  const { mutateAsync: editWorkout, loading } = useEditWorkout();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const updatedId = normalizeToUnderscore(
      updatedWorkout.name
    ).toLocaleLowerCase();
    const transformedName = capitalizeWords(sanitizeInput(updatedWorkout.name));

    const newSlug = underscoreToDash(updatedId);

    try {
      await editWorkout({
        workoutId: initialWorkout.id,
        updatedWorkout: {
          ...updatedWorkout,
          id: updatedId,
          name: transformedName,
        },
        redirectTo: `/workouts/${newSlug}`,
      });
    } catch (error) {
      throw error;
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdatedWorkout({ ...updatedWorkout, [name]: value });
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Edit
      </Button>

      <DialogForm
        title="Edit Workout"
        description="Edit Workout Details"
        loading={loading}
        open={open}
        setOpen={setOpen}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="name"
            className="text-right"
          >
            Workout
          </Label>
          <Input
            id="name"
            name="name"
            onChange={handleTextChange}
            value={updatedWorkout.name}
            className="col-span-3"
          />
        </div>
      </DialogForm>
    </>
  );
};

export default EditWorkoutForm;
