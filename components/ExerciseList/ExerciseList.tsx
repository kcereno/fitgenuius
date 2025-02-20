import React from 'react';

import { fetchExercises } from '@/app/lib/actions';
const ExerciseList = async () => {
  const exercises = await fetchExercises();

  return (
    <ul>
      {exercises.map((exercise) => (
        <li key={exercise.exerciseName}>{exercise.exerciseName}</li>
      ))}
    </ul>
  );
};

export default ExerciseList;
