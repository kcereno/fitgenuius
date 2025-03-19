'use client';

import React, { useState } from 'react';
import AddExerciseForm from '../../components/AddExerciseForm/AddExerciseForm';
import useFetchExercises from '@/hooks/useFetchExercises';
import NavigationList from '@/components/List/List';
import { IdNameType } from '@/types/data';
import AddExerciseDrawer from '@/components/AddExerciseDrawer/AddExerciseDrawer';
import { Button } from '@/components/ui/button';

const ExercisesPage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data, isLoading, error } = useFetchExercises();

  if (isLoading) return <p>Fetching exercises...</p>;
  if (error) return <p>Error fetching exercises</p>;

  const handleAddExerciseButtonClick = () => {
    setOpenDrawer(true);
  };

  return (
    <div className="p-4">
      {data?.length ? (
        <NavigationList
          rootSlug={'exercises'}
          list={data as IdNameType[]}
        />
      ) : (
        <p>No exercises in database</p>
      )}
      {/* 
      <AddExerciseForm /> */}
      <Button onClick={handleAddExerciseButtonClick}>Add Exercise</Button>
      <AddExerciseDrawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default ExercisesPage;
