'use client';

import React from 'react';
import AddExerciseForm from '../../components/AddExerciseForm/AddExerciseForm';
import useFetchExercises from '@/hooks/useFetchExercises';
import NavigationList from '@/components/List/List';

const ExercisesPage = () => {
  const { exercises, isLoading, error } = useFetchExercises();

  if (isLoading) return <p>Fetching exercises...</p>;
  if (error) return <p>Error fetching exercises</p>;

  return (
    <div className="p-4">
      {exercises?.length ? (
        <NavigationList
          rootSlug={'exercises'}
          list={exercises}
        />
      ) : (
        <p>No exercises in database</p>
      )}

      <AddExerciseForm />
    </div>
  );
};

export default ExercisesPage;
