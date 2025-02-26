'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import EditExerciseForm from '@/components/EditExerciseForm/EditExerciseForm';
import useFetchExercise from '@/hooks/useFetchExercise';
import useDeleteExercise from '@/hooks/useDeleteExercise';

const ExercisePage = () => {
  const { exerciseId } = useParams();
  const router = useRouter();

  const { exercise, isLoading, error } = useFetchExercise(exerciseId as string);
  const { mutate: deleteExerciseMutation } = useDeleteExercise();

  if (isLoading) return <p>Loading exercise...</p>;
  if (error) return <p>Error fetching exercise</p>;
  if (!exercise) {
    router.push('/exercises'); // ✅ Redirect if exercise is not found
    return null;
  }

  const handleDelete = async () => {
    deleteExerciseMutation(exerciseId as string);
  };

  return (
    <div className="p-4 flex flex-col min-h-screen gap-4">
      <h1 className="text-center text-xl font-bold">{exercise.name}</h1>
      <div className="flex gap-4 justify-center">
        <EditExerciseForm initialExerciseFormData={exercise} />
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default ExercisePage;
