'use client';

import { useEffect, useState } from 'react';

type Exercise = {
  exerciseName: string;
};

export function useFetchExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('/api/exercises');
        if (!response.ok) throw new Error('Failed to fetch exercises');

        const data = await response.json();
        if (data.success) {
          setExercises(data.exercises);
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  return { exercises, loading, error };
}
