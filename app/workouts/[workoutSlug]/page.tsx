'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import WorkoutFormDrawer from '@/components/WorkoutFormDrawer/WorkoutFormDrawer';
import ExerciseListDrawer from '@/components/ExerciseListDrawer/ExerciseListDrawer';

import useFetchWorkout from '@/hooks/workout/useFetchWorkout';
import useDeleteWorkout from '@/hooks/workout/useDeleteWorkout';
import useEditWorkout from '@/hooks/workout/useUpdateWorkout';
import useUpdateExercisesInWorkout from '@/hooks/workout/useUpdateExercisesInWorkout';

import { Workout } from '@/types/workout';
import { Exercise } from '@/types/exercise';

const WorkoutPage = () => {
  const { workoutSlug } = useParams();
  const router = useRouter();

  // States
  const [openWorkoutFormDrawer, setOpenWorkoutFormDrawer] = useState(false);
  const [openExerciseListDrawer, setOpenExerciseListDrawer] = useState(false);

  // Queries and Mutations
  const {
    data: workout,
    isLoading: workoutIsLoading,
    error,
  } = useFetchWorkout(workoutSlug as string, {
    include: ['details', 'exercises'],
  });

  const { mutate: deleteWorkout } = useDeleteWorkout();
  const { mutateAsync: editWorkout, isPending: editWorkoutIsPending } =
    useEditWorkout();
  const {
    mutateAsync: updateExercisesInWorkout,
    isPending: updateExerciseInWorkoutIsPending,
  } = useUpdateExercisesInWorkout();

  // Handlers
  const handleDelete = async () => {
    deleteWorkout(workoutSlug as string);
  };

  const handleEditButtonClick = () => {
    setOpenWorkoutFormDrawer(true);
  };

  const handleEditWorkout = async (
    workoutData: Pick<Workout['details'], 'name'>
  ) => {
    if (!workout) return;
    try {
      await editWorkout({
        workoutSlug: workout.details.slug,
        updatedWorkout: workoutData,
      });

      setOpenWorkoutFormDrawer(false);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Error Editing exercise'
      );
    }
  };

  const handleUpdateExercisesInWorkout = async (
    updatedExercises: Pick<Exercise, 'id' | 'name'>[]
  ) => {
    if (!workout) return;

    const exerciseIds = updatedExercises.map(
      (updatedExercise) => updatedExercise.id
    );

    try {
      await updateExercisesInWorkout({
        workoutSlug: workout.details.slug,
        updatedExercises: exerciseIds,
      });
      setOpenExerciseListDrawer(false);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Error Editing exercise'
      );
    }
  };

  const handleSelectExerciseButtonClick = () => {
    setOpenExerciseListDrawer(true);
  };

  // Loading and Error handling
  if (workoutIsLoading) return <p>Loading workout...</p>;

  if (error)
    return (
      <div>
        <p>{error.message}</p>
        <Link href={'/workouts'}>
          <Button>Go back to exercise list</Button>workout
        </Link>
      </div>
    );
  if (!workout) {
    router.push('/exercises');
    return null;
  }

  return (
    <div className="p-4 flex flex-col min-h-screen gap-4">
      <h1 className="text-center text-xl font-bold">{workout.details.name}</h1>
      <div className="flex gap-4 justify-center">
        <Button onClick={handleEditButtonClick}>Edit </Button>
        <Button onClick={handleDelete}>Delete</Button>
        <WorkoutFormDrawer
          open={openWorkoutFormDrawer}
          onOpenChange={setOpenWorkoutFormDrawer}
          onSubmit={handleEditWorkout}
          initialWorkout={workout.details}
          isPending={editWorkoutIsPending}
        />
      </div>
      <hr />
      <Button onClick={handleSelectExerciseButtonClick}>
        Select Exercises
      </Button>
      <ExerciseListDrawer
        open={openExerciseListDrawer}
        onOpenChange={setOpenExerciseListDrawer}
        onSubmit={handleUpdateExercisesInWorkout}
        initialExercises={workout.exercises}
        isPending={updateExerciseInWorkoutIsPending}
      />
      <ul>
        {workout.exercises.map((exercise) => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutPage;
