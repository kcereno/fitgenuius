'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Exercise } from '@/types/exercise';

import {
  capitalizeWords,
  normalizeToUnderscore,
  sanitizeInput,
} from '@/utils/formatters';
import DialogForm from '../DialogForm/DialogForm';
import { Button } from '../ui/button';

import useAddExercise from '@/hooks/useAddExercise';

const INITIAL_NEW_EXERCISE_VALUE = {
  id: '',
  name: '',
} as Exercise;

const AddExerciseForm = () => {
  const [newExercise, setNewExercise] = useState<Exercise>(
    INITIAL_NEW_EXERCISE_VALUE
  );

  const { addExercise, loading, error } = useAddExercise();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedInput = capitalizeWords(sanitizeInput(newExercise.name));
    const id = normalizeToUnderscore(trimmedInput).toLocaleLowerCase();

    const sanitizedNewExercise = { ...newExercise, id, name: trimmedInput };

    addExercise(sanitizedNewExercise);
    setNewExercise(INITIAL_NEW_EXERCISE_VALUE);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedNewExercise = {
      ...newExercise,
      [name]: value,
    };

    setNewExercise(updatedNewExercise);
  };

  const formTrigger = (
    <Button className="fixed bottom-20 left-1/2 -translate-x-1/2">
      Add Exercise
    </Button>
  );

  return (
    <DialogForm
      trigger={formTrigger}
      title="New Exercise Form"
      description="Add Exercise Details"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
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
  );
};

export default AddExerciseForm;
