'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { deleteExercise, fetchExercise } from '@/app/lib/actions';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import EditExerciseForm from '@/components/EditExerciseForm/EditExerciseForm';

const ExercisePage = () => {
  const { exerciseId } = useParams();
  const router = useRouter();

  const {
    data: exercise,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['exercise', exerciseId],
    queryFn: () => fetchExercise(exerciseId as string),
    enabled: !!exerciseId,
  });

  if (isLoading) return <p>Loading exercise...</p>;
  if (error) return <p>Error fetching exercise</p>;
  if (!exercise) {
    router.push('/exercises'); // ✅ Redirect if exercise is not found
    return null;
  }

  const handleDelete = async () => {
    const result = await deleteExercise(exercise.id);
    if (result.success) {
      router.push('/exercises');
    }
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
