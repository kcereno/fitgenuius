'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import useFetchWorkout from '@/hooks/workout/useFetchWorkout';
import useDeleteWorkout from '@/hooks/workout/useDeleteWorkout';
import useEditWorkout from '@/hooks/workout/useUpdateWorkout';
import { Workout } from '@/types/workout';
import WorkoutFormDrawer from '@/components/WorkoutFormDrawer/WorkoutFormDrawer';
import ExerciseListDrawer from '@/components/ExerciseListDrawer/ExerciseListDrawer';

const WorkoutPage = () => {
  const { workoutSlug } = useParams();
  const router = useRouter();
  const [openWorkoutFormDrawer, setOpenWorkoutFormDrawer] = useState(false);
  const [openExerciseListDrawer, setOpenExerciseListDrawer] = useState(false);

  const {
    data: workout,
    isLoading,
    error,
  } = useFetchWorkout(workoutSlug as string);
  const { mutate: deleteWorkout } = useDeleteWorkout();
  const { mutateAsync: editWorkout, isPending: editWorkoutIsPending } =
    useEditWorkout();

  if (isLoading) return <p>Loading workout...</p>;
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

  const handleDelete = async () => {
    deleteWorkout(workoutSlug as string);
  };

  const handleEditButtonClick = () => {
    setOpenWorkoutFormDrawer(true);
  };

  const handleEditWorkout = async (workoutData: Pick<Workout, 'name'>) => {
    try {
      await editWorkout({
        workoutSlug: workout.slug,
        updatedWorkout: workoutData,
      });

      setOpenWorkoutFormDrawer(false);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Error Editing exercise'
      );
    }
  };

  const handleSelectExerciseButtonClick = () => {
    setOpenExerciseListDrawer(true);
  };
  return (
    <div className="p-4 flex flex-col min-h-screen gap-4">
      <h1 className="text-center text-xl font-bold">{workout.name}</h1>
      <div className="flex gap-4 justify-center">
        <Button onClick={handleEditButtonClick}>Edit </Button>
        <Button onClick={handleDelete}>Delete</Button>
        <WorkoutFormDrawer
          open={openWorkoutFormDrawer}
          onOpenChange={setOpenWorkoutFormDrawer}
          onSubmit={handleEditWorkout}
          initialWorkout={workout}
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
        onSubmit={() => {}}
        initialExercises={workout.exercises}
        // isPending={isPending}
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
