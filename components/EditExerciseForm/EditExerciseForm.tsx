'use client';

import React, { useState } from 'react';
import DialogForm from '../DialogForm/DialogForm';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Exercise } from '@/types/exercise';
import { useMutationRequest } from '@/hooks/useMutationRequest';
import { editExercise } from '@/app/lib/actions';
import { ApiResponse } from '@/types/api';

interface EditExerciseFormProps {
  initialExerciseFormData: Exercise;
}

const EditExerciseForm = ({
  initialExerciseFormData,
}: EditExerciseFormProps) => {
  const [exerciseFormData, setExerciseFormData] = useState<Exercise>(
    initialExerciseFormData
  );

  const { mutate, loading, error } = useMutationRequest<
    ApiResponse,
    { exerciseId: string; updatedExercise: Exercise }
  >({
    mutationFn: ({ exerciseId, updatedExercise }) =>
      editExercise(exerciseId, updatedExercise),
    invalidateKey: 'exercises',
  });

  const handleSubmit = () => {
    mutate({
      exerciseId: initialExerciseFormData.id,
      updatedExercise: exerciseFormData,
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedExerciseFormData = {
      ...exerciseFormData,
      [name]: value,
    };

    setExerciseFormData(updatedExerciseFormData);
  };

  const formTrigger = <Button>Edit</Button>;

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
          value={exerciseFormData.name}
          className="col-span-3"
        />
      </div>
    </DialogForm>
  );
};

export default EditExerciseForm;
