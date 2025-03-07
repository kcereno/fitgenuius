'use client';

import useFetchWorkouts from '@/hooks/useFetchWorkouts';
import React from 'react';

const WorkoutsPage = () => {
  const { workouts, isLoading, error } = useFetchWorkouts();
  console.log(' WorkoutsPage ~ workouts:', workouts);

  if (isLoading) return <p>Fetching exercises...</p>;
  if (error) return <p>Error fetching exercises</p>;

  return (
    <div className="p-4">
      {/* {exercises?.length ? (
        <ExerciseList exercises={exercises} />
      ) : (
        <p>No exercises in database</p>
      )}

      <AddExerciseForm /> */}
    </div>
  );
};

export default WorkoutsPage;
