'use client';

import AddWorkoutForm from '@/components/AddWorkoutForm/AddWorkoutForm';
import NavigationList from '@/components/List/List';
import useFetchWorkouts from '@/hooks/useFetchWorkouts';
import { IdNameType } from '@/types/data';

import React from 'react';

const WorkoutsPage = () => {
  const { data, isLoading, error } = useFetchWorkouts({ keys: ['id', 'name'] });

  if (isLoading) return <p>Fetching workouts...</p>;
  if (error) return <p>Error fetching workouts</p>;

  return (
    <div className="p-4">
      {data?.length ? (
        <NavigationList
          rootSlug={'workouts'}
          list={data as IdNameType[]}
        />
      ) : (
        <p>No workouts in database</p>
      )}

      <AddWorkoutForm />
    </div>
  );
};

export default WorkoutsPage;
