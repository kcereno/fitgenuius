import React, { Suspense } from 'react';
import AddExerciseForm from '../../components/AddExerciseForm/AddExerciseForm';
import ExerciseList from '../../components/ExerciseList/ExerciseList';
import { fetchExercises } from '../lib/actions';

const ExercisesPage = async () => {
  const exercises = await fetchExercises();

  return (
    <div className="p-4">
      <Suspense fallback={<p>Loading exercises</p>}>
        <ExerciseList initialExercises={exercises} />
      </Suspense>
      <AddExerciseForm />
    </div>
  );
};

export default ExercisesPage;
