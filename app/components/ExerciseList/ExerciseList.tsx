'use client';

import React from 'react';

import { useFetchExercises } from '@/hooks/useFetchExercises';
const ExerciseList = () => {
  const { exercises, loading, error } = useFetchExercises();
  console.log(' ExerciseList ~ exercises:', exercises);

  if (loading) {
    return <h1>Fetching Exercises</h1>;
  }

  if (error) {
    return <h1>Unable to fetch exercises</h1>;
  }

  return (
    <ul>
      {exercises.map((exercise) => (
        <li key={exercise.exerciseName}>{exercise.exerciseName}</li>
      ))}
    </ul>
  );
};

export default ExerciseList;
