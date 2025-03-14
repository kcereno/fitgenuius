'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Exercise } from '@/types/exercise';
import DialogForm from '../DialogForm/DialogForm';
import { Button } from '../ui/button';
import useAddExercise from '@/hooks/useAddExercise';
import {
  capitalizeWords,
  normalizeToUnderscore,
  sanitizeInput,
} from '@/utils/formatters';

const INITIAL_NEW_EXERCISE_VALUE = {
  id: '',
  name: '',
} as Exercise;

const AddExerciseForm = () => {
  const [open, setOpen] = useState(false);
  const [newExercise, setNewExercise] = useState<Exercise>(
    INITIAL_NEW_EXERCISE_VALUE
  );

  const { mutateAsync: addExercise, isPending } = useAddExercise();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const trimmedName = capitalizeWords(sanitizeInput(newExercise.name));
      const id = normalizeToUnderscore(trimmedName).toLocaleLowerCase();

      const sanitizedNewExercise = { id, name: trimmedName } as Exercise;

      await addExercise(sanitizedNewExercise);
      setNewExercise(INITIAL_NEW_EXERCISE_VALUE);
    } catch (error) {
      throw error;
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedNewExercise = {
      ...newExercise,
      [name]: value,
    };

    setNewExercise(updatedNewExercise);
  };

  const handleAddExerciseButtonClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        className="fixed bottom-20 left-1/2 -translate-x-1/2"
        onClick={handleAddExerciseButtonClick}
      >
        Add Exercise
      </Button>
      <DialogForm
        open={open}
        setOpen={setOpen}
        title="New Exercise Form"
        description="Add Exercise Details"
        onSubmit={handleSubmit}
        loading={isPending}
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
            value={newExercise.name}
            className="col-span-3"
          />
        </div>
      </DialogForm>
    </>
  );
};

export default AddExerciseForm;
