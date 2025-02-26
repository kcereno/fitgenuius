'use client';

import React from 'react';
import AddExerciseForm from '../../components/AddExerciseForm/AddExerciseForm';
import ExerciseList from '../../components/ExerciseList/ExerciseList';
import useFetchExercises from '@/hooks/useFetchExercises';

const ExercisesPage = () => {
  const { data: exercises, isLoading } = useFetchExercises();

  return (
    <div className="p-4">
      {isLoading && <p>Fetching exercises</p>}
      <ExerciseList exercises={exercises ?? []} />

      <AddExerciseForm />
    </div>
  );
};

export default ExercisesPage;
