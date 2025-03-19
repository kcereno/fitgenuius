'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

import useFetchExercise from '@/hooks/useFetchExercise';
import useDeleteExercise from '@/hooks/useDeleteExercise';
import Link from 'next/link';
import ExerciseFormDrawer from '@/components/ExerciseFormDrawer/ExerciseFormDrawer';
import useEditExercise from '@/hooks/useEditExercise';
import { Exercise } from '@/types/exercise';

const ExercisePage = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { exerciseSlug } = useParams();
  const router = useRouter();

  const {
    data: exercise,
    isLoading: fetchExerciseIsLoading,
    error: fetchExerciseError,
  } = useFetchExercise(exerciseSlug as string);

  const { mutateAsync: deleteExercise } = useDeleteExercise();

  const { mutateAsync: editExercise, isPending } = useEditExercise();

  if (fetchExerciseIsLoading) return <p>Loading exercise...</p>;
  if (fetchExerciseError)
    return (
      <div>
        <p>{fetchExerciseError.message}</p>
        <Link href={'/exercises'}>
          <Button>Go back to exercise list</Button>
        </Link>
      </div>
    );
  if (!exercise) {
    router.push('/exercises');
    return null;
  }

  const handleDelete = async () => {
    try {
      await deleteExercise(exercise.slug as string);
    } catch (error) {
      console.error(' handleDelete ~ error:', error);
    }
  };

  const handleEditButtonClick = () => {
    setOpenDrawer(true);
  };

  const handleEditExercise = async (
    updatedExercise: Pick<Exercise, 'name' | 'movementType'>
  ) => {
    try {
      await editExercise({
        slug: exercise.slug,
        updatedExercise: updatedExercise,
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
      <h1 className="text-center text-xl font-bold">{exercise.name}</h1>
      <div className="flex gap-4 justify-center">
        <Button onClick={handleEditButtonClick}>Edit </Button>
        <ExerciseFormDrawer
          open={openDrawer}
          onOpenChange={setOpenDrawer}
          onSubmit={handleEditExercise}
          initialExercise={exercise}
          isPending={isPending}
        />
        <Button onClick={handleDelete}>
          {isPending ? 'Deleting....' : 'Delete'}
        </Button>
      </div>
    </div>
  );
};

export default ExercisePage;
