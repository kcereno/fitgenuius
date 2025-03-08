'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import EditExerciseForm from '@/components/EditExerciseForm/EditExerciseForm';
import useFetchExercise from '@/hooks/useFetchExercise';
import useDeleteExercise from '@/hooks/useDeleteExercise';
import Link from 'next/link';

const ExercisePage = () => {
  const { exerciseId } = useParams();
  const router = useRouter();

  const {
    data: exercise,
    isLoading,
    error,
  } = useFetchExercise(exerciseId as string);

  const { mutate: deleteExerciseMutation } = useDeleteExercise();

  if (isLoading) return <p>Loading exercise...</p>;
  if (error)
    return (
      <div>
        <p>{error.message}</p>
        <Link href={'/exercises'}>
          <Button>Go back to exercise list</Button>
        </Link>
      </div>
    );
  if (!exercise) {
    router.push('/exercises');
    return null;
  }

  const handleDelete = async () => {
    deleteExerciseMutation(exerciseId as string);
  };

  return (
    <div className="p-4 flex flex-col min-h-screen gap-4">
      <h1 className="text-center text-xl font-bold">{exercise.name}</h1>
      <div className="flex gap-4 justify-center">
        <EditExerciseForm initialExercise={exercise} />
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default ExercisePage;
