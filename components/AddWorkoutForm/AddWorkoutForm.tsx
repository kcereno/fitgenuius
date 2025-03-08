import { Workout } from '@/types/workout';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import useAddWorkout from '../../hooks/useAddWorkout';
import {
  capitalizeWords,
  normalizeToUnderscore,
  sanitizeInput,
} from '@/utils/formatters';
import { Button } from '../ui/button';
import DialogForm from '../DialogForm/DialogForm';

const INITIAL_NEW_WORKOUT_VALUE = {
  id: '',
  name: '',
} as Workout;

const AddWorkoutForm = () => {
  const [open, setOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState<Workout>(
    INITIAL_NEW_WORKOUT_VALUE
  );

  const { mutateAsync: addWorkout, loading } = useAddWorkout();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const trimmedName = capitalizeWords(sanitizeInput(newWorkout.name));
      const id = normalizeToUnderscore(trimmedName).toLocaleLowerCase();

      const sanitizedNewExercise = { id, name: trimmedName };

      await addWorkout(sanitizedNewExercise);
      setNewWorkout(INITIAL_NEW_WORKOUT_VALUE);
    } catch (error) {
      throw error;
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedNewWorkout = {
      ...newWorkout,
      [name]: value,
    };

    setNewWorkout(updatedNewWorkout);
  };

  const handleAddWorkoutButtonClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        className="fixed bottom-20 left-1/2 -translate-x-1/2"
        onClick={handleAddWorkoutButtonClick}
      >
        Add Workout
      </Button>
      <DialogForm
        open={open}
        setOpen={setOpen}
        title="New Workout Form"
        description="Add Workout Details"
        onSubmit={handleSubmit}
        loading={loading}
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="name"
            className="text-right"
          >
            Exercise
          </Label>
          <Input
            id="name"
            name="name"
            onChange={handleTextChange}
            value={newWorkout.name}
            className="col-span-3"
          />
        </div>
      </DialogForm>
    </>
  );
};

export default AddWorkoutForm;
