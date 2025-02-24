'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { deleteExercise, fetchExercise } from '@/app/lib/actions';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import EditExerciseForm from '@/components/EditExerciseForm/EditExerciseForm';

const ExercisePage = () => {
  const { exerciseId } = useParams();

  const router = useRouter();

  const {
    data: exercise,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['exercise', exerciseId], // Unique key for caching
    queryFn: () => fetchExercise(exerciseId as string), // Fetch function
    enabled: !!exerciseId, // Only fetch if exerciseId exists
  });

  if (isLoading) return <p>Exercise is loading</p>;

  if (error) return <p>Error fetching exercise</p>;

  const handleDelete = async () => {
    const result = await deleteExercise(exercise.id);
    console.log(' handleDelete ~ result:', result);

    if (result.success) {
      router.push('/exercises');
    }
  };

  return (
    <div className="p-4 flex flex-col min-h-screen gap-4">
      <h1 className="text-center text-xl font-bold">{exercise?.name}</h1>
      <div className="flex gap-4 justify-center">
        <EditExerciseForm />
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default ExercisePage;
