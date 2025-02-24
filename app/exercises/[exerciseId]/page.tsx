'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { fetchExercise } from '@/app/lib/actions';
import { useQuery } from '@tanstack/react-query';

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

  return <div>{exercise?.name}</div>;
};

export default ExercisePage;
