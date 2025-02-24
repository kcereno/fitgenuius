'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { fetchExercise } from '@/app/lib/actions';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

const ExercisePage = () => {
  const { exerciseId } = useParams();

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

  const handleDelete = () => {};
  const handelEdit = () => {};

  return (
    <div className="p-4 flex flex-col min-h-screen gap-4">
      <h1 className="text-center text-xl font-bold">{exercise?.name}</h1>
      <div className="flex gap-4 justify-center">
        <Button onClick={handelEdit}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default ExercisePage;
