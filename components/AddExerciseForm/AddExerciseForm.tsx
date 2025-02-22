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
import { useMutation, useQueryClient } from '@tanstack/react-query';

const AddExerciseForm = () => {
  const [exercise, setExercise] = useState<Exercise>({ name: '' });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  // Mutation for Adding New Exercise
  const mutation = useMutation<Exercise, Error, { name: string }>({
    mutationFn: async (newExercise) => {
      const res = await fetch('/api/exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExercise),
      });
      if (!res.ok) {
        throw new Error('Failed to add exercise');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(exercise);
    setLoading(true);

    setOpen(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExercise((prevVal) => ({ ...prevVal, [name]: value }));
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
              value={exercise.name}
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
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExerciseForm;
