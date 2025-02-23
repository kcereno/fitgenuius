'use client';

import React from 'react';
import { Exercise } from '@/types/exercise';

import Link from 'next/link';

const ExerciseList = ({ exercises }: { exercises: Exercise[] }) => {
  console.log(' ExerciseList ~ exercises:', exercises);
  return (
    <ul>
      {exercises.map(({ name }: Exercise) => (
        <li key={name}>
          <Link href={`/exercises/${name}`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default ExerciseList;
