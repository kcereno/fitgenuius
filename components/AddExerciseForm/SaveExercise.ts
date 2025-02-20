export const saveExercise = async (exerciseName: any) => {
  const response = await fetch('/api/exercises', {
    method: 'POST',
    body: JSON.stringify({ exerciseName }),
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await response.json();
  console.log(' saveExercise ~ result:', result);

  return result;
};
