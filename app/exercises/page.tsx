import React, { Suspense } from 'react';
import AddExerciseForm from '../components/AddExerciseForm/AddExerciseForm';
import ExerciseList from '../components/ExerciseList/ExerciseList';

const ExercisesPage = () => {
  return (
    <div className="p-4">
      <Suspense fallback={<p>Loading exercises</p>}>
        <ExerciseList />
      </Suspense>
      <AddExerciseForm />
    </div>
  );
};

export default ExercisesPage;
