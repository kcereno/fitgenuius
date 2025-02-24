'use client';

import React from 'react';
import { Exercise, underscoreToDash } from '@/types/exercise';

import Link from 'next/link';

const ExerciseList = ({ exercises }: { exercises: Exercise[] }) => {
  return (
    <ul>
      {exercises.map((exercise: Exercise) => {
        const href = `/exercises/${underscoreToDash(exercise.id)}`;
        return (
          <li key={exercise.id}>
            <Link href={href}>{exercise.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ExerciseList;
