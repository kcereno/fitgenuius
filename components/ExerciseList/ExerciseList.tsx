'use client';

import React from 'react';
import { Exercise } from '@/types/exercise';
import { useQuery } from '@tanstack/react-query';

// Todo: Refactor, make unto util
const fetchExercises = async (): Promise<Exercise[]> => {
  const res = await fetch('/api/exercises');
  const data = await res.json();
  return data.exercises;
};

const ExerciseList = ({
  initialExercises,
}: {
  initialExercises: Exercise[];
}) => {
  const {
    data: exercises,
    isLoading,
    error,
  } = useQuery<Exercise[]>({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
    initialData: initialExercises,
  });

  if (isLoading) return <p>Loading exercises...</p>;
  if (error) return <p>Error loading exercises.</p>;

  return (
    <ul>
      {exercises.map(({ name }: Exercise) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
};

export default ExerciseList;
