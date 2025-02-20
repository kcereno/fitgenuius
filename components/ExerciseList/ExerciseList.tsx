import React from 'react';

import { fetchExercises } from '@/app/lib/actions';
import { Exercise } from '@/types/exercise';
const ExerciseList = async () => {
  const exercises = await fetchExercises();

  return (
    <ul>
      {exercises.map(({ name }: Exercise) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
};

export default ExerciseList;
