'use client';

import BottomActionButton from '@/components/BottomActionButton/BottomActionButton';
import NavigationList, { NavigationListEntry } from '@/components/List/List';
import WorkoutFormDrawer from '@/components/WorkoutFormDrawer/WorkoutFormDrawer';
import useAddWorkout from '@/hooks/workout/useAddWorkout';
import useFetchWorkouts from '@/hooks/workouts/useFetchWorkouts';
import { Workout } from '@/types/workout';
import React, { useState } from 'react';

const WorkoutsPage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data: workouts, isLoading, error } = useFetchWorkouts();
  const { mutateAsync: addWorkout, isPending } = useAddWorkout();

  if (isLoading) return <p>Fetching workouts...</p>;
  if (error) return <p>Error fetching workouts</p>;

  const handleAddWorkoutButtonClick = () => {
    setOpenDrawer(true);
  };

  const handleAddWorkout = async (
    workoutData: Pick<Workout['details'], 'name'>
  ) => {
    try {
      await addWorkout(workoutData);
      setOpenDrawer(false);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Error adding exercise'
      );
    }
  };

  return (
    <div className="p-4">
      {workouts?.length ? (
        <NavigationList
          rootSlug={'workouts'}
          list={workouts as NavigationListEntry[]}
        />
      ) : (
        <p>No workouts in database</p>
      )}

      <BottomActionButton onClick={handleAddWorkoutButtonClick}>
        Add Workout
      </BottomActionButton>
      <WorkoutFormDrawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        onSubmit={handleAddWorkout}
        isPending={isPending}
      />
    </div>
  );
};

export default WorkoutsPage;
