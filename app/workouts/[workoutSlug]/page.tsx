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
import useFetchExercisesInWorkout from '@/hooks/exercisesInWorkout/useFetchExercisesInWorkout';

const WorkoutPage = () => {
  const { workoutSlug } = useParams();
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  const {
    data: workout,
    isLoading,
    error,
  } = useFetchWorkout(workoutSlug as string);
  console.log(' WorkoutPage ~ workout:', workout);

  const { mutate: deleteWorkout } = useDeleteWorkout();
  const { mutateAsync: editWorkout, isPending } = useEditWorkout();
  const { data } = useFetchExercisesInWorkout(workoutSlug as string);
  const exercisesInWorkout = data?.exercises;

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
    setOpenDrawer(true);
  };

  const handleEditWorkout = async (workoutData: Pick<Workout, 'name'>) => {
    try {
      await editWorkout({
        workoutSlug: workout.slug,
        updatedWorkout: workoutData,
      });

      setOpenDrawer(false);
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Error Editing exercise'
      );
    }
  };

  return (
    <div className="p-4 flex flex-col min-h-screen gap-4">
      <h1 className="text-center text-xl font-bold">{workout.name}</h1>
      <div className="flex gap-4 justify-center">
        <Button onClick={handleEditButtonClick}>Edit </Button>
        <Button onClick={handleDelete}>Delete</Button>
        <WorkoutFormDrawer
          open={openDrawer}
          onOpenChange={setOpenDrawer}
          onSubmit={handleEditWorkout}
          initialWorkout={workout}
          isPending={isPending}
        />
      </div>
      <hr />
      <ul>
        {exercisesInWorkout?.map((exercise) => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutPage;
