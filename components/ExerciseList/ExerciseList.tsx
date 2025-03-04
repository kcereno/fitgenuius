'use client';

import React from 'react';
import { Exercise } from '@/types/exercise';
import Link from 'next/link';
import { underscoreToDash } from '@/utils/formatters';

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
