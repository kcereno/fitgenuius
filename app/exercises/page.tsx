'use client';

import React, { useState } from 'react';
import useFetchExercises from '@/hooks/exercises/useFetchExercises';
import NavigationList, { NavigationListEntry } from '@/components/List/List';
import ExerciseFormDrawer from '@/components/ExerciseFormDrawer/ExerciseFormDrawer';
import useAddExercise from '@/hooks/exercise/useAddExercise';
import { Exercise } from '@/types/exercise';
import BottomActionButton from '@/components/BottomActionButton/BottomActionButton';

const ExercisesPage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data, isLoading, error } = useFetchExercises();
  const { mutateAsync: addExercise, isPending } = useAddExercise();

  if (isLoading) return <p>Fetching exercises...</p>;
  if (error) return <p>Error fetching exercises</p>;

  const handleAddExerciseButtonClick = () => {
    setOpenDrawer(true);
  };

  const handleAddExercise = async (
    exerciseData: Pick<Exercise, 'name' | 'movementType'>
  ) => {
    try {
      await addExercise(exerciseData);
      setOpenDrawer(false);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Error adding exercise'
      );
    }
  };

  return (
    <div className="p-4">
      {data?.length ? (
        <NavigationList
          rootSlug={'exercises'}
          list={data as NavigationListEntry[]}
        />
      ) : (
        <p>No exercises in database</p>
      )}

      <BottomActionButton onClick={handleAddExerciseButtonClick}>
        Add Exercise
      </BottomActionButton>

      <ExerciseFormDrawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        onSubmit={handleAddExercise}
        isPending={isPending}
      />
    </div>
  );
};

export default ExercisesPage;
