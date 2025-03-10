'use client';

import React from 'react';
import AddExerciseForm from '../../components/AddExerciseForm/AddExerciseForm';
import useFetchExerciseNames from '@/hooks/useFetchExerciseNames';
import NavigationList from '@/components/List/List';

const ExercisesPage = () => {
  const { exerciseNames, isLoading, error } = useFetchExerciseNames();

  if (isLoading) return <p>Fetching exercises...</p>;
  if (error) return <p>Error fetching exercises</p>;

  return (
    <div className="p-4">
      {exerciseNames?.length ? (
        <NavigationList
          rootSlug={'exercises'}
          list={exerciseNames}
        />
      ) : (
        <p>No exercises in database</p>
      )}

      <AddExerciseForm />
    </div>
  );
};

export default ExercisesPage;
