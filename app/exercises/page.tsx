'use client';

import React from 'react';
import AddExerciseForm from '../../components/AddExerciseForm/AddExerciseForm';
import useFetchExercises from '@/hooks/useFetchExercises';
import NavigationList from '@/components/List/List';
import { IdNameType } from '@/types/data';

const ExercisesPage = () => {
  const {
    data: exerciseNames,
    isLoading,
    error,
  } = useFetchExercises({ keys: ['id', 'name'] });

  if (isLoading) return <p>Fetching exercises...</p>;
  if (error) return <p>Error fetching exercises</p>;

  return (
    <div className="p-4">
      {exerciseNames?.length ? (
        <NavigationList
          rootSlug={'exercises'}
          list={exerciseNames as IdNameType[]}
        />
      ) : (
        <p>No exercises in database</p>
      )}

      <AddExerciseForm />
    </div>
  );
};

export default ExercisesPage;
