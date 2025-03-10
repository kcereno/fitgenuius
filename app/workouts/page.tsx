'use client';

import AddWorkoutForm from '@/components/AddWorkoutForm/AddWorkoutForm';
import NavigationList from '@/components/List/List';
import useFetchWorkoutNames from '@/hooks/useFetchWorkoutNames';
import React from 'react';

const WorkoutsPage = () => {
  const { workoutNames, isLoading, error } = useFetchWorkoutNames();

  if (isLoading) return <p>Fetching workouts...</p>;
  if (error) return <p>Error fetching workouts</p>;

  return (
    <div className="p-4">
      {workoutNames?.length ? (
        <NavigationList
          rootSlug={'workouts'}
          list={workoutNames}
        />
      ) : (
        <p>No workouts in database</p>
      )}

      <AddWorkoutForm />
    </div>
  );
};

export default WorkoutsPage;
