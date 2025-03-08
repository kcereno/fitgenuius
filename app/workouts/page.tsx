'use client';

import AddWorkoutForm from '@/components/AddWorkoutForm/AddWorkoutForm';
import NavigationList from '@/components/List/List';
import useFetchWorkouts from '@/hooks/useFetchWorkouts';
import React from 'react';

const WorkoutsPage = () => {
  const { workouts, isLoading, error } = useFetchWorkouts();

  if (isLoading) return <p>Fetching workouts...</p>;
  if (error) return <p>Error fetching workouts</p>;

  return (
    <div className="p-4">
      {workouts?.length ? (
        <NavigationList
          rootSlug={'workouts'}
          list={workouts}
        />
      ) : (
        <p>No workouts in database</p>
      )}

      <AddWorkoutForm />
    </div>
  );
};

export default WorkoutsPage;
