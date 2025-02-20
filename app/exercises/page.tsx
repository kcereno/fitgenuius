import React from 'react';
import AddExerciseForm from '../components/AddExerciseForm/AddExerciseForm';
import ExerciseList from '../components/ExerciseList/ExerciseList';

const ExercisesPage = () => {
  return (
    <div className="p-4">
      <ExerciseList />
      <AddExerciseForm />
    </div>
  );
};

export default ExercisesPage;
