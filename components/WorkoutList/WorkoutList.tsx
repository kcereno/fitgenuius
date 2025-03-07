'use client';

import React from 'react';
import { Exercise } from '@/types/exercise';
import Link from 'next/link';
import { underscoreToDash } from '@/utils/formatters';
import { Workout } from '@/types/workout';

const WorkoutList = ({ workouts }: { workouts: Workout[] }) => {
  return (
    <ul>
      {workouts.map((workout: Exercise) => {
        const href = `/exercises/${underscoreToDash(workout.id)}`;
        return (
          <li key={workout.id}>
            <Link href={href}>{workout.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default WorkoutList;
