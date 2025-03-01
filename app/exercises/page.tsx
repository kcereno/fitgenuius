'use client';

import React from 'react';
import AddExerciseForm from '../../components/AddExerciseForm/AddExerciseForm';
import ExerciseList from '../../components/ExerciseList/ExerciseList';
import useFetchExercises from '@/hooks/useFetchExercises';

const ExercisesPage = () => {
  const { exercises, isLoading, error } = useFetchExercises();

  if (isLoading) return <p>Fetching exercises...</p>;
  if (error) return <p>Error fetching exercises</p>;

  return (
    <div className="p-4">
      {exercises?.length ? (
        <ExerciseList exercises={exercises} />
      ) : (
        <p>No exercises in database</p>
      )}

      <AddExerciseForm />
    </div>
  );
};

export default ExercisesPage;
