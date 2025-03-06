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

interface EditExerciseFormProps {
  initialExercise: Exercise;
}

const EditExerciseForm = ({ initialExercise }: EditExerciseFormProps) => {
  const [open, setOpen] = useState(false);
  const [updatedExercise, setUpdatedExercise] =
    useState<Exercise>(initialExercise);

  const { mutateAsync: editExercise, loading } = useEditExercise();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const updatedId = normalizeToUnderscore(
      updatedExercise.name
    ).toLocaleLowerCase();
    const transformedName = capitalizeWords(
      sanitizeInput(updatedExercise.name)
    );

    const newSlug = underscoreToDash(updatedId);

    try {
      await editExercise({
        exerciseId: initialExercise.id,
        updatedExercise: {
          ...updatedExercise,
          id: updatedId,
          name: transformedName,
        },
        redirectTo: `/exercises/${newSlug}`,
      });
    } catch (error) {
      throw error;
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUpdatedExercise({ ...updatedExercise, [name]: value });
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
        title="New Exercise Form"
        description="Add Exercise Details"
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
            Exercise
          </Label>
          <Input
            id="name"
            name="name"
            onChange={handleTextChange}
            value={updatedExercise.name}
            className="col-span-3"
          />
        </div>
      </DialogForm>
    </>
  );
};

export default EditExerciseForm;
