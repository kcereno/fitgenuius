'use client';

import React from 'react';
import AddExerciseForm from '../../components/AddExerciseForm/AddExerciseForm';
import ExerciseList from '../../components/ExerciseList/ExerciseList';
import { fetchExercises } from '../lib/actions';
import { useQuery } from '@tanstack/react-query';

const ExercisesPage = () => {
  const { data: exercises, isLoading } = useQuery({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
  });

  return (
    <div className="p-4">
      {isLoading && <p>Fetching exercises</p>}
      <ExerciseList exercises={exercises ?? []} />

      <AddExerciseForm />
    </div>
  );
};

export default ExercisesPage;
