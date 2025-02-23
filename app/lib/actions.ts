export const fetchExercises = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exercises`);
  const data = await res.json();

  return data.exercises;
};
