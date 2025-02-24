'use client';

import React, { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Exercise } from '@/types/exercise';
import { useMutationRequest } from '@/hooks/useMutationRequest';
import { ApiResponse } from '@/types/api';
import { addExercise } from './addExercise';
import {
  capitalizeWords,
  normalizeToUnderscore,
  sanitizeInput,
} from '@/utils/formatters';
import DialogForm from '../DialogForm/DialogForm';

const INITIAL_NEW_EXERCISE_VALUE = {
  id: '',
  name: '',
} as Exercise;

const AddExerciseForm = () => {
  const [newExercise, setNewExercise] = useState<Exercise>(
    INITIAL_NEW_EXERCISE_VALUE
  );

  const { mutate, loading, error } = useMutationRequest<ApiResponse, Exercise>({
    mutationFn: addExercise,
    invalidateKey: 'exercises',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedInput = capitalizeWords(sanitizeInput(newExercise.name));
    const id = normalizeToUnderscore(trimmedInput).toLocaleLowerCase();

    const sanitizedNewExercise = { ...newExercise, id, name: trimmedInput };

    mutate(sanitizedNewExercise);
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

  return (
    <DialogForm
      triggerText="Add Exercise"
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
