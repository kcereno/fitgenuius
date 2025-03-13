'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import useFetchWorkout from '@/hooks/useFetchWorkout';
import useDeleteWorkout from '@/hooks/useDeleteWorkout';
import EditWorkoutForm from '@/components/EditWorkoutForm/EditWorkoutForm';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const WorkoutPage = () => {
  const { workoutId } = useParams();
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const {
    data: workout,
    isLoading,
    error,
  } = useFetchWorkout(workoutId as string);

  const { mutate: deleteWorkout } = useDeleteWorkout();

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
    deleteWorkout(workoutId as string);
  };

  return (
    <div className="p-4 flex flex-col min-h-screen gap-4">
      <h1 className="text-center text-xl font-bold">{workout.name}</h1>
      <div className="flex gap-4 justify-center">
        <EditWorkoutForm initialWorkout={workout} />
        <Button onClick={handleDelete}>Delete</Button>
      </div>
      <hr />
      <div className="flex gap-4 justify-center">
        <Button>Add Exercise</Button>
        <Button>Edit</Button>
      </div>
      {/* Exercise List */}
      <ul className="flex flex-col bg-gray-300">
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      {/* Drawer */}
      <Drawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        autoFocus={openDrawer}
      >
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default WorkoutPage;
