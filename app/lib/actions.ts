export const fetchExercises = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exercises`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch exercises');
  }
  const { success, exercises } = await res.json();

  if (!success || !exercises) {
    throw new Error('Invalid API response: Missing exercise data');
  }

  return exercises;
};

export const fetchExercise = async (exerciseId: string) => {
  console.log(' fetchExercise ~ exerciseId:', exerciseId);
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exercises/${exerciseId}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch exercise');
  }

  const { success, exercise } = await res.json();

  if (!success || !exercise) {
    throw new Error('Invalid API response: Missing exercise data');
  }

  return exercise;
};
