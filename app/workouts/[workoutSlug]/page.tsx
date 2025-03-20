'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import useFetchWorkout from '@/hooks/useFetchWorkout';
import useDeleteWorkout from '@/hooks/useDeleteWorkout';
import useEditWorkout from '@/hooks/useEditWorkout';
import { Workout } from '@/types/workout';
import WorkoutFormDrawer from '@/components/WorkoutFormDrawer/WorkoutFormDrawer';

const WorkoutPage = () => {
  const { workoutSlug } = useParams();
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  // Fetching
  const {
    data: workout,
    isLoading,
    error,
  } = useFetchWorkout(workoutSlug as string);

  // Mutations
  const { mutate: deleteWorkout } = useDeleteWorkout();
  const { mutateAsync: editWorkout, isPending } = useEditWorkout();

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
    </div>
  );
};

export default WorkoutPage;
