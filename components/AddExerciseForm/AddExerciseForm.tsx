'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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

const INITIAL_NEW_EXERCISE_VALUE = {
  id: '',
  name: '',
} as Exercise;

const AddExerciseForm = () => {
  const [newExercise, setNewExercise] = useState<Exercise>(
    INITIAL_NEW_EXERCISE_VALUE
  );
  const [open, setOpen] = useState(false);

  const { mutate, loading, error } = useMutationRequest<ApiResponse, Exercise>({
    mutationFn: addExercise,
    invalidateKey: 'exercises',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedInput = capitalizeWords(sanitizeInput(newExercise.name));
    const id = normalizeToUnderscore(trimmedInput).toLocaleLowerCase();

    const sanitizedNewExercise = { ...newExercise, id, name: trimmedInput };

    mutate(sanitizedNewExercise);
    setNewExercise(INITIAL_NEW_EXERCISE_VALUE);
    setOpen(false);
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
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button className="fixed bottom-20 left-1/2 -translate-x-1/2">
          Add Exercise
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>New Exercise Form</DialogTitle>
          <DialogDescription>Add Exercise Details</DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
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
              autoFocus={false}
              tabIndex={-1}
            />
          </div>

          <DialogFooter>
            <Button type="submit">
              {' '}
              {loading ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
          {error ? <p>Error son</p> : null}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExerciseForm;
