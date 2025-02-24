export const fetchExercises = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exercises`;

  const res = await fetch(url);
  const data = await res.json();

  return data.exercises;
};

export const fetchExercise = async (exerciseId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exercises/${exerciseId}`;
  const res = await fetch(url);
  const { exercise } = await res.json();

  return exercise;
};
